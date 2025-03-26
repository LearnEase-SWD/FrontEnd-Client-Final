import { useState } from "react";
import { Lesson } from "../../../AdminDashboard/monitors/course/courseList";
import { Button, Divider } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

type LessonItemType = {
  index: number;
  item: Lesson;
};

const LessonItem = (props: LessonItemType) => {
  const { index, item } = props;
  const [viewMore, setViewMore] = useState(false);

  return (
    <div className="px-5">
      <div className="bg-white shadow-md mb-4 mt-2 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">
            Lesson {index}: {item.name}
          </span>
          {/* description */}
          {viewMore ? (
            <Button
              icon={<UpOutlined />}
              onClick={() => setViewMore(false)}
              className="flex items-center !border-none"
            />
          ) : (
            <Button
              icon={<DownOutlined />}
              onClick={() => setViewMore(true)}
              className="flex items-center !border-none"
            />
          )}
        </div>

        {viewMore && (
          <div className="mt-4">
            <Divider />
            <p className="text-gray-600">
              <span className="font-semibold">Description:</span>{" "}
              {item.description}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Time:</span> {item.full_time}{" "}
              minutes
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Instructor:</span> {item.user_id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonItem;
