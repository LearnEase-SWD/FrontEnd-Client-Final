import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Col, Form, Input, Row, Select, Upload, } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
// import { CoursePriceType } from "../../../AdminDashboard/monitors/course/couseList";
// import { Course } from "../../../../components/UserAuthTest";

const CourseInformation = () => {
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    description: "",
    content: "",
    video_url: "",
    image_url: "",
  });
  

  // const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);

  // const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);

  // const [selectTypePrice, setSelectPriceType] = useState<CoursePriceType>(
  //   initializeValue.price > 0 ? "Paid" : "Free"
  // );

  // const [form] = Form.useForm<Course>();

  // const handleImageChange: UploadProps["onChange"] = ({
  //   fileList: newFileList,
  // }) => {
  //   setImageFileList(newFileList || []);
  //   console.log("image", newFileList);
  // };

  // const handleVideoChange: UploadProps["onChange"] = ({
  //   fileList: newFileList,
  // }) => {
  //   setVideoFileList(newFileList || []);
  // };

  // const handleSelectPrice = (e: RadioChangeEvent) => {
  //   const value = e.target.value;
  //   setSelectPriceType(value);
  // };

  // const handleFinished: FormProps["onFinish"] = (values) => {
  //   console.log("Submitted:", values);
  // };

  return (
    <div>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
      >
        <Row justify="space-around" gutter={[16, 16]}>
          <Col xs={{ span: 12 }}>
            <Form.Item
              label="Course Name"
              name="name"
              rules={[{ required: true, message: "Please input course name" }]}
            >
              <Input
                placeholder="Course Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 12 }}>
            <Form.Item
              label="Category"
              name="category_id"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                placeholder="select category"
                options={[
                  { label: "Javascript", value: "category_id-1" },
                  { label: "TypeScript", value: "category_id-2" },
                  { label: "Machine Learning", value: "category_id-3" },
                ]}
                onChange={(value) =>
                  setFormData({ ...formData, category_id: value })
                }
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description" }]}
        >
          <Input.TextArea
            showCount
            maxLength={100}
            placeholder="Course description"
            style={{ height: 120, resize: "none" }}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Form.Item>

        {/* Content */}
        <Form.Item label="Content" name="content">
          /* <CKEditor
            editor={ClassicEditor}
            onChange={(_, editor) => {
              const data = editor.getData(); 
              setFormData({ ...formData, content: data });
            }}
            config={{ placeholder: "Enter course content..." }}
          />
        </Form.Item>

        <Row>
          <Col>
            <Form.Item
              label="Course Image"
              name="image_url"
              valuePropName="fileList"
              // getValueFromEvent={normFile}
            >
              <Upload accept="image/*" listType="picture-card">
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Course Video"
              name="video_url"
              valuePropName="fileList"
              // getValueFromEvent={normFile}
            >
              <Upload accept="video/*" listType="picture-card">
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CourseInformation;
