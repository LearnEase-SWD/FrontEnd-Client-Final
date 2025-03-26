import { useState, useEffect } from "react";
import { Layout, Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import logoImage from "../../assets/EduMaster.png"; // Đường dẫn đến logo
import { useCustomNavigate } from "../../hooks/customNavigate"; // Hook tùy chỉnh cho điều hướng
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const { Header } = Layout;

const MessageNavbar: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  const navigate = useCustomNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Kiểm tra kích thước màn hình
    };

    handleResize(); // Kiểm tra khi render lần đầu
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDashboardNavigation = () => {
    // Lấy thông tin user từ currentUser hoặc localStorage
    const user =
      currentUser || JSON.parse(localStorage.getItem("user") || "{}");

    if (user.role === "student") {
      navigate("/dashboard/student");
    } else if (user.role === "instructor") {
      navigate("/dashboard/instructor");
    } else {
      console.error("Unknown role: Cannot navigate to dashboard.");
    }
  };

  const menuItems = [
    {
      key: "dashboard",
      label: <span onClick={handleDashboardNavigation}>Dashboard</span>,
      icon: <UserOutlined />,
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
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1000,
        width: "100%",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
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
          }}
        />
      </div>

      {/* User Avatar */}
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "8px",
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
              }}
            >
              {currentUser.name}
            </span>
          )}
        </div>
      </Dropdown>
    </Header>
  );
};

export default MessageNavbar;
