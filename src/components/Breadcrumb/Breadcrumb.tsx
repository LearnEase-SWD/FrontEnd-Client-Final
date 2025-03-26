import React from "react";
import { Breadcrumb } from "antd"; // Sử dụng Ant Design cho breadcrumb
import { useLocation, Link } from "react-router-dom";

const DynamicBreadcrumb: React.FC = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment); // Tách đường dẫn thành các phần

  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>, // Trang chính
    },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      return {
        title: <Link to={path} className={`${ /\d/.test(segment) && "!hidden"}`}>{formatSegment(segment)}</Link>,
      };
    }),
  ];

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />;
};

export default DynamicBreadcrumb;
