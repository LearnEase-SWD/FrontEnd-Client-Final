import { Button, Form, Upload, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BlogRequest } from "../../../models/Blog.model";
import BlogService from "../../../services/blog.service";
import { API_UPLOAD_FILE } from "../../../constants/api/upload";

import { uploadPlugin } from "../../../components/UploadImageInCKE";
import { uploadCustomRequest } from "../../../utils/uploadCustomReuquest";
import { handleNotify } from "../../../utils/handleNotify";

type BlogFormProps = {
  initialValues?: BlogRequest;
  onSuccess?: () => void;
};

const CreateBlog: React.FC<BlogFormProps> = ({ initialValues, onSuccess }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm<BlogRequest>();
  const [tagOptions, setTagOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues, content: initialValues.content });

      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: initialValues.image_url,
        },
      ]);
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

  const onFinish = async (values: BlogRequest) => {
    try {
      const postdata:BlogRequest = {...values, tags: values.tags ?? [""]  } 
      const response = await BlogService.createBlog(postdata);
      console.log("Create blog data:", postdata);
      if (response?.success && onSuccess) {
        handleNotify("Blog created successfully", "");
        onSuccess();
        form.resetFields();
        setFileList([]);
        setTagOptions([]);
      } else {
        handleNotify("Failed to create blog", "", "error");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      handleNotify("An error occurred while creating the blog.", "", "error");
    }
  };

  return (
    <Form
      form={form}
      name="create-blog"
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

        <Form.Item
          label="Title Image"
          name="image_url"
          rules={[{ required: true, message: "Please upload the blog image!" }]}
        >
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
          <Button type="primary" htmlType="submit" block style={{ borderRadius: "15px" }}>
            Create Blog
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
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              form.setFieldsValue({ content: data });
            }}
            config={{
              extraPlugins: [uploadPlugin],
            }}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateBlog;
