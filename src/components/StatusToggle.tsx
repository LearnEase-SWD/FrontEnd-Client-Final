import { CourseStatusEnum } from "../models/Course.model";
import { Switch } from "antd";

export const CourseStatusToggle: React.FC<{
  status: string;
  disabled: boolean;
  onToggle: (newStatus: string) => Promise<void>;
}> = ({ status, disabled, onToggle }) => {
  const isActive = status === CourseStatusEnum.ACTIVE;

  const handleToggle = async () => {
    const newStatus = isActive ? CourseStatusEnum.ACTIVE : CourseStatusEnum.INACTIVE;
    await onToggle(newStatus);
  };

  return (
    <Switch
      checked={isActive}
      onChange={handleToggle}
      disabled={disabled}
      checkedChildren="Active"
      unCheckedChildren="Inactive"
    />
  );
};
