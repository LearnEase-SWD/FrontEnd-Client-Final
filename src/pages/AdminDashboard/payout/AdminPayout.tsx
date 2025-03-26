import { Menu, MenuProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const items: MenuProps["items"] = [
  { label: "Request Payout", key: "Request Payout" },
  { label: "Completed Payout", key: "Completed Payout" },
  { label: "Rejected Payout", key: "Rejected Payout" },
];

const AdminPayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [selectedKey, setSelectedKey] = useState<string>("");

  useEffect(() => {
    switch (pathname) {
      case "/dashboard/admin/payout":
        setSelectedKey("Request Payout");
        break;
      case "/dashboard/admin/payout/completed-payout":
        setSelectedKey("Completed Payout");
        break;
      case "/dashboard/admin/payout/rejected-payout":
        setSelectedKey("Rejected Payout");
        break;
      default:
        break;
    }
  }, [pathname]);

  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);  // Update selectedKey when menu item is clicked
    switch (e.key) {
      case "Request Payout":
        navigate("/dashboard/admin/payout");
        break;
      case "Completed Payout":
        navigate("/dashboard/admin/payout/completed-payout");
        break;
      case "Rejected Payout":
        navigate("/dashboard/admin/payout/rejected-payout");
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
        selectedKeys={[selectedKey]}  
        onClick={handleSelectMenu}
      />
      <Outlet />
    </div>
  );
};

export default AdminPayout;
