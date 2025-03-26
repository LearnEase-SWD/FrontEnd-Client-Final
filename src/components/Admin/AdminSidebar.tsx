import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  UserOutlined,
  FormOutlined,
  FolderOutlined,
  MoneyCollectOutlined,
  FileTextOutlined,
  SettingOutlined,
  BookOutlined,
  HourglassOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

interface MenuItem {
  key: string;
  icon?: React.ReactNode; // Icon là tùy chọn
  label: string;
  path?: string;
  items?: MenuItem[]; // Các item con là một danh sách MenuItem
}

const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/dashboard/admin/",
  },
  {
    key: "management",
    icon: <BarChartOutlined />,
    label: "Management",
    items: [
      {
        key: "users",
        icon: <UserOutlined />,
        label: "Users",
        path: "/dashboard/admin/users",
      },
      {
        key: "request-management",
        icon: <FormOutlined />,
        label: "Request",
        path: "/dashboard/admin/request-management",
      },
      {
        key: "categories",
        icon: <FolderOutlined />,
        label: "Categories",
        path: "/dashboard/admin/categories",
      },
      {
        key: "payout",
        icon: <MoneyCollectOutlined />,
        label: "Payout",
        path: "/dashboard/admin/payout",
      },
      {
        key: "blog",
        icon: <FileTextOutlined />,
        label: "Blog",
        path: "/dashboard/admin/blog",
      },
      {
        key: "all-courses",
        icon: <BookOutlined />,
        label: "All Courses",
        path: "/dashboard/admin/all-courses",
      },
      {
        key: "review",
        icon: <StarOutlined />,
        label: "Review",
        path: "/dashboard/admin/review",
      },
      {
        key: "pending-courses",
        icon: <HourglassOutlined />,
        label: "Pending Course",
        path: "/dashboard/admin/pending-courses",
      },
      {
        key: "purchase-log",
        icon: <ShoppingCartOutlined />,
        label: "Purchase log",
        path: "/dashboard/admin/purchase-log",
      },
    ],
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
    path: "/dashboard/admin/settings",
  },
];

const AdminSidebar: React.FC<{ onMenuClick?: () => void }> = ({
  onMenuClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastPathSegment = pathSegments[2]; 
  const [selectedParent, setSelectedParent] = useState<string>("");

  useEffect(() => {
    if (lastPathSegment) {
      const foundParent = menuItems.find((item) => {
        const isDirectMatch = item.key === lastPathSegment;
        const hasMatchingChild = item.items?.some(
          (child) => child.key === lastPathSegment
        );
        return isDirectMatch || hasMatchingChild;
      });

      setSelectedParent(foundParent?.key ?? "");
    }
  }, [lastPathSegment]);

  const handleMenuClick = (key: string) => {
    if (onMenuClick) onMenuClick(); // Close Drawer if needed

    const selectedItem = menuItems.find(
      (item) =>
        item.key === key || item.items?.some((child) => child.key === key)
    );
    if (selectedItem) {
      const path =
        selectedItem.path ||
        selectedItem.items?.find((child) => child.key === key)?.path;
      if (path) navigate(path);
    }
  };

  const renderMenuItems = (items: typeof menuItems) => {
    return items.map((item) => {
      const menuItem = {
        key: item.key,
        icon: item.icon,
        label: item.label,
        onClick: () => handleMenuClick(item.key),
      };

      if (item.items) {
        // For submenu, use items
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          children: item.items.map((child) => ({
            icon: child.icon,
            key: child.key,
            label: child.label,
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

export default AdminSidebar;
