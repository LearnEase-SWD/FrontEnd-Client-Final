import { useEffect, useState } from "react";
import {
  Table,
  Card,
  Tag,
  TableProps,
  Button,
  Modal,
  Tooltip,
  Form,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import LessonIOptions from "./create-courses/LessonIOptions";
import {
  GetLessons,
  Lesson,
  LessonRequest,
} from "../../../models/Lesson.model";
import CourseService from "../../../services/course.service";
import SessionService from "../../../services/session.service";
import { Course, GetCourses } from "../../../models/Course.model";
import { GetSessions, Session } from "../../../models/Session.model";
import LessonService from "../../../services/lesson.service";
import { handleNotify } from "../../../utils/handleNotify";
import GlobalSearchUnit from "../../../components/GlobalSearchUnit";
import DeleteItemModal from "../../../components/DeleteItemModal";
import { RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";

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
    pageSize: 100,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    is_position_order: true,
    course_id: "",
  },
};

const initialLessonsParams: GetLessons = {
  pageInfo: {
    pageNum: 1,
    pageSize: 5,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    course_id: "",
    is_position_order: false,
  },
};

const InstructorLessonList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>({} as Lesson);
  const [deleteModal, setDeleteModal] = useState(false);
  // const [selectedCourse, setSelectedCourse] = useState<string>();
  // const [selectedSession, setSelectedSession] = useState<string>();
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [listSessions, setListSessions] = useState<Session[]>([]);
  const [listLessons, setListLessons] = useState<Lesson[]>([]);
  const [searchParams, setSearchParams] =
    useState<GetLessons>(initialLessonsParams);
  const [sessionSearchParams, setSessionSearchParams] = useState<GetSessions>(
    initialSessionsParams
  );
  const [totalItems, setTotalItems] = useState<number>();
  const {currentUser} = useSelector((state:RootState) => state.auth.login)
  const [lessonToDelete, setLessonToDelete] = useState<Lesson>({} as Lesson);

  const [createForm] = Form.useForm<Lesson>();
  const [updateForm] = Form.useForm<Lesson>();


  const showModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalVisible(true);
    fetchCourses();
  };

  const showCreateModal = () => {
    setIsModalCreateVisible(true);
    fetchCourses();
  };

  const resetModalState = () => {
    setSelectedLesson({} as Lesson);
    setIsModalVisible(false);
    setIsModalCreateVisible(false);
    createForm.resetFields();
    updateForm.resetFields();
  };

  const handleCancel = () => {
    resetModalState();
    createForm.resetFields();
    updateForm.resetFields();
    console.log("cancelling");
  };

  const fetchCourses = async () => {
    const response = await CourseService.getCourses(initialCoursesParams);
    setListCourses(response?.data?.pageData ?? []);
  };

  const fetchSessions = async () => {
    console.log(sessionSearchParams);
    const response = await SessionService.getSessions(sessionSearchParams);
    setListSessions(response?.data?.pageData ?? []);
  };

  const fetchLessons = async () => {
    const response = await LessonService.getLessons(searchParams);
    setListLessons(response?.data?.pageData ?? []);
    setTotalItems(response?.data?.pageInfo?.totalItems);
  };

  const handleCreateLesson = async (values: LessonRequest) => {
    console.log("is create")
    const {
      position_order,
      full_time,
      image_url,
      video_url,
      assignment,
      ...otherValues
    } = values;
    const numericValues: LessonRequest = {
      ...otherValues,
      position_order: position_order ? Number(position_order) : 0,
      full_time: full_time ? Number(full_time) : 0,
      video_url: video_url || "",
      image_url: image_url || "",
      assignment: assignment || "",
    };

    if (numericValues.assignment === "") {
      delete numericValues.assignment;
    }

    const response = await LessonService.createLesson(numericValues);
    if (response.success) {
      resetModalState();
      handleNotify(
        "Lesson Created Successfully",
        "The lesson has been created successfully."
      );
      await fetchLessons();
    }
  };

  const handleUpdateLesson = async (values: LessonRequest) => {
    const numericValues: LessonRequest = {
      ...values,
      position_order: values.position_order ? Number(values.position_order) : 0,
      full_time: values.full_time ? Number(values.full_time) : 0,
      video_url: values.video_url || "",
      image_url: values.image_url || "",
      assignment: "",
      description: values.description || "",
      user_id: currentUser._id
    };
    console.log(numericValues)
    if (selectedLesson) {
      const response = await LessonService.updateLesson(
        selectedLesson._id,
        numericValues
      );
      if (response.success) {
        resetModalState();
        handleNotify(
          "Lesson Updated Successfully",
          "The lesson has been updated successfully."
        );
        await fetchLessons();
      }
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    const response = await LessonService.deleteLesson(lessonId);
    if (response.success) {
      handleNotify(
        "Lesson Deleted Successfully",
        "The lesson has been deleted successfully."
      );
      await fetchLessons();
    }
    setDeleteModal(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (sessionSearchParams === initialSessionsParams) return
    fetchSessions();
  }, [sessionSearchParams]);

  useEffect(() => {
    fetchLessons();
  }, [searchParams]);

  const columns: TableProps<Lesson>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Session Name",
      dataIndex: "session_name",
      key: "session_name",
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
    // {
    //   title: "Instructor",
    //   dataIndex: "user_name",
    //   key: "user_name",
    //   ellipsis: true,
    // },
    {
      title: "Media",
      dataIndex: "lesson_type",
      key: "lesson_type",
      render: (lesson_type: "video" | "image") => {
        return <Tag color="gray">{lesson_type}</Tag>;
      },
    },
    {
      title: "Time",
      dataIndex: "full_time",
      key: "full_time",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return <div>{dayjs(created_at).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Actions",
      key: "action",
      width: 70,
      align: "center" as const,
      fixed: "right" as const,
      render: (record: Lesson) => (
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
                setLessonToDelete(record);
                setDeleteModal(true);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleSearch = (values: Record<string, any>) => {
    setSearchParams({
      pageInfo: { ...searchParams.pageInfo, pageNum: 1  },
      searchCondition: {
        ...searchParams.searchCondition,
        course_id: values.course_id,
        session_id: values.session_id,
        keyword: values.keyword,
      },
    });
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Lesson Management</h3>
      <div className="flex justify-between">
        <div className="flex justify-between gap-4 overflow-hidden">
          <GlobalSearchUnit
            onSubmit={handleSearch}
            placeholder="Search by Lesson Name"
            isDependentSelect={true}
            selectFields={[
              {
                name: "course_id",
                placeholder: "Filter by Course",
                options: listCourses.map((course) => ({
                  value: course._id,
                  label: course.name,
                })),
                onChange: (value: string) => {
                  setSessionSearchParams({
                    ...sessionSearchParams,
                    searchCondition: {
                      ...searchParams.searchCondition,
                      course_id: value,
                    },
                  });
                },
              },
              {
                name: "session_id",
                placeholder: "Filter by Session",
                options: listSessions.map((session) => ({
                  value: session._id,
                  label: session.name,
                  dependence: session.course_id,
                })),
                dependenceName: "course_id",
                // onClick: () => fetchCourses()
              },
            ]}
          />
        </div>

        <div className="flex">
          <Button
            onClick={showCreateModal}
            icon={<PlusCircleOutlined />}
            shape="round"
            type="primary"
            className="items-center"
          >
            Create Lesson
          </Button>
        </div>
      </div>
      <Table
        dataSource={listLessons}
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
        rowKey="id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />

      <Modal
        title="Lesson Details"
        open={isModalVisible}
        onCancel={() => handleCancel()}
        footer={null}
        forceRender
        width={1200}
        className="min-h-800"
        destroyOnClose={true}
      >
          <LessonIOptions
            form={updateForm}
            onCourseChange={(value) => {
              console.log("line 392");
              setSessionSearchParams({
                ...sessionSearchParams,
                searchCondition: {
                  ...sessionSearchParams.searchCondition,
                  course_id: value,
                },
              });
            }}
            listCourses={listCourses}
            listSessions={listSessions}
            onFinished={handleUpdateLesson}
            mode="update"
            initialValues={selectedLesson}
          />        
      </Modal>

      <Modal
        title={<h1 className="text-lg">Lesson Details</h1>}
        open={isModalCreateVisible}
        onCancel={() => handleCancel()}
        footer={null}
        forceRender
        width={1200}
        className="min-h-800"
        destroyOnClose={true}
      >
        <LessonIOptions
          form={createForm}
          resetVisbility={isModalCreateVisible}
          onCourseChange={(value) =>
            setSessionSearchParams({
              ...sessionSearchParams,
              searchCondition: {
                ...sessionSearchParams.searchCondition,
                course_id: value,
              },
            })
          }
          onFinished={handleCreateLesson}
          mode="create"
          listCourses={listCourses}
          listSessions={listSessions}
        />
      </Modal>
      <DeleteItemModal
        visible={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onDelete={() => handleDeleteLesson(lessonToDelete?._id)}
        itemName={selectedLesson?.name}
        itemType="Lesson" // Pass the type as 'category'
      />
    </Card>
  );
};

export default InstructorLessonList;
