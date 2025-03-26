import { Button, Input, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { changePassword } from "../services/user.service";

type ChangePasswordTypes = {
  old_password: string;
  new_password: string;
};

const UserChangePassword = () => {
  const [form] = Form.useForm<ChangePasswordTypes>();
  const { currentUser } = useSelector((state: RootState) => state.auth.login);

  const onFinish = (values: ChangePasswordTypes) => {
    const { old_password, new_password } = values;
    changePassword(currentUser._id, old_password, new_password);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Form.Item
        label="Current Password"
        name="old_password"
        rules={[{ required: true, message: "Please input your current password" }]}
      >
        <Input.Password
          placeholder="Input current password"
          style={{ width: "72vw", boxSizing: "border-box" }}
        />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="new_password"
        rules={[{ required: true, message: "Please input your new password" }]}
      >
        <Input.Password
          placeholder="Input new password"
          style={{ width: "72vw", boxSizing: "border-box" }}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <Form.Item
        label="Confirm New Password"
        name="confirmNewPassword"
        dependencies={["new_password"]}
        rules={[
          { required: true, message: "Please confirm your new password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("new_password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The two passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Please confirm your new password"
          style={{ width: "72vw", boxSizing: "border-box" }}
        />
      </Form.Item>
      <div className="pt-4">
        <Button type="primary" htmlType="submit" style={{ borderRadius: "15px" }}>
          Change Password
        </Button>
      </div>
    </Form>
  );
};

export default UserChangePassword;
