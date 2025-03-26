import { useState } from "react";
import { Button, Card, Input, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  CourseStatusEnum,
  listCourses,
} from "../../AdminDashboard/monitors/course/courseList";

// Cột cho bảng Course Log
const columns = [
  {
    title: "Course Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    filters: [
      { text: CourseStatusEnum.ACTIVE, value: CourseStatusEnum.ACTIVE },
      { text: CourseStatusEnum.APPROVED, value: CourseStatusEnum.APPROVED },
      { text: CourseStatusEnum.REJECTED, value: CourseStatusEnum.REJECTED },
      // Thêm các trạng thái khác nếu cần
    ],
    onFilter: (value: any, record: any) =>
      record.status.trim() === value.trim(),
    render: (status: any) => (
      <Tag
        color={
          status === CourseStatusEnum.ACTIVE
            ? "green"
            : status === CourseStatusEnum.APPROVED
            ? "blue"
            : status === CourseStatusEnum.REJECTED
            ? "red"
            : "orange" // cho các trạng thái khác
        }
      >
        {status}
      </Tag>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price: any) => `$${price}`,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    render: (discount: any) => `${discount}%`,
  },
  {
    title: "Action",
    key: "action",
    render: (record: any) => (
      <Button type="primary" onClick={() => handleAction(record)}>
        View Details
      </Button>
    ),
  },
];

const InstructorCourseLog = () => {
  const [searchText, setSearchText] = useState("");

  // Hàm tìm kiếm
  const handleSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  // Lọc danh sách khóa học dựa trên tên
  const filteredCourses = listCourses.filter((course: any) =>
    course.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card>
      <h3 className="text-2xl my-5">Course Log</h3>
      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        value={searchText}
        onChange={handleSearch}
      />
      <Table
        dataSource={filteredCourses}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="name" // Nên thay thế bằng id nếu có
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default InstructorCourseLog;

const handleAction = (record: any) => {
  console.log("Viewing details for:", record);
};
