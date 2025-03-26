import { useState } from "react";
import { Button, Card, Input, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { purchaseLog } from "../../AdminDashboard/monitors/course/courseList";

// Cột cho bảng Purchase Log
const columns = [
  {
    title: "Course Name",
    dataIndex: "courseName",
    key: "courseName",
  },
  {
    title: "Purchase Number",
    dataIndex: "purchaseNumber",
    key: "purchaseNumber",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    filters: [
      { text: "Completed", value: "Completed" },
      { text: "Pending", value: "Pending" },
      { text: "Refunded", value: "Refunded" },
    ],
    onFilter: (value: any, record: any) =>
      record.status.trim() === value.trim(),
    render: (status: string) => (
      <Tag
        color={
          status === "Completed"
            ? "green"
            : status === "Pending"
            ? "orange"
            : "red" // Màu cho trạng thái khác (Refunded)
        }
      >
        {status}
      </Tag>
    ),
  },
  {
    title: "Price Paid",
    dataIndex: "pricePaid",
    key: "pricePaid",
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    render: (discount: number) => `${discount}%`,
  },
  {
    title: "Student Name",
    dataIndex: "studentName",
    key: "studentName",
  },
  {
    title: "Instructor Name",
    dataIndex: "instructorName",
    key: "instructorName",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => new Date(date).toLocaleDateString(),
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

const instructorPurchaselog = () => {
  const [searchText, setSearchText] = useState("");

  // Hàm tìm kiếm
  const handleSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  // Lọc danh sách purchase log dựa trên tên khóa học
  const filteredCourses = purchaseLog.filter((course: any) =>
    course.courseName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card>
      <h3 className="text-2xl my-5">Purchase Log</h3>
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
        pagination={{ pageSize: 4 }}
        rowKey="purchaseNumber"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default instructorPurchaselog;

const handleAction = (record: any) => {
  console.log("Viewing details for:", record);
};
