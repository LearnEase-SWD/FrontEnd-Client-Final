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
import { useState } from "react";
import { API_UPLOAD_FILE } from "../constants/api/upload";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { registerWithGoogle } from "../redux/slices/authSlices";

export interface ModalRegisterGoogleProps {
  google_id: string;
  role?: string;
  avatar_url?: string;
  video_url?: string;
  bank_name?: string;
  phone_number?: number;
  description?: string;
  bank_account_no?: number;
  bank_account_name?: string;
}

const ModalRegisterGoogle = () => {
  const { googleId } = useSelector((state: RootState) => state.auth.login);
  const [selectedRole, setSelectedRole] = useState<string>("student");
  const [videoUrl, setVideoUrl] = useState("");
  const [fileListImage, setFileListImage] = useState<UploadFile[]>([]);
  const [fileListVideo, setFileListVideo] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const handleImageChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileListImage(newFileList || []);
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedImageUrl = newFileList[0].response.secure_url;
      form.setFieldsValue({ avatar_url: uploadedImageUrl });
    } else {
      form.setFieldsValue({ avatar_url: "" });
    }
  };
  const handleVideoChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileListVideo(newFileList || []);
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedVideoUrl = newFileList[0].response.secure_url;
      form.setFieldsValue({ video_url: uploadedVideoUrl });
      setVideoUrl(uploadedVideoUrl);
    } else {
      form.setFieldsValue({ video_url: "" });
      setVideoUrl("");
    }
  };
  const handleSelectChange = (e: RadioChangeEvent) => {
    setSelectedRole(e.target.value);
  };
  const onFinish: FormProps["onFinish"] = async (values) => {
    // luc submit thi them field credential id nua
    const formData: ModalRegisterGoogleProps = {
      ...values,
      google_id: googleId,
    };

    await dispatch(registerWithGoogle(formData));
  };

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ role: "student" }}
      >
        {/* Role selection */}
        <Form.Item label="You are" name="role">
          <Radio.Group onChange={handleSelectChange} value={selectedRole}>
            <Radio value="student">Student</Radio>
            <Radio value="instructor">Instructor</Radio>
          </Radio.Group>
        </Form.Item>
        {selectedRole === "instructor" && (
          <>
            <Row gutter={16}>
              {/* Avatar Upload */}
              <Col span={12}>
                <Form.Item
                  label="Avatar"
                  name="avatar_url"
                  rules={[{ required: true, message: "Avatar is required" }]}
                >
                  <Upload
                    accept="image/*"
                    action={API_UPLOAD_FILE}
                    fileList={fileListImage}
                    listType="picture-card"
                    maxCount={1}
                    onChange={handleImageChange}
                  >
                    {fileListImage.length < 1 && (
                      <>
                        <PlusOutlined />
                        <div>Upload</div>
                      </>
                    )}
                  </Upload>
                </Form.Item>
              </Col>
              {/* Video Upload */}
              <Col span={12}>
                <Form.Item
                  label="Video"
                  name="video_url"
                  rules={[{ required: true, message: "Video is required" }]}
                >
                  <Upload
                    accept="video/*"
                    action={API_UPLOAD_FILE}
                    fileList={fileListVideo}
                    listType="picture-card"
                    maxCount={1}
                    onChange={handleVideoChange}
                  >
                    {fileListVideo.length < 1 && (
                      <div>
                        <PlusOutlined />
                        <div>Upload</div>
                      </div>
                    )}
                  </Upload>
                  {videoUrl && (
                    <video
                      src={videoUrl}
                      controls
                      style={{ width: "100%", marginTop: "16px" }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            {/* Phone number */}
            <Form.Item
              label="Phone"
              name="phone_number"
              rules={[
                { required: true, message: "Please input your phone!" },
                { max: 10, min: 10, message: "Phone must contain 10 digits" },
              ]}
              className="mb-6"
            >
              <Input
                type="number"
                placeholder="Enter your phone"
                className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
              />
            </Form.Item>

            {/* Description */}
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
              className="mb-10"
            >
              <Input.TextArea
                placeholder="Enter your description"
                className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
                maxLength={100}
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>

            {/* Bank Information */}

            <div className="flex flex-wrap gap-4">
              <Form.Item
                label="Bank Name"
                name="bank_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your bank name!",
                  },
                ]}
                className="flex-grow mb-6 md:!w-72 lg:!w-60"
              >
                <Select
                  showSearch
                  placeholder="Select Your Bank Name"
                  optionFilterProp="label"
                  className="w-full !h-[3.25rem]"
                  options={[
                    { label: "Vietcombank", value: "Vietcombank" },
                    { label: "Agribank", value: "Agribank" },
                    { label: "TP Bank", value: "TP Bank" },
                    { label: "ACB", value: "ACB" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Bank Account"
                name="bank_account_no"
                rules={[
                  {
                    required: true,
                    message: "Please input your bank account!",
                  },
                ]}
                className="flex-grow mb-6 md:!w-72 lg:!w-60"
              >
                <Input
                  placeholder="Enter your bank account"
                  className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
                />
              </Form.Item>
            </div>

            <Form.Item
              label="Bank Account Name"
              name="bank_account_name"
              rules={[
                {
                  required: true,
                  message: "Please input your bank account name!",
                },
              ]}
              className="mb-6"
            >
              <Input
                placeholder="Enter your bank account name"
                className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
              />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Button
            htmlType="submit"
            shape="round"
            className="bg-[#FF782D] text-xl text-white py-4 w-full hover:bg-[#e66e27]"
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModalRegisterGoogle;
