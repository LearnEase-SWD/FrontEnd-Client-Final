import { useState, useEffect, useRef } from "react";
import {
  Button,
  Dropdown,
  Input,
  InputRef,
  MenuProps,
  Space,
  Drawer,
} from "antd"; // Import Drawer
import {
  DownOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logoImage from "../assets/web-client.png";
// import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useCustomNavigate } from "../hooks/customNavigate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store.ts";
import { fetchCartCount } from "../redux/slices/cartSlice.tsx";

// Define the type for menu items
interface MenuItem {
  label: string;
  key: string;
  path: string;
}

// Define the items with paths
const items: MenuItem[] = [
  {
    label: "Contact",
    key: "1",
    path: "/contact",
  },
  {
    label: "FAQs",
    key: "2",
    path: "/faqs",
  },
  {
    label: "Error",
    key: "3",
    path: "/error",
  },
];

const Navbar = () => {
  const { currentUser, token } = useSelector((state: RootState) => state.auth.login);
  const navigate = useCustomNavigate();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const searchInputRef = useRef<InputRef>(null);
  const location = useLocation();

  const { cartCount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (currentUser && token) {
      dispatch(fetchCartCount());
    }
  }, [dispatch, currentUser, token]);

  useEffect(() => {
    if (localStorage.getItem("userEmail") != null) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [currentUser, token]);



  useEffect(() => {
    const pathToButtonKeyMap: { [key: string]: string } = {
      "/": "home",
      "/course": "courses",
      "/blog": "blog",
      "/contact": "pages",
      "/faqs": "pages",
      "/error": "pages",
    };

    const selectedKey = pathToButtonKeyMap[location.pathname];
    if (selectedKey) {
      setActiveButton(selectedKey);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.input?.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    };

    if (isSearchActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchActive]);

  // Handle menu item clicks
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      setActiveButton("pages");
      navigate(selectedItem.path);
      setIsDrawerOpen(false); // Close drawer on menu item click
    }
  };

  const menuProps = {
    items: items.map((item) => ({ label: item.label, key: item.key })),
    onClick: handleMenuClick,
  };

  const profileMenu: MenuProps = {
    items: [
      {
        label: <span className="text-orange-500">{currentUser?.userName || "Guest"}</span>,
        key: "balance",
      },
      {
        label: "My Dashboard",
        key: "dashboard",
        onClick: () => {
          navigate(`/dashboard/${currentUser?.role}`);
        },
      },

      {
        label: "Balance",
        key: "balance",
        children: [
          {
            label: `Current Balance: đ200,000`, // Display balance
            key: "current-balance",
            disabled: true, // Disable interaction for the balance display
          },
          {
            label: "Top Up",
            key: "top-up",
            onClick: () => {
              navigate(`/dashboard/${currentUser?.role}/top-up`);
            },
          },
        ],
      },
      {
        label: "Settings",
        key: "settings",
        onClick: () => {
          navigate(`/dashboard/${currentUser?.role}/settings`);
        },
      },
      {
        label: <span className="text-red-500">Logout</span>,
        key: "logout",
        onClick: () => {
          localStorage.removeItem("userEmail");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.reload();
        },
      },
    ],
  };

  return (
    <div className="w-full h-full flex items-center justify-between px-4 z-50 bg-white shadow-md relative">
      {!isSearchActive ? (
        <>
          <img
            className="w-36 lg:w-56 cursor-pointer"
            src={logoImage}
            alt="LearnEase logo"
            onClick={() => navigate("/")}
            style={{ objectFit: "cover", cursor: "pointer" }}
          />
          <div className="hidden md:flex">
            <Button
              className={`navbar-button px-3 lg:px-6 ${activeButton === "home" ? "active" : ""
                }`}
              onClick={() => {
                setActiveButton("home");
                navigate("/");
              }}
            >
              Home
            </Button>
            <Button
              className={`navbar-button px-3 lg:px-6 ${activeButton === "courses" ? "active" : ""
                }`}
              onClick={() => {
                setActiveButton("courses");
                navigate("/course");
              }}
            >
              Courses
            </Button>
            {/* <Button
              className={`navbar-button px-3 lg:px-6 ${activeButton === "blog" ? "active" : ""
                }`}
              onClick={() => {
                setActiveButton("blog");
                navigate("/blog");
              }}
            >
              Blog
            </Button> */}
            {/* <Dropdown menu={menuProps}>
              <Button
                className={`navbar-button ${activeButton === "pages" ? "active" : ""
                  }`}
              >
                <Space>
                  Pages
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown> */}
          </div>

          {/* Log In / Sign Up and Search Icons */}
          <div className="hidden md:flex items-center gap-4">
            {userLoggedIn && (
              <button
                className="p-0 w-10 h-10 text-2xl relative"
                onClick={() => navigate("/cart/new")}
              >
                <ShoppingCartOutlined />
                <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full text-xs text-white font-semibold">
                  {cartCount}
                </span>
              </button>
            )}
            {userLoggedIn ? (
              <Dropdown menu={profileMenu}>
                {currentUser?.avatar_url ?
                  <img className="w-8 h-8 obj-cover text-xl rounded-full flex items-center justify-center cursor-pointer" src={currentUser.avatar_url} alt="profile" />
                  :
                  <UserOutlined />
                }
              </Dropdown>
            ) : (
              <>
                <div className="border-[1.5px] border-black rounded-3xl">
                  <div className="pt-1.5 pb-2 pl-3 pr-3">
                    <a
                      className="text-base font-medium cursor-pointer"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </a>
                  </div>
                </div>

              </>
            )}
            {/* <div
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => setIsSearchActive(true)}
            >
              <AiOutlineSearch size={24} />
            </div> */}
          </div>

          {/* Burger Menu for mobile */}
          <div className="md:hidden flex items-center">
            {userLoggedIn && (
              <button
                className="p-0 w-10 h-10 text-2xl relative mr-8"
                onClick={() => navigate("/cart/new")}
              >
                <ShoppingCartOutlined />
                <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full text-xs text-white font-semibold">
                  {cartCount}
                </span>
              </button>
            )}
            <MenuOutlined
              className="text-xl cursor-pointer"
              onClick={() => setIsDrawerOpen(true)}
            />
          </div>

          {/* Drawer for mobile menu */}
          <Drawer
            title="EduMaster"
            placement="right"
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
          >
            <div className="flex flex-col">
              <Button
                className={`navbar-button ${activeButton === "home" ? "active" : ""
                  }`}
                onClick={() => {
                  setActiveButton("home");
                  navigate("/");
                  setIsDrawerOpen(false);
                }}
              >
                Home
              </Button>
              <Button
                className={`navbar-button ${activeButton === "courses" ? "active" : ""
                  }`}
                onClick={() => {
                  setActiveButton("courses");
                  navigate("/course");
                  setIsDrawerOpen(false);
                }}
              >
                Courses
              </Button>
              <Button
                className={`navbar-button ${activeButton === "blog" ? "active" : ""
                  }`}
                onClick={() => {
                  setActiveButton("blog");
                  navigate("/blog");
                  setIsDrawerOpen(false);
                }}
              >
                Blog
              </Button>
              <Dropdown menu={menuProps}>
                <Button
                  className={`navbar-button ${activeButton === "pages" ? "active" : ""
                    }`}
                >
                  <Space>
                    Pages
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              {/* Log In and Sign Up */}
              {!userLoggedIn && !token ? (
                <>
                  <Button
                    className="mt-4 h-12 w-full text-lg py-4 view-button ant-btn-variant-solid font-jost"
                    onClick={() => {
                      navigate("/login");
                      setIsDrawerOpen(false);
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    className="mt-2 h-12 w-full text-lg py-4 view-button ant-btn-variant-solid font-jost"
                    onClick={() => {
                      navigate("/signup");
                      setIsDrawerOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Button
                  className="mt-4 h-12 w-full text-lg py-4 view-button ant-btn-variant-solid font-jost"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </Button>
              )}
            </div>
          </Drawer>
        </>
      ) : (
        <Input
          placeholder="Search..."
          style={{
            width: "90%",
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "16px",
            borderRadius: "20px",
            padding: "10px",
            height: "50px",
          }}
          autoFocus
          ref={searchInputRef}
        />
      )}
    </div>
  );
};

export default Navbar;
