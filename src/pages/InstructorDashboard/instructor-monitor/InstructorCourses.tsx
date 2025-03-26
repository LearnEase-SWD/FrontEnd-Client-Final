import { Menu, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const items: MenuProps["items"] = [
  {
    label: "Course",
    key: "my-courses",
  },
  {
    label: "Session",
    key: "session",
  },
  {
    label: "Lesson",
    key: "lesson",
  },
];

const InstructorCourses = () => {
  const naviagte = useNavigate();
  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "my-courses":
        naviagte("/dashboard/instructor/my-courses");
        break;
      case "session":
        naviagte("/dashboard/instructor/my-courses/session");
        break;
      case "lesson":
        naviagte("/dashboard/instructor/my-courses/lesson");
        break;
      default:
        break;
    }
  };
  const defaultTab = location.pathname.split("/").filter(Boolean).pop();

  return (
    <div>
      <Menu
        items={items}
        mode="horizontal"
        defaultSelectedKeys={[defaultTab ?? 'my-courses']}
        onClick={handleSelectMenu}
      />
      <Outlet />
    </div>
  );
};

export default InstructorCourses;
