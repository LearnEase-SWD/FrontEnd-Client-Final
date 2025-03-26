import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const items: MenuProps["items"] = [
  {
    label: "Course",
    key: "Course",
  },
  {
    label: "Session",
    key: "Session",
  },
  {
    label: "Lesson",
    key: "Lesson",
  },
];

const AllCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [selectedKey, setSelectedKey] = useState<string>("");

  useEffect(() => {
    switch (pathname) {
      case "/dashboard/admin/all-courses":
        setSelectedKey("Course");
        break;
      case "/dashboard/admin/all-courses/session":
        setSelectedKey("Session");
        break;
      case "/dashboard/admin/all-courses/lesson":
        setSelectedKey("Lesson");
        break;
      default:
        break;
    }
  }, [pathname]);
  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "Course":
        navigate("/dashboard/admin/all-courses");
        break;
      case "Session":
        navigate("/dashboard/admin/all-courses/session");
        break;
      case "Lesson":
        navigate("/dashboard/admin/all-courses/lesson");
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

export default AllCourse;
