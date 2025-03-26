import { Table, Card, TableProps } from "antd";
import dayjs from "dayjs";
import { GetSessions, Session } from "../../../../models/Session.model";
import SessionService from "../../../../services/session.service";
import { useEffect, useState } from "react";
import GlobalSearchUnit from "../../../../components/GlobalSearchUnit";
import CourseService from "../../../../services/course.service";
import { Course, GetCourses } from "../../../../models/Course.model";

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

const SessionList = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [listSessions, setListSessions] = useState<Session[]>([]);
  // const [loading, setLoading] = useState(false);
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [searchParams, setSearchParams] = useState<GetSessions>(
    initialSessionsParams
  );

  const fetchCourses = async () => {
    // setLoading(true);
    // try {
      const response = await CourseService.getCourses(initialCoursesParams);
      setListCourses(response.data?.pageData as Course[]);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleSearch = (values: Record<string, any>) => {
    setSearchParams({
      pageInfo: { ...searchParams.pageInfo, pageNum: 1  },
      searchCondition: {
        ...searchParams.searchCondition,
        course_id: values.course_id || "",
        keyword: values.keyword || "",
      },
    });
  };

  const fetchSessions = async () => {
    // setLoading(true);
    // try {
      const response = await SessionService.getSessions({
        ...searchParams,
        pageInfo: { pageNum: searchParams.pageInfo.pageNum, pageSize },
      });
      setListSessions(response.data?.pageData ?? []);
      setTotal(response.data?.pageInfo?.totalItems ?? 0);
    // } catch (err) {
    //   console.error("Error fetching sessions:", err);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
    setSearchParams((prevParams) => ({
      ...prevParams,
      pageInfo: { pageNum: pagination.current, pageSize: pagination.pageSize },
    }));
  };

  useEffect(() => {
    fetchSessions();
  }, [searchParams, pageNum, pageSize]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const columns: TableProps<Session>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (text: string) => (
        <span
          style={{
            maxWidth: 200,
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
      title: "Name",
      dataIndex: "course_name",
      key: "name",
      ellipsis: true,
      render: (text: string) => (
        <span
          style={{
            maxWidth: 400,
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
      align: 'center',
      render: (createdAt: string) => dayjs(createdAt).format("DD/MM/YYYY"),
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
      </div>
      <Table
        dataSource={listSessions}
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
        rowKey="_id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default SessionList;
