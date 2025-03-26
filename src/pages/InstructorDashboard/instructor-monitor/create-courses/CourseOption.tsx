import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { API_UPLOAD_FILE } from "../../../../constants/api/upload";
import { Course } from "../../../../models/Course.model";
import { Category } from "../../../../models/Category.model";
import ReactPlayer from "react-player";
import { handleNotify } from "../../../../utils/handleNotify";
import { LevelsEnum } from "../../../../models/Lesson.model";
import { uploadCustomRequest } from "../../../../utils/uploadCustomReuquest";

type CourseInformationProps = {
  initializeValue?: Course;
  mode: "create" | "update";
  isLoading?: boolean;
  onFinished: FormProps["onFinish"];
  categories: Category[];
};

type CoursePriceType = "Free" | "Paid";
//nhan nut create thi no se la status new
// Sau khi send admin thi status cap nhat la approving

const CourseOption: React.FC<CourseInformationProps> = ({
  initializeValue,
  mode,
  onFinished,
  categories,
}) => {
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);

  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | undefined>(
    initializeValue?.video_url
  );

  const [toggleDisable, setToggleDisable] = useState(false);

  const [SelectPriceType, setSelectPriceType] = useState<CoursePriceType>(
    initializeValue?.price && initializeValue.price > 0 ? "Paid" : "Free"
  );
  const [tagOptions, setTagOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [form] = Form.useForm<Course>();

  useEffect(() => {
    if (initializeValue && mode === "update") {
      setImageFileList(
        initializeValue?.image_url
          ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: initializeValue.image_url,
              },
            ]
          : []
      );
      setVideoFileList(
        initializeValue?.video_url
          ? [
              {
                uid: "-1",
                name: "video.mp4",
                status: "done",
                url: initializeValue.video_url,
              },
            ]
          : []
      );
    }
  }, [initializeValue, form, mode]);

  const handleTagsChange = (value: string[]) => {
    const uniqueOptions = Array.from(new Set(value)).map((item) => ({
      value: item,
      label: item,
    }));
    setTagOptions(uniqueOptions);
    form.setFieldsValue({ tag: value });
  };

  const handleImageChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setImageFileList(newFileList || []);

    const isUploading = newFileList.some((file) => file.status === "uploading");
    setToggleDisable(isUploading);

    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedImageUrl = newFileList[0].response?.secure_url;
      form.setFieldsValue({ image_url: uploadedImageUrl });
    } else if (newFileList.length === 0 || newFileList[0].status === "error") {
      form.setFieldsValue({ image_url: "" });
    }
  };

  const handleVideoChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setVideoFileList(newFileList || []);
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedVideoUrl = newFileList[0].response?.secure_url;
      setVideoPreviewUrl(uploadedVideoUrl);
      form.setFieldsValue({ video_url: uploadedVideoUrl });
    } else {
      setVideoPreviewUrl(undefined);
      form.setFieldsValue({ video_url: "" });
    }
  };

  const handleSelectPrice = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setSelectPriceType(value);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initializeValue}
      onFinish={onFinished}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Course Name"
            name="name"
            rules={[{ required: true, message: "Please input course name" }]}
          >
            <Input placeholder="Course Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select category"
              options={categories.map((category) => ({
                value: category._id,
                label: category.name,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Level"
            name="level"
            rules={[
              { required: true, message: "Please input estimated level" },
            ]}
          >
            <Select
              placeholder="Select Level"
              options={Object.values(LevelsEnum).map((level) => ({
                value: level,
                label: level,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input description" }]}
      >
        <Input.TextArea
          maxLength={200}
          style={{ height: "100px" }}
          placeholder="Course description"
        />
      </Form.Item>

      <Form.Item label="Tags" name="tag">
        <Select
          mode="tags"
          placeholder="Add tags"
          onChange={handleTagsChange}
          options={tagOptions}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[
          { required: true, message: "Please fill in the course content" },
        ]}
      >
        <CKEditor
          editor={ClassicEditor}
          data={form.getFieldValue("content") || ""}
          onChange={(_, editor) =>
            form.setFieldsValue({ content: editor.getData() })
          }
        />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Course Image"
            name="image_url"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              action={API_UPLOAD_FILE}
              customRequest={uploadCustomRequest}
              accept="image/*"
              listType="picture-card"
              fileList={imageFileList}
              onChange={handleImageChange}
              maxCount={1}
            >
              {imageFileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Course Video"
            name="video_url"
            rules={[{ required: true, message: "Please upload a demo video" }]}
          >
            <Row gutter={16} align="middle">
              <Col>
                <Upload
                  customRequest={uploadCustomRequest}
                  action={API_UPLOAD_FILE}
                  accept="video/*"
                  listType="picture-card"
                  fileList={videoFileList}
                  onChange={handleVideoChange}
                  maxCount={1}
                  beforeUpload={(file) => {
                    const isSupportedFormat = [
                      "video/mp4",
                      "video/webm",
                      "video/ogg",
                      "video/mov",
                    ].includes(file.type);
                    if (!isSupportedFormat) {
                      handleNotify(
                        "File format not supported",
                        "You can only upload MP4, WebM, MOV or OGG video files!",
                        "error"
                      );
                    }
                    return isSupportedFormat || Upload.LIST_IGNORE;
                  }}
                >
                  {videoFileList.length >= 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div>Upload</div>
                    </div>
                  )}
                </Upload>
              </Col>
              <Col>
                {videoPreviewUrl && (
                  <ReactPlayer
                    url={videoPreviewUrl}
                    width={200}
                    height={150}
                    controls
                    style={{ marginLeft: "8px" }}
                  />
                )}
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
      {/* Course Type Price */}
      <Form.Item label="Course Price" required>
        <Radio.Group onChange={handleSelectPrice} value={SelectPriceType}>
          <Radio value="Free"> Free </Radio>
          <Radio value="Paid"> Paid </Radio>
        </Radio.Group>
      </Form.Item>

      {/* hidden when type free */}
      {SelectPriceType === "Free" && (
        <div>
          <Form.Item
            name="price"
            hidden
            normalize={(value) => (value ? Number(value) : value)}
          >
            <Input type="number" value={0} />
          </Form.Item>
          <Form.Item
            name="discount"
            hidden
            normalize={(value) => (value ? Number(value) : value)}
          >
            <Input type="number" value={0} />
          </Form.Item>
        </div>
      )}

      {SelectPriceType === "Paid" && (
        <div>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price" }]}
            normalize={(value) => (value ? Number(value) : value)}
          >
            <Input type="number" placeholder="Input price" />
          </Form.Item>
          {/* discount */}
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Please input discount" }]}
            normalize={(value) => (value ? Number(value) : value)}
          >
            <Input type="number" placeholder="Input discount" />
          </Form.Item>
        </div>
      )}
      {/* Button Submit */}
      <Form.Item>
        <Button
          className="w-full"
          variant="solid"
          color="primary"
          htmlType="submit"
          disabled={toggleDisable}
        >
          {mode === "create" ? "Create" : "Update"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseOption;
