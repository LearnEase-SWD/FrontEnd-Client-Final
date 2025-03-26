import { Card, Space} from "antd";
import UserChangePassword from "../../../components/UserChangePassword";

const InstructorChangePassword = () => {
  return (
    <Card>
      <div className="flex">
        <h3 className="text-2xl my-5">Change Password</h3>
      </div>
      <Space direction="vertical">
        <UserChangePassword />
      </Space>
    </Card>
  );
};

export default InstructorChangePassword;
