import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  MoneyCollectOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    title: "Dashboard",
    label: "Dashboard",
    path: "/dashboard/instructor/",
  },

  {
    key: "management",
    icon: <BarChartOutlined />,
    label: "Management",  
    children: [
      {
        key: "my-courses",
        title: "My Courses",
        icon: <BookOutlined />,
        path: "/dashboard/instructor/my-courses",
      },
      {
        key: "orders",
        icon: <ShoppingCartOutlined />,
        title: "Orders",
        label: "Orders",
        path: "/dashboard/instructor/orders",
      },
      {
        key: "payout",
        icon: <MoneyCollectOutlined />,
        title: "Payout",
        path: "/dashboard/instructor/payout",
      },
      
    ],
  },

  {
    key: "my-learning",
    icon: <BookOutlined />,
    title: "My Learning",
    label: "My Learning",
    path: "/dashboard/instructor/my-learning",
  },
  {
    key: "orders-history",
    icon: <HistoryOutlined />,
    label: "Orders History",
    path: "/dashboard/instructor/orders-history", 
  },
  {
    key: "subscription",
    icon: <UserOutlined />,
    title: "Subscription",
    label: "Subscription",
    path: "/dashboard/instructor/subscription",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    title: "Settings",
    label: "Settings",
    path: "/dashboard/instructor/settings",
  }
];

const InstructorSidebar: React.FC<{ onMenuClick?: () => void }> = ({
  onMenuClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastPathSegment = pathSegments[2];
  const [selectedParent, setSelectedParent] = useState<string>("")

  useEffect(() => {
    if (lastPathSegment) {
      setSelectedParent(menuItems.find(
        (item) =>
          item.key === lastPathSegment ||
          item.children?.some((child) => lastPathSegment.includes(child.key))
      )?.key ?? "");
    }

  },[lastPathSegment])
  
  const handleMenuClick = (key: string) => {
    if (onMenuClick) onMenuClick(); // Close Drawer if needed

    const selectedItem = menuItems.find(
      (item) =>
        item.key === key || item.children?.some((child) => child.key === key)
    );
    if (selectedItem) {
      const path =
        selectedItem.path ||
        selectedItem.children?.find((child) => child.key === key)?.path;
      if (path) navigate(path);
    }
  };

  const renderMenuItems = (items: typeof menuItems) => {
    return items.map((item) => {
      const menuItem = {
        key: item.key,
        icon: item.icon,
        label: item.label,
        title: item.title,
        onClick: () => handleMenuClick(item.key),
      };

      if (item.children) {
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          title: item.title,
          children: item.children.map((child) => ({
            key: child.key,
            icon: child.icon,
            label: child.title,
            onClick: () => handleMenuClick(child.key),
          })),
        };
      }
      return menuItem; // Return the regular menu item
    });
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={[selectedParent, lastPathSegment ?? "dashboard"]}
      items={renderMenuItems(menuItems)}
    />
  );
};

export default InstructorSidebar;
