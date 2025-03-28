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
  const [fileListImage, setFileListImage] = useState<UploadFile[]>([]);
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
        initialValues={{ role: "user" }}
      >
        {/* Role selection */}
        <Form.Item label="You are" name="role">
          <Radio.Group onChange={handleSelectChange} value={selectedRole}>
            <Radio value="student">Student</Radio>
            <Radio value="instructor">Instructor</Radio>
          </Radio.Group>
        </Form.Item>
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
