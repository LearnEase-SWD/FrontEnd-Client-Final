import { Table, Tag, TableProps } from "antd";
import { LessonTypeEnum } from "../course/courseList";
import { GetLessons, Lesson } from "../../../../models/Lesson.model";
import { PageInfo } from "../../../../models/SearchInfo.model";
import { useEffect, useState } from "react";
import LessonService from "../../../../services/lesson.service";

type PendingLessonListProps = {
  session_id: string;
};

const PendingLessonList: React.FC<PendingLessonListProps> = ({
  session_id,
}) => {
  const [lessonPendingList, setLessonPendingList] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<PageInfo>({} as PageInfo);
  const [lessonSearchParam, setLessonSearchParam] = useState<GetLessons>({
    searchCondition: {
      keyword: "",
      course_id: "",
      session_id: session_id,
      is_position_order: false,
      is_deleted: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 5,
    },
  });

  const fetchDataLesson = async () => {
    const res = await LessonService.getLessons(lessonSearchParam);
    setLessonPendingList(res?.data?.pageData as Lesson[]);
    setCurrentLesson(res?.data?.pageInfo as PageInfo);
  };

  useEffect(() => {
    fetchDataLesson();
  }, [lessonSearchParam]);

  const columns: TableProps<Lesson>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Session Name",
      dataIndex: "session_name",
      key: "session_name",
    },
    {
      title: "Instructor",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Media",
      dataIndex: "video_url",
      key: "video_url",
      render: (video_url) => (
        <div className="h-full w-full md:w-[200px]">
          <video className="w-[200px] 2h-auto" controls>
            <source src={video_url} />
            Your browser does not support the video tag.
          </video>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "lesson_type",
      key: "lesson_type",
      render: (lesson_type: LessonTypeEnum) => (
        <Tag color="gray">{lesson_type}</Tag>
      ),
    },
    {
      title: "Time",
      dataIndex: "full_time",
      key: "full_time",
    },
  ];


  return (
    <div>
      <Table
        dataSource={lessonPendingList}
        columns={columns}
        pagination={{
          pageSize: currentLesson.pageSize,
          total: currentLesson.totalItems,
          current: currentLesson.pageNum,
          onChange: (pageNum, pageSize) => {
            setLessonSearchParam((prev) => ({
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
    </div>
  );
};

export default PendingLessonList;
