import { Table, TableProps, Tooltip, Button, Modal } from "antd";
import dayjs from "dayjs";
import { PageInfo } from "../../../../models/SearchInfo.model";
import { useEffect, useState } from "react";
import { GetSessions, Session } from "../../../../models/Session.model";
import SessionService from "../../../../services/session.service";

import { ellipsisText } from "../../../../utils/ellipsisText";
import { PendingLessonList } from "../../../../utils/LazyRouter";

type PendingSessionListProps = {
  course_id: string;
};
const PendingSessionList: React.FC<PendingSessionListProps> = ({
  course_id,
}) => {
  const [sessionPendingList, setSessionPendingList] = useState<Session[]>([]);
  const [currentSessionItem, setCurrentSessionItem] = useState<Session>(
    {} as Session
  );
  const [lessonVisible, setLessonVisible] = useState<boolean>(false);
  const [currentSession, setCurrentSession] = useState<PageInfo>(
    {} as PageInfo
  );
  const [sessionSearchParam, setSessionSearchParam] = useState<GetSessions>({
    searchCondition: {
      keyword: "",
      course_id: course_id,
      is_position_order: false,
      is_deleted: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 5,
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await SessionService.getSessions(sessionSearchParam);
      setSessionPendingList(res?.data?.pageData as Session[]);
      setCurrentSession(res?.data?.pageInfo as PageInfo);
    };
    fetchData();
  }, [sessionSearchParam, course_id]);

  const handleViewLesson = (record: Session) => {
    setCurrentSessionItem(record);
    setLessonVisible(true);
  };

  const columns: TableProps<Session>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      width: 400,
      render: (course_name: string) => {
        return (
          <Tooltip title={course_name}>{ellipsisText(course_name, 50)}</Tooltip>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (created_at) => {
        return <div>{dayjs(created_at).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Position Order",
      dataIndex: "position_order",
      key: "position_order",
      align: "center",
      render: (is_deleted) => {
        return <div className="text-red-600">{is_deleted}</div>;
      },
    },
    {
      title: "View Lesson",
      key: "full_time",
      render: (record: Session) => {
        return (
          <div>
            <Button color="primary" onClick={() => handleViewLesson(record)}>View</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        dataSource={sessionPendingList}
        columns={columns}
        pagination={{
          current: currentSession.pageNum,
          pageSize: currentSession.pageSize,
          total: currentSession.totalItems,
          onChange: (pageNum, pageSize) => {
            setSessionSearchParam((prev) => ({
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

      <Modal
        title="Lesson Detail"
        width={1000}
        open={lessonVisible}
        onCancel={() => setLessonVisible(false)}
        footer={null}
      >
        <PendingLessonList session_id={currentSessionItem?._id} />
      </Modal>
    </div>
  );
};

export default PendingSessionList;
