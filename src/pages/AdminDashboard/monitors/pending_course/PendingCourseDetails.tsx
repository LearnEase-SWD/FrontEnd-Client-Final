import React from "react";
import { Course } from "../../../../models/Course.model";
import { PendingSessionList } from "../../../../utils/LazyRouter";

type PendingCourseDetailProps = {
  course_item: Course;
};

const PendingCourseDetails: React.FC<PendingCourseDetailProps> = ({
  course_item,
}) => {
  return (
    <div className="p-6">
      {/* Display Video and Image */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-6">
        {/* Image Section */}
        <div className="">
          <h3 className="font-bold text-xl mb-4 ">Image</h3>
          <img
            className="w-[400px] h-[270px] "
            src={course_item.image_url}
            alt={course_item.name}
          />
        </div>
        {/* Video Section */}
        <div className="">
          <h3 className="font-bold text-xl mb-4 ">Video</h3>
          <video
            className="w-[500px]"
            controls
          >
            <source src={course_item.video_url} />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      {/* Session List */}
      <div>
        <h3 className="text-2xl mb-4 font-bold">Session List</h3>
        <PendingSessionList course_id={course_item?._id} />
      </div>
    </div>
  );
};

export default PendingCourseDetails;
