import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { FormProps } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { API_UPLOAD_FILE } from "../../constants/api/upload";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { loginWithGoogle } from "../../redux/slices/authSlices";
import { register } from "../../services/auth.service";
import { AppDispatch, RootState } from "../../redux/store/store";
import { uploadCustomRequest } from "../../utils/uploadCustomReuquest";
import { beforeUpload } from "../../utils/handleBeforUpload";
import { useCustomNavigate } from "../../hooks/customNavigate";

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  // confirmPassword: string;
  description?: string;
  avatar_url?: string;
  video_url?: string;
  phone_number?: string;
  bank_name?: string;
  bank_account_no?: string;
  bank_account_name?: string;
  role?: string;
};

const SignUppage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRole, setSelectedRole] = useState<string>("student");
  const { loading, success } = useSelector(
    (state: RootState) => state.users.register
  );
  console.log("register success", success);

  const [videoUrl, setVideoUrl] = useState("");
  const [fileListImage, setFileListImage] = useState<UploadFile[]>([]);
  const [fileListVideo, setFileListVideo] = useState<UploadFile[]>([]);
  const [form] = Form.useForm<RegisterType>();
  const navigate = useCustomNavigate();

  const handleSelectChange = (e: RadioChangeEvent) => {
    setSelectedRole(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const onFinish: FormProps["onFinish"] = (values) => {
    const { confirmPassword, ...others } = values;
    register(others, dispatch, navigate);
    
  };
  const handleVideoChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    const filteredFileList = newFileList.filter(
      (file) => file.type === "video/mp4"
    );
    setFileListVideo(filteredFileList);
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedVideoUrl = newFileList[0].response.secure_url;
      form.setFieldsValue({ video_url: uploadedVideoUrl });
      setVideoUrl(uploadedVideoUrl);
    } else {
      form.setFieldsValue({ video_url: "" });
      setVideoUrl("");
    }
  };

  return (
    <div className="flex h-full mt-5 items-center">
      <div className="w-full mb-8 lg:flex  lg:flex-row lg:rounded-lg shadow-xl">
        {/* BACKGROUND */}
        <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center">
          <Player
            src={`https://lottie.host/d08bd2de-f201-41ed-9ee3-cf8484903ca6/G0I0mLw1Np.json`}
            loop
            autoplay
            className="h-44 w-full md:h-60 lg:h-full"
          />
        </div>
        {/* FORM */}
        <div className="w-full bg-white px-10 lg:w-1/2 lg:p-10 justify-center ">
          <h1 className="text-4xl font-semibold text-center text-gray-800">
            Register
          </h1>
          <div className="h-full ">
            <Form
              form={form}
              name="register"
              layout="vertical"
              wrapperCol={{ span: 24 }}
              initialValues={{
                role: "student",
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className="flex-grow mb-6">
                {/* email */}
                <Form.Item<RegisterType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Incorrect format of email!" },
                  ]}
                  className="mb-6"
                >
                  <Input
                    placeholder="Enter your email"
                    className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
                  />
                </Form.Item>
                {/* username */}
                <Form.Item<RegisterType>
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                  className="mb-6"
                >
                  <Input
                    placeholder="Enter your username"
                    className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
                  />
                </Form.Item>
                {/* password */}
                <Form.Item<RegisterType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters!",
                    },
                  ]}
                  className="mb-6"
                >
                  <Input.Password
                    placeholder="Enter your password"
                    className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
                  />
                </Form.Item>
                {/* confirm password : */}
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  className="mb-6"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Re-enter your password"
                    className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
                  />
                </Form.Item>
                {/* role */}
                <Form.Item label="Your role" name="role">
                  <Radio.Group
                    onChange={handleSelectChange}
                    value={selectedRole}
                  >
                    <Radio value="student">Student</Radio>
                    <Radio value="instructor">Instructor</Radio>
                  </Radio.Group>
                </Form.Item>

                {selectedRole === "instructor" && (
                  <>
                    <Row>
                      {/* avatar */}
                      <Col span={12}>
                        <Form.Item
                          label="Avatar"
                          name="avatar_url"
                          rules={[
                            { required: true, message: "Avatar is required" },
                          ]}
                        >
                          <Upload
                            accept="image/*"
                            customRequest={uploadCustomRequest}
                            action={API_UPLOAD_FILE}
                            fileList={fileListImage}
                            listType="picture-card"
                            maxCount={1}
                            onChange={handleImageChange}
                          >
                            {fileListImage.length >= 1 ? null : (
                              <div>
                                <PlusOutlined />
                                <div>Upload</div>
                              </div>
                            )}
                          </Upload>
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        {/* video */}
                        <Form.Item
                          label="Video"
                          name="video_url"
                          rules={[
                            { required: true, message: "Video is required" },
                          ]}
                        >
                          <Upload
                            accept="video/*"
                            customRequest={uploadCustomRequest}
                            action={API_UPLOAD_FILE}
                            fileList={fileListVideo}
                            listType="picture-card"
                            maxCount={1}
                            onChange={handleVideoChange}
                            beforeUpload={beforeUpload}
                          >
                            {fileListVideo.length >= 1 ? null : (
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
                    {/* phone */}
                    <Form.Item<RegisterType>
                      label="Phone"
                      name="phone_number"
                      rules={[
                        { required: true, message: "Please input your phone!" },
                        {
                          max: 10,
                          min: 10,
                          message: "Phone must be contain 10 digits",
                        },
                      ]}
                      className="mb-6"
                    >
                      <Input
                        type="number"
                        placeholder="Enter your phone"
                        className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
                      />
                    </Form.Item>
                    {/* description */}
                    <Form.Item<RegisterType>
                      label="Description"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Please input your description!",
                        },
                      ]}
                      className="mb-6"
                    >
                      <Input.TextArea
                        placeholder="Enter your description"
                        className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
                        maxLength={100}
                        style={{ height: 120, resize: "none" }}
                      />
                    </Form.Item>
                    {/* account */}
                    <div className="flex flex-wrap gap-4">
                      <Form.Item<RegisterType>
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

                      <Form.Item<RegisterType>
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

                    <Form.Item<RegisterType>
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
              </div>

              <Form.Item>
                <Button
                  htmlType="submit"
                  shape="round"
                  className="bg-[#FF782D] text-xl text-white py-4 w-full hover:bg-[#e66e27]"
                >
                  {loading ? "Waiting" : "Register"}
                </Button>
              </Form.Item>
            </Form>
            <div className="text-center mt-6">
              <span className="text-gray-500">Already have an account? </span>
              <NavLink to={"/login"} className="text-[#FF782D] hover:underline">
                Sign in
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUppage;
