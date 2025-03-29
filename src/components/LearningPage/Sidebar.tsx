import React, { useEffect } from "react";
import { Session } from "../../models/Session.model";
import { Lesson, LessonType } from "../../models/Lesson.model";
import {
  MdOutlineImage,
  MdOutlinePlayCircle,
  MdOutlineTaskAlt,
} from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";

interface SidebarProps {
  sidebarWidth: string;
  lessons: Lesson[];
  
  selectedLesson: Lesson | null
  selectLesson: (lesson: Lesson) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarWidth,
  lessons,
  selectedLesson,
  selectLesson,

}) => {
  useEffect(() => {
    const storedLesson = sessionStorage.getItem("lessonIndex");
    if (storedLesson) {
      selectLesson(JSON.parse(storedLesson));
      console.log("Lessons  ", storedLesson);
    }
  }, []);
  console.log("Lessons in Sidebar: ", lessons);

  return (
    <div
      className="p-4 h-[92vh] overflow-y-scroll custom-scrollbar max-w-full lg:max-w-1/2"
      style={{ width: sidebarWidth, minWidth: "20%" }}
    >
      {lessons.map((lessonItem) => (
        <div
          key={lessonItem.lessonID}
          onClick={() => selectLesson(lessonItem)}
          className={`p-2 rounded cursor-pointer border border-transparent hover:border-orange-500 ${selectedLesson && selectedLesson.lessonID === lessonItem.lessonID
              ? "bg-orange-500 text-white"
              : ""
            }`}
        >
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6">
              {lessonItem.is_completed ? (
                <MdOutlineTaskAlt className="text-green-500" />
              ) : lessonItem.lessonType === 0 ? (
                <MdOutlinePlayCircle />
              ) : lessonItem.lessonType === 1 ? (
                <FiBookOpen />
              ) : lessonItem.lessonType === 2 ? (
                <MdOutlineImage />
              ) : null}
            </div>
            <div className="font-semibold">{lessonItem.title}</div>
          </div>
          <span className="text-sm">{LessonType[lessonItem.lessonType]}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
