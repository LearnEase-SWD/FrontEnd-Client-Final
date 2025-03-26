import { Select, Tag } from "antd";
import { CoursePriceType, PayoutStatusEnum } from "../pages/AdminDashboard/monitors/course/courseList";
import { CourseStatusEnum } from "../models/Course.model";

const courseStatusColors = {
  [CourseStatusEnum.NEW]: "green",
  [CourseStatusEnum.WAITING_APPROVE]: "orange",
  [CourseStatusEnum.APPROVE]: "blue",
  [CourseStatusEnum.REJECT]: "red",
  [CourseStatusEnum.ACTIVE]: "purple",
  [CourseStatusEnum.INACTIVE]: "gray",
};

const coursePriceTypeColors = {
  [CoursePriceType.FREE]: "green",
  [CoursePriceType.PAID]: "gold",
};

const payoutStatusColors = {
  [PayoutStatusEnum.new]: "green",
  [PayoutStatusEnum.request_payout]: "orange",
  [PayoutStatusEnum.completed]: "blue",
  [PayoutStatusEnum.rejected]: "red",
};

const StatusFilter = ({
  statuses,
  selectedStatus,
  onStatusChange,
}: {
  statuses: string[];
  selectedStatus: string | undefined;
  onStatusChange: (value: string | undefined) => void;
}) => {
  const getStatusColor = (status: string) => {
    return (
      courseStatusColors[status as CourseStatusEnum] ||
      coursePriceTypeColors[status as CoursePriceType] ||
      payoutStatusColors[status as PayoutStatusEnum] ||
      "gray" 
    );
  };

  return (
    <Select
      placeholder="Filter By Status"
      className="w-full md:w-1/4 ml-0 md:ml-3 mb-2 md:mb-0"
      value={selectedStatus}
      onChange={onStatusChange}
      allowClear
    >
      {statuses.map((status) => (
        <Select.Option key={status} value={status}>
          <Tag color={getStatusColor(status)}>
            {status}
          </Tag>
        </Select.Option>
      ))}
    </Select>
  );
};

export default StatusFilter;
