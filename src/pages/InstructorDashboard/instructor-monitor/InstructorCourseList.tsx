import React, { useEffect, useState } from "react";
import { Table, Card, Tag, Button, Modal, Tooltip } from "antd";
import {
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
  RocketFilled,
} from "@ant-design/icons";

import CourseOption from "./create-courses/CourseOption";
import CourseService from "../../../services/course.service";
import {
  Course,
  CourseRequest,
  CourseStatusEnum,
  GetCourses,
} from "../../../models/Course.model";
import { Category, GetCategories } from "../../../models/Category.model";
import CategoryService from "../../../services/category.service";
import { handleNotify } from "../../../utils/handleNotify";
import { capitalizeFirstLetter } from "../../../utils/capitalize";
import { CourseStatusToggle } from "../../../components/StatusToggle";
import GlobalSearchUnit from "../../../components/GlobalSearchUnit";
import { statusFormatter } from "../../../utils/statusFormatter";
import ReviewService from "../../../services/review.service";
import { GetReviews, Review } from "../../../models/Review.model";
import ReviewModal from "../../../components/Instructor/ReviewModal";
import { moneyFormatter } from "../../../utils/moneyFormatter";
import { BiSolidComment } from "react-icons/bi";
import DeleteItemModal from "../../../components/DeleteItemModal";

const initialCoursesParams: GetCourses = {
  pageInfo: {
    pageNum: 1,
    pageSize: 5,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    category_id: "",
    status: "",
  },
};

const initialCategoriesParams: GetCategories = {
  pageInfo: {
    pageNum: 1,
    pageSize: 100,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
  },
};

const reviewsParam: GetReviews = {
  pageInfo: {
    pageNum: 1,
    pageSize: 100,
  },
  searchCondition: {
    is_deleted: false,
    is_instructor: true,
  },
};

