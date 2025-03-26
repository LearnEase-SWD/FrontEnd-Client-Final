import { useState, useEffect } from "react";
import { Table, Card, Button, Modal, Tooltip } from "antd";
import {
  PlusCircleOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";

import dayjs from "dayjs";

import SessionOptions from "./create-courses/SessionOptions";
import {
  GetSessions,
  Session,
  SessionRequest,
} from "../../../models/Session.model";
import { Course, GetCourses } from "../../../models/Course.model";
import SessionService from "../../../services/session.service";
import CourseService from "../../../services/course.service";
import { handleNotify } from "../../../utils/handleNotify";
import GlobalSearchUnit from "../../../components/GlobalSearchUnit";
import DeleteItemModal from "../../../components/DeleteItemModal";

const initialCoursesParams: GetCourses = {
  pageInfo: {
    pageNum: 1,
    pageSize: 100,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    category_id: "",
  },
};

const initialSessionsParams: GetSessions = {
  pageInfo: {
    pageNum: 1,
    pageSize: 5,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    is_position_order: true,
    course_id: "",
  },
};

const InstructorSessionList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [listSessions, setListSessions] = useState<Session[]>([]);
  const [searchParams, setSearchParams] = useState<GetSessions>(
    initialSessionsParams
  );
  const [totalItems, setTotalItems] = useState<number>()

  const showModal = (session: Session) => {
    setSelectedSession(null); // Reset the selected session first
    setSelectedSession(session);
    setIsModalVisible(true);
  };

  const showModalCreate = () => {
    setIsModalCreateVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalCreateVisible(false);
    setSelectedSession(null); // Reset selected session when closing
  };

  const fetchCourses = async () => {
    const response = await CourseService.getCourses(initialCoursesParams);
    setListCourses(response?.data?.pageData ?? []);
  };

  const fetchSessions = async () => {
    const response = await SessionService.getSessions(searchParams);
    setListSessions(response?.data?.pageData ?? []);
    setTotalItems(response?.data?.pageInfo?.totalItems);
  };

  const handleCreateSession = async (values: SessionRequest) => {
    const { position_order, ...otherValues } = values;
    const numericValues = {
      ...otherValues,
      position_order: position_order ? Number(position_order) : 0,
    };

    const response = await SessionService.createSession(numericValues);
    if (response.success) {
      handleCancel(); // Close modal if successful
      handleNotify(
        "Session Created Successfully",
        "The session has been created successfully."
      );
      await fetchSessions(); // Refresh the course list
    }
  };

  const handleUpdateSession = async (updatedSession: SessionRequest) => {
    if (selectedSession) {
      const response = await SessionService.updateSession(
        selectedSession._id,
        updatedSession
      );
      if (response.success) {
        handleNotify(
          "Session Updated Successfully",
          "The session has been updated successfully."
        );
        await fetchSessions(); // Refresh the course list
      }
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    const response = await SessionService.deleteSession(sessionId);
    if (response.success) {
      handleNotify(
        "Session Deleted Successfully",
        "The Session has been deleted successfully."
      );
      await fetchSessions(); // Refresh the course list
    }
    setDeleteModal(false);
  };

  const handleSearch = (values: Record<string, any>) => {
    console.log(values);
    setSearchParams({
      pageInfo: { ...searchParams.pageInfo, pageNum: 1  },
      searchCondition: {
        ...searchParams.searchCondition, // Spread existing searchCondition fields
        course_id: values.course_id,
        keyword: values.keyword,
      },
    });
  };

  useEffect(() => {
    fetchCourses(); // Call the async function
    fetchSessions(); // Call the async function
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [searchParams]); //update based on search params

  // filter sessions usefx
  // useEffect(() => {
  //   let filtered = [...listSessions];

  //   if (selectedCourse) {
  //     filtered = filtered.filter(
  //       session => String(session.course_id) === String(selectedCourse)
  //     );
  //   }

  //   if (searchText) {
  //     filtered = filtered.filter(session =>
  //       session.name.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //   }

  //   setFilteredSessions(filtered);
  // }, [selectedCourse, searchText]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
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
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      ellipsis: true,
      render: (record: Session) => {
        return <div>{dayjs(record._id).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Actions",
      key: "action",
      width: 70,
      align: "center" as const,
      fixed: "right" as const,
      render: (record: Session) => (
        <div className="flex justify-between">
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
                setSelectedSession(record);
                setDeleteModal(true);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <h3 className="text-2xl my-5">Session Management</h3>
      <div className="flex justify-between overflow-hidden">
        <GlobalSearchUnit
          onSubmit={handleSearch}
          placeholder="Search By Session Name"
          selectFields={[
            {
              name: "course_id",
              options: listCourses.map((course) => ({
                label: course.name,
                value: course._id,
              })),
              placeholder: "Filter by Course",
            },
          ]}
        />
        <div className="flex">
          <Button
            onClick={showModalCreate}
            icon={<PlusCircleOutlined />}
            shape="round"
            type="primary"
            className="items-center"
          >
            Create Session
          </Button>
        </div>
      </div>
      <Table
        dataSource={listSessions}
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

      {/* update */}
      <Modal
        title="Change Session"
        onCancel={handleCancel}
        open={isModalVisible}
        footer={null}
        forceRender
        width={1000}
        destroyOnClose={true}
      >
        {selectedSession && (
          <SessionOptions
            key={selectedSession._id}
            listCourses={listCourses}
            initialState={selectedSession}
            mode="update"
            onFinish={handleUpdateSession}
          />
        )}
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Create Session"
        onCancel={handleCancel}
        open={isModalCreateVisible}
        footer={null}
        forceRender
        width={1000}
        destroyOnClose={true}
      >
        <SessionOptions
          key={isModalCreateVisible ? "create-new" : "create"}
          listCourses={listCourses}
          mode="create"
          onFinish={handleCreateSession}
        />
      </Modal>
      <DeleteItemModal
        visible={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onDelete={() => handleDeleteSession(selectedSession?._id!)}
        itemName={selectedSession?.name}
        itemType="Lesson" // Pass the type as 'category'
      />
    </Card>
  );
};

export default InstructorSessionList;
