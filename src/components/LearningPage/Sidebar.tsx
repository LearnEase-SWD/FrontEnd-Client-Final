import React from "react";
import { Session } from "../../models/Session.model";
import { Lesson } from "../../models/Lesson.model";
import {
  MdOutlineImage,
  MdOutlinePlayCircle,
  MdOutlineTaskAlt,
} from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";

interface SidebarProps {
  sidebarWidth: string;
  sessions: Session[] | null;
  expandedSessions: { [key: number]: boolean };
  selectedLesson: Lesson | null;
  toggleSession: (index: number) => void;
  selectLesson: (lesson: Lesson) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarWidth,
  sessions,
  expandedSessions,
  selectedLesson,
  toggleSession,
  selectLesson,
}) => {
  return (
    <div
      className="p-4 h-[92vh] overflow-y-scroll custom-scrollbar max-w-full lg:max-w-1/2"
      style={{ width: sidebarWidth, minWidth: "20%" }}
    >
      {sessions?.map((sessionItem, sessionIndex) => (
        <div key={sessionIndex} className="mb-4">
          <div className="group cursor-pointer rounded border border-white hover:border-orange-500 ">
            <h3
              className={`hover:group text-lg font-semibold p-2 border-transition ${
                expandedSessions[sessionIndex]
                  ? "border-b-orange-500 border-orange-500"
                  : "border-b-orange-500 border-transparent"
              }group-hover:border-orange-500 group-hover:bg-orange-200`}
              onClick={() => toggleSession(sessionIndex)}
            >
              {sessionItem.name}
            </h3>
            <div
              className={`lesson-list transition-max-height duration-500 ease-in-out overflow-hidden ${
                expandedSessions[sessionIndex] ? "max-h-96" : "max-h-0"
              }`}
            >
              {sessionItem.lesson_list &&
                sessionItem.lesson_list.map((lessonItem) => (
                  <div
                    key={lessonItem._id}
                    onClick={() => selectLesson(lessonItem)}
                    className={`pl-2 py-2 rounded cursor-pointer ${
                      selectedLesson && selectedLesson._id === lessonItem._id
                        ? "bg-orange-500 text-white"
                        : ""
                    }`}
                  >
                    <div>
                      <div className="flex gap-2">
                        <div className="w-1/10"> 
                          {lessonItem.is_completed ? (
                            <MdOutlineTaskAlt className="w-6 h-6 text-green-500" />
                          ) : (
                            <div>
                              {lessonItem.lesson_type === "video" && (
                                <MdOutlinePlayCircle className="w-6 h-6" />
                              )}
                              {lessonItem.lesson_type === "reading" && (
                                <FiBookOpen className="w-6 h-6" />
                              )}
                              {lessonItem.lesson_type === "image" && (
                                <MdOutlineImage className="w-6 h-6" />
                              )}
                            </div>
                          )}
                        </div>
                        <div className="font-semibold">{lessonItem.name}</div>
                      </div>
                      <span className="text-sm">
                        {lessonItem.lesson_type.charAt(0).toUpperCase() +
                          lessonItem.lesson_type.slice(1)}
                        <span className="px-2">•</span>
                        {lessonItem.full_time} min
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
