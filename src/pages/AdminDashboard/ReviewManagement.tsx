import { useEffect, useState } from "react";
import { Button, Card, Table, Tooltip } from "antd";
import { EyeFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import ReviewModal from "../../components/Admin/AdminModals/ViewReviewModal";
import { Course, GetCourses } from "../../models/Course.model";
import CourseService from "../../services/course.service";
import GlobalSearchUnit from "../../components/GlobalSearchUnit";

const initialCoursesParams: GetCourses = {
  pageInfo: { pageNum: 1, pageSize: 10 },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    category_id: "",
    status: "",
  },
};

const ReviewManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchParams, setSearchParams] =
    useState<GetCourses>(initialCoursesParams);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Fetch courses from the service
  const fetchCourses = async () => {
    try {
      const res = await CourseService.getCourses(searchParams);
      const pageData = res.data?.pageData ?? [];
      setCourses(pageData);
      console.log("Courses fetched:", pageData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [searchParams]);

  // Open the modal with the selected course ID
  const handleViewReviews = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsModalVisible(true);
  };

  // Table columns
  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Instructor Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "View Review",
      key: "view_review",
      render: (_: any, course: Course) => (
        <Tooltip title="View Detail">
          <Button
            className="text-red-600"
            icon={<EyeFilled />}
            type="text"
            onClick={() => handleViewReviews(course._id)} 
          />
        </Tooltip>
      ),
    },
  ];

  const handleSearch = (values: Record<string, any>) => {
    setSearchParams((prev) => ({
      ...prev,
      searchCondition: {
        ...prev.searchCondition,
        keyword: values.keyword,
      },
    }));
  };
  return (
    <div>
      <Card>
        <h3 className="text-2xl my-5">Review Management</h3>
        <GlobalSearchUnit
          placeholder="Search By Course Name"
          onSubmit={handleSearch}
        />
        <Table
          dataSource={courses}
          columns={columns}
          pagination={{ pageSize: 5 }}
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }}
        />
        {isModalVisible && selectedCourseId && (
          <ReviewModal
            courseId={selectedCourseId} // Pass selected course_id to the modal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          />
        )}
      </Card>
    </div>
  );
};

export default ReviewManagement;