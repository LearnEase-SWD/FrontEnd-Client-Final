import React, { useEffect, useState } from "react";
import { Table, Card, Button, Tabs, FormProps } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useCustomNavigate } from "../../hooks/customNavigate";
import {
  Cart,
  CartStatusEnum,
  SearchCartByStatus,
} from "../../models/Cart.model";
import CartService from "../../services/cart.service";
import GlobalSearchUnit from "../../components/GlobalSearchUnit";

const InstructorCourseList: React.FC = () => {
  const navigate = useCustomNavigate();
  const [carts, setCarts] = useState<Cart[]>([]);
  const initialCartSearchParams: SearchCartByStatus = {
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
    searchCondition: {
      status: CartStatusEnum.COMPLETED,
      is_deleted: false,
    },
  };

  const [cartSearchParams, setCartSearchParams] = useState<SearchCartByStatus>(
    initialCartSearchParams
  );

  const fetchCart = async () => {
    const response = await CartService.getCartsByStatus(
      cartSearchParams
    );
    setCarts(response?.data?.pageData as Cart[]);
  };

  useEffect(() => {
    fetchCart();
  }, [cartSearchParams]);

  // Navigate to course details page
  const handleViewCourse = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  // Table columns with fixed width
  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      width: 200,
      render: (name: string, course: Cart) => (
        <Button type="link" onClick={() => handleViewCourse(course.course_id)}>
          {name}
        </Button>
      ),
    },
    {
      title: "Author",
      dataIndex: "instructor_name",
      key: "instructor_name",
    },

    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Image",
      dataIndex: "course_image",
      key: "course_image",
      render: (imageUrl: string) => (
        <img
          src={imageUrl}
          alt="Course"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "action",
      width: 150,
      render: (course: Cart) => (
       
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={() => handleViewCourse(course.course_id)}
            style={{ marginRight: 8 }}
          >
            Go to Course
          </Button>
          
      ),
    },
  ];

  const handleSearch: FormProps["onFinish"] = (values) => {
    setCartSearchParams((prev) => ({
      ...prev,
      searchCondition: {
        ...prev.searchCondition,
        keyword: values.keyword,
      },
    }));
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">My Learning</h3>

      <div>
        <GlobalSearchUnit
          placeholder="Search by Course Name"
          onSubmit={handleSearch}
        />
      </div>

      <Tabs>
        <Tabs.TabPane>
          <Table
            dataSource={carts}
            columns={columns}
            pagination={{ pageSize: 5 }}
            rowKey={(record) => record._id}
            bordered
            scroll={{ x: true }} 
          />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default InstructorCourseList;
