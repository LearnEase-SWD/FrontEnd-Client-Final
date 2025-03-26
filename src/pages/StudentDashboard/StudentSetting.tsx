import { Menu, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: "Profile",
    key: "Profile",
  },
  {
    label: "Change Password",
    key: "Change Password",
  },
];

const StudentSetting = () => {
  const navigate = useNavigate(); 
  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "Profile":
        navigate("/dashboard/student/settings");
        break;
      case "Change Password":
        navigate("/dashboard/student/settings/change-password");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Menu
        items={items}
        mode="horizontal"
        defaultSelectedKeys={["Profile"]}
        onClick={handleSelectMenu}
      />
      <Outlet />
    </div>
  );
};

export default StudentSetting;
