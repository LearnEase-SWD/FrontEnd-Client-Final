import { Modal, Form, Input, Button, Select } from "antd";
import { UserService } from "../../../services/user.service";

const { Option } = Select;

interface CreateUserProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
}

const CreateUser: React.FC<CreateUserProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    const response = await UserService.createUser(values);
    if (response.success) onSave(response.data);
    form.resetFields();
    onClose();
  };

  return (
    <Modal title="Add New User" open={visible} onCancel={onClose} footer={null}>
      <Form
        form={form}
        onFinish={handleFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item name="name" label="Full name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select placeholder="Select a role">
            <Option value="admin">Admin</Option>
            <Option value="student">Student</Option>
            <Option value="instructor">Instructor</Option>
          </Select>
        </Form.Item>
        <Form.Item name="phone_number" label="Phone Number">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" style={{ float: "right", borderRadius: "15px" }}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUser;
