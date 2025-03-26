import { Button, Form, Upload, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BlogService from "../../../services/blog.service";
import { API_UPLOAD_FILE } from "../../../constants/api/upload";
import { BlogEditRequest } from "../../../models/Blog.model";
import { uploadCustomRequest } from "../../../utils/uploadCustomReuquest";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { handleNotify } from "../../../utils/handleNotify";

type EditBlogProps = {
  initialValues?: BlogEditRequest;
  onSuccess: () => void;
};

const EditBlog: React.FC<EditBlogProps> = ({ initialValues, onSuccess }) => {
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm<BlogEditRequest>();
  const [tagOptions, setTagOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues, content: initialValues.content });

      // Set the initial image if there’s an existing image URL
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: initialValues.image_url,
        },
      ]);

      // Initialize tags as options
      if (initialValues.tags) {
        const uniqueOptions = Array.from(new Set(initialValues.tags)).map(
          (tag) => ({ value: tag, label: tag })
        );
        setTagOptions(uniqueOptions);
      }
    }
  }, [initialValues, form]);

  const handleImageChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);

    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedImageUrl = newFileList[0].response?.secure_url;
      form.setFieldsValue({ image_url: uploadedImageUrl });
      console.log("image url:", uploadedImageUrl);
    } else if (newFileList.length === 0 || newFileList[0].status === "error") {
      form.setFieldsValue({ image_url: "" });
    }
  };

  const handleTagsChange = (value: string[]) => {
    const uniqueOptions = Array.from(new Set(value)).map((item) => ({
      value: item,
      label: item,
    }));
    setTagOptions(uniqueOptions);
    form.setFieldsValue({ tags: value });
  };

  const onFinish = async (values: BlogEditRequest) => {
    try {
      const updatedValues = { ...values, user_id: currentUser._id };

      if (initialValues?._id) {
        const response = await BlogService.updateBlog(
          initialValues._id,
          updatedValues
        );

        if (response?.success && onSuccess) {
          handleNotify("Blog updated successfully", "");
          onSuccess();
        } else {
          handleNotify("Failed to update blog", "", "error");
        }
      } else {
        handleNotify("Blog ID is missing.", "", "error");
      }
    } catch (error) {
      handleNotify("An error occurred while updating the blog.", "", "error");
    }
  };

  return (
    <Form
      form={form}
      name="edit-blog"
      onFinish={onFinish}
      layout="vertical"
      style={{ display: "flex", height: "100%" }}
    >
      {/* Left Section */}
      <div style={{ flex: 1, paddingRight: "16px", overflowY: "auto" }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the blog name!" }]}
        >
          <Input placeholder="Enter blog name" />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select
            mode="tags"
            placeholder="Add tags"
            onChange={handleTagsChange}
            options={tagOptions}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the blog description!" },
          ]}
        >
          <Input.TextArea
            placeholder="Enter blog description"
            maxLength={200}
            rows={2}
          />
        </Form.Item>

        <Form.Item label="Title Image" name="image_url">
          <Upload
            action={API_UPLOAD_FILE}
            customRequest={uploadCustomRequest}
            listType="picture-card"
            onChange={handleImageChange}
            fileList={fileList}
            maxCount={1}
          >
            {fileList.length < 1 && (
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div>Upload</div>
              </button>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ borderRadius: "15px" }}
          >
            Update Blog
          </Button>
        </Form.Item>
      </div>

      {/* CKEditor Section */}
      <div style={{ flex: 1, paddingLeft: "16px", overflowY: "auto" }}>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            { required: true, message: "Please enter the blog content!" },
          ]}
        >
          <CKEditor
            editor={ClassicEditor}
            data={form.getFieldValue("content") || ""}
            onChange={(_, editor) => {
              const data = editor.getData();
              form.setFieldsValue({ content: data });
            }}
            config={{
              placeholder: "Enter blog content...",
            }}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default EditBlog;
