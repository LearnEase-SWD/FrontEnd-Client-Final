import { useState, useEffect } from "react";
import { Layout, Button, Drawer, Avatar, Dropdown } from "antd";
import { MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import logoImage from "../../assets/EduMaster.png"; // Đường dẫn đến logo
import { useCustomNavigate } from "../../hooks/customNavigate"; // Hook tùy chỉnh cho điều hướng
import InstructorSidebar from "./InstructorSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
const { Sider } = Layout; // Chỉ destructure Sider
const InstructorNavbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  const navigate = useCustomNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Kiểm tra kích thước màn hình
    };

    handleResize(); // Kiểm tra khi render lần đầu
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible); // Toggle Drawer khi click
  };

  // Update the menu items to use items prop
  const menuItems = [
    {
      key: "profile",
      label: (
        <span onClick={() => navigate("/dashboard/instructor/settings")}>
          Profile
        </span>
      ),
      icon: <UserOutlined />, // Thêm icon UserOutlined cho Profile
    },
    {
      key: "logout",
      onClick: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
        window.location.href = "/";
      },
      label: <span>Logout</span>,
      icon: <LogoutOutlined />, // Thêm icon LogoutOutlined cho Logout
    },
  ];

  return (
    <>
      {/* Navbar */}
      <div
        className="w-full h-20 flex items-center justify-between p-4 bg-white shadow-md"
        style={{
          position: "fixed", // Đặt navbar ở vị trí fixed
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        {isMobile && (
          <Button
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            className="text-base"
          />
        )}

        <Drawer
          width={250}
          title="Menu"
          placement="left"
          onClose={toggleDrawer}
          open={drawerVisible} // Control visibility
        >
          {/* Sử dụng AdminSiderMenu bên trong Drawer */}
          <InstructorSidebar onMenuClick={toggleDrawer} />
        </Drawer>

        {/* Logo ở Navbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logoImage}
            alt="EduMaster logo"
            style={{
              height: isMobile ? "30px" : "40px",
              marginRight: "16px",
            }}
          />
        </div>

        {/* Avatar cho Navbar */}
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "8px",
              marginLeft: "16px",
              color: "white",
              borderRadius: "10px",
              backgroundColor: "transparent",
              transition:
                "background-color 0.3s, opacity 0.3s, transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Avatar
              shape="square"
              size="large"
              src={currentUser.avatar_url}
              alt="User Avatar"
              style={{ border: "2px solid white" }}
            />
            {!isMobile && (
              <span
                style={{
                  marginLeft: "10px",
                  color: "#000",
                  transition: "color 0.3s",
                }}
              >
                {currentUser.name}
              </span>
            )}
          </div>
        </Dropdown>
      </div>

      {/* Sidebar cho desktop */}
      {!isMobile && (
        <Sider
          theme="light"
          width={250}
          style={{
            position: "fixed",
            height: "100vh",
            top: "80px",
            left: 0,
            zIndex: 999,
            backgroundColor: "#fff",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <InstructorSidebar /> {/* Thêm AdminSiderMenu */}
        </Sider>
      )}
    </>
  );
};

export default InstructorNavbar;
