import { Menu, MenuProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const items: MenuProps["items"] = [
  {
    label: "Request Payout",
    key: "payout",
  },
  {
    label: "Awaiting Payout",
    key: "awaiting-payout",
  },
  {
    label: "Completed Payout",
    key: "completed-payout",
  },
  {
    label: "Rejected Payout",
    key: "rejected-payout",
  }
];

const InstructorPayout = () => {
  const naviagte = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location.state) {
      naviagte("/dashboard/instructor/payout", {
        replace: true,
        state: { status: ["Request Payout", "New"] },
      });
    }
  }, [location, naviagte]);
  const defaultTab = location.pathname.split("/").filter(Boolean).pop();



  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "payout":
        naviagte("/dashboard/instructor/payout", {state: {status: ["Request Payout", "New"]} });
        break;
      case "awaiting-payout":
        naviagte("awaiting-payout", {state: {status: ["request_payout", "Awaiting Payout"]} });
        break; 
      case "completed-payout":
        naviagte("completed-payout", {state: {status: "Completed"} });
        break;
      case "rejected-payout":
        naviagte("rejected-payout", {state: {status: "Rejected"} });
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
        defaultSelectedKeys={[defaultTab ?? 'payout']}
        onClick={handleSelectMenu}
      />
      <Outlet />
    </div>
  );
};

export default InstructorPayout;
