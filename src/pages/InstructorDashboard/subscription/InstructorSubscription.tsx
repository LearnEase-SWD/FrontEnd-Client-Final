import { Menu, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const items: MenuProps["items"] = [
  {
    label: "Subscribed",
    key: "Subscribed",
  },
  {
    label: "Subscriber",
    key: "Subscriber",
  },
];

const InstructorSubscription = () => {
  const naviagte = useNavigate();
  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "Subscribed":
        naviagte("/dashboard/instructor/subscription");
        break;
      case "Subscriber":
        naviagte("/dashboard/instructor/subscription/subscriber");
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
        defaultSelectedKeys={["Subscribed"]}
        onClick={handleSelectMenu}
      />
      <Outlet />
    </div>
  );
};

export default InstructorSubscription