const InstructorCourseList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalReviewVisible, setIsModalReviewVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [listReviews, setListReviews] = useState<Review[]>([]);
  const [searchParams, setSearchParams] =
    useState<GetCourses>(initialCoursesParams);
  const [totalItems, setTotalItems] = useState<number>();

  const handleSeeReviews = async (course_id: string) => {
    fetchReviews(course_id);
    setIsModalReviewVisible(true);
  };

  const handleCloseReviews = async () => {
    setListReviews([]);
    setIsModalReviewVisible(false);
  };

  const showModal = async (course: Course) => {
    setSelectedCourse(null);
    const response = await CourseService.getCourse(course._id);
    if (response.data != undefined) {
      setSelectedCourse(response.data);
      fetchCategories();
      setIsModalVisible(true);
    }
  };

  const showModalCreate = () => {
    setIsModalCreateVisible(true);
    fetchCategories();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalCreateVisible(false);
    setSelectedCourse(null); // Reset selected course when closing
  };

  const fetchCourses = async () => {
    const response = await CourseService.getCourses(searchParams);
    setListCourses(response?.data?.pageData ?? []);
    setTotalItems(response?.data?.pageInfo?.totalItems);
  };

  const fetchReviews = async (course_id: string) => {
    const response = await ReviewService.getReviews(
      { ...reviewsParam, searchCondition: { course_id: course_id } },
      true
    );
    setListReviews(response?.data?.pageData ?? []);
  };

  const fetchCategories = async () => {
    const response = await CategoryService.getCategories(
      initialCategoriesParams
    );
    setListCategories(response?.data?.pageData ?? []);
  };

  const handleSearch = (values: Record<string, any>) => {
    
    setSearchParams({
      pageInfo: { ...searchParams.pageInfo, pageNum: 1  },
      searchCondition: {
        ...searchParams.searchCondition, 
        category_id: values.category_id,
        keyword: values.keyword,
        status: values.status,
      },
    });
  };

  const handleCreateCourse = async (values: CourseRequest) => {
    const { price, discount, video_url, image_url, ...otherValues } = values;
    const numericValues = {
      ...otherValues,
      price: price ? Number(price) : 0,
      discount: discount ? Number(discount) : 0,
      video_url: video_url || "",
      image_url: image_url || "",
    };

    const response = await CourseService.createCourse(numericValues);
    if (response.success) {
      handleCancel();
      handleNotify(
        "Course Created Successfully",
        "The course has been created successfully."
      );
      await fetchCourses();
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    const response = await CourseService.deleteCourse(courseId);
    if (response.success) {
      handleNotify(
        "Course Deleted Successfully",
        "The course has been deleted successfully."
      );
      await fetchCourses();
    }
    setDeleteModal(false);
  };

  const handleUpdateCourse = async (updatedCourse: CourseRequest) => {
    if (selectedCourse) {
      const response = await CourseService.updateCourse(
        selectedCourse._id,
        updatedCourse
      );
      if (response.success) {
        handleNotify(
          "Course Updated Successfully",
          "The course has been updated successfully."
        );
        await fetchCourses();
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
  },[])

  const handleSendToAdmin = async (course: Course) => {
    console.log("Sending course to admin:", course);

    const response = await CourseService.updateCourseStatus({
      course_id: course._id,
      new_status: CourseStatusEnum.WAITING_APPROVE,
      comment: "Please approve my course",
    });
    if (response.success) {
      handleNotify(
        "Request sent to admin",
        "The course will be awaiting approval. Please be alert in the next few days."
      );
      await fetchCourses();
    }
  };

  const handleToggleActive = async (course: Course) => {
    const newStatus =
      course.status === CourseStatusEnum.ACTIVE
        ? CourseStatusEnum.INACTIVE
        : CourseStatusEnum.ACTIVE;

    const response = await CourseService.updateCourseStatus({
      course_id: course._id,
      new_status: newStatus,
      comment: `Course status changed to ${newStatus}`,
    });

    if (response.success) {
      handleNotify(
        "Status Updated",
        `Course is now ${newStatus.toLowerCase()}`
      );
      await fetchCourses();
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (text: string) => (
        <span
          style={{
            maxWidth: 150,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
      ellipsis: true, // Ensures long text is truncated
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "New", value: CourseStatusEnum.NEW },
        { text: "Waiting Approve", value: CourseStatusEnum.WAITING_APPROVE },
        { text: "Approved", value: CourseStatusEnum.APPROVE },
        { text: "Rejected", value: CourseStatusEnum.REJECT },
        { text: "Active", value: CourseStatusEnum.ACTIVE },
        { text: "Inactive", value: CourseStatusEnum.INACTIVE },
      ],
      onFilter: (value: any, record: Course) =>
        record.status.trim() === value.trim(),
      render: (status: CourseStatusEnum) => {
        const statusColors = {
          [CourseStatusEnum.NEW]: "green",
          [CourseStatusEnum.WAITING_APPROVE]: "red",
          [CourseStatusEnum.APPROVE]: "yellow",
          [CourseStatusEnum.REJECT]: "yellow",
          [CourseStatusEnum.ACTIVE]: "yellow",
          [CourseStatusEnum.INACTIVE]: "yellow",
        };
        return (
          <Tag color={statusColors[status] || "gray"}>
            {capitalizeFirstLetter(status)}
          </Tag>
        );
      },
      ellipsis: true, // Ensures long status text is truncated
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <div className="text-right">{moneyFormatter(price)}</div>
      ),
      align: "right" as const,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      align: "right" as const,
      render: (discount: number) => (
        <div className="text-red-500 text-right">{discount}%</div>
      ),
    },
    {
      title: "Status Toggle",
      key: "statusToggle",
      align: "center" as const,
      render: (record: Course) => {
        const isDisabled =
          record.status === CourseStatusEnum.NEW ||
          record.status === CourseStatusEnum.WAITING_APPROVE ||
          record.status === CourseStatusEnum.REJECT;

        return (
          <CourseStatusToggle
            status={record.status}
            disabled={isDisabled}
            onToggle={async (newStatus) => {
              await handleToggleActive({
                ...record,
                status: newStatus,
              });
            }}
          />
        );
      },
    },
    {
      title: "Actions",
      key: "action",
      align: "center" as const,
      fixed: "right" as const,
      render: (record: Course) => (
        <div className="justify-center">
        <div className="flex justify-center">
          <Tooltip title="Edit" className="!font-jost">
            <Button
              type="text"
              icon={<EditFilled style={{ color: "blue" }} />}
              onClick={() => showModal(record)}
            />
          </Tooltip>
          <Tooltip title="Delete" className="!font-jost">
            <Button
              type="text"
              icon={<DeleteFilled style={{ color: "red" }} />}
              onClick={() => {
                setSelectedCourse(record);
                setDeleteModal(true);
              }}
            />
          </Tooltip>

          {(record.status == CourseStatusEnum.NEW || record.status == CourseStatusEnum.REJECT) &&  (
            <Tooltip
            title={
              record.lesson_count > 0
                ? "Send to admin for approval"
                : "Course is missing sessions, lessons"
            }
          >
            <Button
              type="text"
              icon={<RocketFilled style={{ color: record.lesson_count > 0 ? "green" : "gray" }} />}
              onClick= {() => handleSendToAdmin(record)}
              disabled={
                record.lesson_count === 0
              }
            />
          </Tooltip>
          )}
          {record.status !== CourseStatusEnum.NEW &&
            record.status !== CourseStatusEnum.REJECT &&
            record.status !== CourseStatusEnum.WAITING_APPROVE && (
              <Tooltip title="See reviews" className="!font-jost">
                <Button
                  type="text"
                  icon={
                    <BiSolidComment
                      fill="orange"
                      style={{ color: "orange" }}
                      className=""
                    />
                  }
                  onClick={() => handleSeeReviews(record._id)}
                  aria-label={"See reviews"}
                />
              </Tooltip>
            )}
        </div>
        </div>
      ),
    },
  ];

  const statuses = [
    CourseStatusEnum.ACTIVE,
    CourseStatusEnum.APPROVE,
    CourseStatusEnum.INACTIVE,
    CourseStatusEnum.NEW,
    CourseStatusEnum.REJECT,
    CourseStatusEnum.WAITING_APPROVE,
  ];

  return (
    <Card>
      <h3 className="text-2xl my-5">Course Management</h3>
      <div className="flex justify-between">
        <GlobalSearchUnit
          placeholder="Search By Course Name"
          selectFields={[
            {
              name: "status",
              options: statuses.map((status) => ({
                label: statusFormatter(status),
                value: status,
              })),
              placeholder: "Filter by Status",
            },
            {
              name: "category_id",
              options: listCategories.map((category) => ({
                label: category.name,
                value: category._id,
              })),
              placeholder: "Filter by Category",
            },
          ]}
          onSubmit={handleSearch}
        />
        <div>
          <Button
            onClick={showModalCreate}
            icon={<PlusCircleOutlined />}
            shape="round"
            variant="solid"
            color="primary"
            className="items-center"
          >
            Create Course
          </Button>
        </div>
      </div>
      <Table
        dataSource={listCourses}
        columns={columns}
        pagination={{
          pageSize: 5,
          total: totalItems,
          current: searchParams.pageInfo.pageNum,
          onChange: (page) =>
            setSearchParams({
              ...searchParams,
              pageInfo: { ...searchParams.pageInfo, pageNum: page },
            }),
        }}
        rowKey="name"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />

      <Modal
        title="Change Course"
        onCancel={handleCancel}
        open={isModalVisible}
        footer={null}
        width={1000}
        forceRender
        destroyOnClose={true}
      >
        {selectedCourse && (
          <CourseOption
            key={selectedCourse._id}
            categories={listCategories}
            initializeValue={selectedCourse}
            mode="update"
            onFinished={handleUpdateCourse}
          />
        )}
      </Modal>

      <Modal
        title="Create Course"
        onCancel={handleCancel}
        open={isModalCreateVisible}
        footer={null}
        width={1000}
        forceRender
        destroyOnClose={true}
      >
        <CourseOption
          key={isModalCreateVisible ? "create-new" : "create"} // Add key prop to force remount
          mode="create"
          onFinished={handleCreateCourse}
          categories={listCategories}
        />
      </Modal>

      <DeleteItemModal
        visible={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onDelete={() => handleDeleteCourse(selectedCourse?._id!)}
        itemName={selectedCourse?.name}
        itemType="Course" // Pass the type as 'category'
      />

      <ReviewModal
        reviews={listReviews}
        onClose={() => handleCloseReviews()}
        isOpen={isModalReviewVisible}
      />
    </Card>
  );
};

export default InstructorCourseList;
