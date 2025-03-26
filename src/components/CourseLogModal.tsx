import React, { useEffect, useState } from "react";
import {
  CourseLog,
  CourseStatusEnum,
  GetCourseLogs,
} from "../models/Course.model";
import CourseService from "../services/course.service";
import { Card, Table, Tag } from "antd";
import { PageInfo } from "../models/SearchInfo.model";
import dayjs from "dayjs";

type CourseModalProps = {
  course_id: string;
};
const columns = [
  {
    title: "Course Name",
    dataIndex: "course_name",
    key: "course_name",
  },
  {
    title: "Old Status",
    dataIndex: "old_status",
    key: "old_status",
    render: (old_status: CourseStatusEnum) => (
      <Tag
        color={
          old_status === CourseStatusEnum.ACTIVE
            ? "green"
            : old_status === CourseStatusEnum.APPROVE
            ? "blue"
            : old_status === CourseStatusEnum.REJECT
            ? "red"
            : "orange"
        }
      >
        {old_status}
      </Tag>
    ),
  },
  {
    title: "New Status",
    dataIndex: "new_status",
    key: "new_status",
    render: (new_status: CourseStatusEnum) => (
      <Tag
        color={
          new_status === CourseStatusEnum.ACTIVE
            ? "green"
            : new_status === CourseStatusEnum.APPROVE
            ? "blue"
            : new_status === CourseStatusEnum.REJECT
            ? "red"
            : "orange"
        }
      >
        {new_status}
      </Tag>
    ),
  },
  {
    title: "Create at",
    dataIndex: "created_at",
    key: "created_at",
    render: (created_at :string) => {
      return <div>{dayjs(created_at).format("DD/MM/YYYY HH:mm")}</div>;
    },
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
  },
];

const CourseLogModal: React.FC<CourseModalProps> = ({ course_id }) => {
  const [courseLogList, setCourseLogList] = useState<CourseLog[]>([]);
  const [currentCourseLog, setCurrentCourseLog] = useState<PageInfo>(
    {} as PageInfo
  );
  const [courseLogSearchParam, setCourseLogSearchParam] =
    useState<GetCourseLogs>({
      searchCondition: {
        course_id: course_id,
        keyword: "",
        old_status: "",
        new_status: "",
        is_deleted: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
      },
    });

  useEffect(() => {
    const fetchData = async () => {
      const res = await CourseService.getCourseLogs(courseLogSearchParam);
      setCourseLogList(res.data?.pageData as CourseLog[]);
      setCurrentCourseLog(res.data?.pageInfo as PageInfo);
    };
    fetchData();
  }, [courseLogSearchParam,course_id]);

  return (
    <div>
      <Card>
        <h3 className="text-2xl my-5">Course Log</h3>
        <Table
          dataSource={courseLogList}
          columns={columns}
          pagination={{
            current: currentCourseLog.pageNum,
            pageSize: currentCourseLog.pageSize,
            total: currentCourseLog.totalItems,
            onChange: (pageNum, pageSize) => {
              setCourseLogSearchParam((prev) => ({
                ...prev,
                pageInfo: { pageNum, pageSize },
              }));
            },
          }}
          rowKey={(record) => record._id}
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default CourseLogModal;
