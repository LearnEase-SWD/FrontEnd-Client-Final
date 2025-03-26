import { Table, Card, Tag, TableProps } from "antd";
import {
  GetLessons,
  Lesson,
  LessonTypeEnum,
} from "../../../../models/Lesson.model";
import { useEffect, useState } from "react";
import LessonService from "../../../../services/lesson.service";
import GlobalSearchUnit from "../../../../components/GlobalSearchUnit";
import { Course, GetCourses } from "../../../../models/Course.model";
import { GetSessions, Session } from "../../../../models/Session.model";
import CourseService from "../../../../services/course.service";
import SessionService from "../../../../services/session.service";

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
    pageSize: 10,
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
    pageSize: 10,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    course_id: "",
    is_position_order: false,
  },
};

const LessonList = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [listSessions, setListSessions] = useState<Session[]>([]);
  const [listLessons, setListLessons] = useState<Lesson[]>([]);
  const [sessionSearchParams, setSessionSearchParams] = useState<GetSessions>(initialSessionsParams);
  // const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] =
    useState<GetLessons>(initialLessonsParams);

  const fetchCourses = async () => {
    // setLoading(true);
    // try {
      const response = await CourseService.getCourses(initialCoursesParams);
      setListCourses(response?.data?.pageData ?? []);
    // } finally {
    //   setLoading(false);
    // }
  };

  const fetchSessions = async () => {
    // // setLoading(true);
    // try {
      const response = await SessionService.getSessions(sessionSearchParams);
      setListSessions(response?.data?.pageData ?? []);
    // } finally {
    //   setLoading(false);
    // }
  };

  const fetchLessons = async () => {
    // try {
    //   setLoading(true);
      const response = await LessonService.getLessons({
        ...searchParams,
        pageInfo: { pageNum: searchParams.pageInfo.pageNum, pageSize },
      });
      setListLessons(response.data?.pageData ?? []);
      setTotal(response.data?.pageInfo?.totalItems ?? 0);
    // } catch (err) {
    //   console.error("Error fetching lessons:", err);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  useEffect(() => {
    fetchLessons();
  }, [pageNum, pageSize, searchParams]);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchSessions();
  },[sessionSearchParams])


  const columns: TableProps<Lesson>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true, 
      render: (text:string) => (
        <span style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>
          {text}
        </span>
      ),
    },
    {
      title: "Session Name",
      dataIndex: "session_name",
      key: "session_name",
      ellipsis: true, 
      render: (text:string) => (
        <span style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>
          {text}
        </span>
      ),
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
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
      title: "Media",
      dataIndex: "video_url",
      key: "video_url",
      render: (video_url) => (
        <div className="h-full w-full md:w-[200px]">
          <video className="w-200px h-auto" src={video_url} controls>
            Your browser does not support the video tag.
          </video>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "lesson_type",
      key: "lesson_type",
      align: 'center',
      render: (lesson_type: LessonTypeEnum) => (
        <Tag className="mx-auto "color="gray">{lesson_type}</Tag>
      ),
    },
    {
      title: "Time (min.)",
      dataIndex: "full_time",
      key: "full_time",
      align: 'right',
      ellipsis: true,
      render: (time: number) => (
        <div>{time}</div>
      )
    },
  ];

  const handleSearch = (values: Record<string, any>) => {
    setSearchParams({
      pageInfo: { ...searchParams.pageInfo, pageNum: 1  },
      searchCondition: {
        ...searchParams.searchCondition,
        keyword: values.keyword,
        course_id: values.course_id,
        session_id: values.session_id,
      },
    });
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Lesson Management</h3>
      <div className="flex justify-between">
        <div className="flex justify-between gap-4 mb-5 overflow-hidden">
          <GlobalSearchUnit
            onSubmit={handleSearch}
            placeholder="Search by Lesson Name"
            isDependentSelect
            selectFields={[
              {
                name: "course_id",
                placeholder: "Filter by Course",
                options: listCourses.map((course) => ({
                  value: course._id,
                  label: course.name,
                })),
                onChange: (value:string) => {
                  setSessionSearchParams({...sessionSearchParams, searchCondition: {...searchParams.searchCondition, course_id: value}})                } 
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
              },
            ]}
          />
        </div>
      </div>
      <Table
        dataSource={listLessons}
        columns={columns}
        pagination={{
          pageSize: pageSize,
          total: total,
          current: searchParams.pageInfo.pageNum,
          onChange: (page) =>
            setSearchParams({
              ...searchParams,
              pageInfo: { ...searchParams.pageInfo, pageNum: page },
            }),
        }}
        onChange={handleTableChange}
        rowKey={(record) => record._id}
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default LessonList;
