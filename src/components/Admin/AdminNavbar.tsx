import { useState, useEffect } from "react";
import { Layout, Button, Drawer, Avatar, Dropdown } from "antd";
import { MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import logoImage from "../../assets/EduMaster.png";
import { useCustomNavigate } from "../../hooks/customNavigate";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const { Sider } = Layout;

const AdminNavBar = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth.login);

  const navigate = useCustomNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const [isHovered, setIsHovered] = useState(false); // Thêm state cho hover

  // The menu items
  const menuItems = [
    {
      key: "profile",
      label: (
        <span onClick={() => navigate("/dashboard/admin/settings")}>
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
      <div
        className="w-full h-20 flex items-center justify-between p-4 bg-white shadow-md"
        style={{
          position: "fixed",
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
          open={drawerVisible}
          styles={{ body: { padding: 0 } }} // Sử dụng styles.body thay cho bodyStyle
        >
          <AdminSidebar onMenuClick={toggleDrawer} />
        </Drawer>

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
              transform: isHovered ? "scale(1.05)" : "scale(1)", // Điều chỉnh scale khi hover
            }}
            onMouseEnter={() => setIsHovered(true)} // Bắt đầu hover
            onMouseLeave={() => setIsHovered(false)} // Kết thúc hover
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
      <Sider
        theme="light"
        width={250}
        style={{
          position: isMobile ? "absolute" : "fixed", // Đặt thành fixed cho desktop
          height: "100vh",
          top: "80px", // Đặt từ đầu trang
          left: isMobile ? "-250px" : 0, // Ra ngoài màn hình ở chế độ mobile
          zIndex: 999,
          backgroundColor: "#fff",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <AdminSidebar />
      </Sider>
    </>
  );
};

export default AdminNavBar;
