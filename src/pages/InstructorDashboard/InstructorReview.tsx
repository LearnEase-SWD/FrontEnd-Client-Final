import { Card, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const InstructorReview = () => {
  // const [dataSource, setDataSource] = useState([
  const [dataSource] = useState([
    {
      key: "1",
      name: "Photography & Video",
      courseName: "Design & Edit",
      comment: "Good",
      rating: "4.5/5",
      date: "16-10-2024",
    },
    {
      key: "2",
      name: "Education",
      courseName: " ",
      comment: "Good",
      rating: "4.5/5",
      date: "16-10-2024",
    },
    {
      key: "3",
      name: "Music Production",
      courseName: "Music",
      comment: "Good",
      rating: "4.7/5",
      date: "16-10-2024",
    },
  ]);
  const columns = [
    {
      title: "Reviewer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Create At",
      dataIndex: "date",
      key: "date",
    },
  ];
  return (
    <div>
      <Card>
        <div className="flex">
          <h3 className="text-2xl my-5">Review</h3>
        </div>
        <Input
          placeholder="Search By Course Name"
          prefix={<SearchOutlined />}
          style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }} // Thêm scroll cho bảng
        />
      </Card>
    </div>
  );
};

export default InstructorReview;
