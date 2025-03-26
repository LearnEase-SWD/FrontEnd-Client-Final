import { useState } from "react";
import ReactPlayer from "react-player";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdHelp,
  MdMovie,
  MdMenuBook,
} from "react-icons/md";

type Session = {
  _id: string;
  name: string;
  user_id: string;
  course_id: string;
  description: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
  position_order: number;
};
type Lesson = {
  _id: string;
  name: string;
  course_id: string;
  session_id: string;
  user_id: string;
  lesson_type: "video" | "text" | "quiz";
  description: string;
  video_url: string;
  image_url: string;
  full_time: number;
  position_order: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
};
type Props = {
  sessions: Session[];
  lessons: Lesson[];
};
const SessionResponsive: React.FC<Props> = ({ sessions, lessons }) => {
  const [openSession, setOpenSession] = useState<string | null>(null);
  const [openLesson, setOpenLesson] = useState<string | null>(null);

  const toggleSession = (sessionId: string) => {
    setOpenSession(openSession === sessionId ? null : sessionId);
  };

  const toggleLesson = (lessonId: string) => {
    setOpenLesson(openLesson === lessonId ? null : lessonId);
  };

  return (
    <div className="border-2 rounded-xl mt-4">
      {sessions
        .sort((a, b) => a.position_order - b.position_order)
        .map((session, index) => (
          <div
            key={session._id}
            className={`mt-8 mx-8 ${
              index !== sessions.length - 1 ? "border-b" : ""
            }`}
          >
            <div
              className="cursor-pointer font-semibold text-lg"
              onClick={() => toggleSession(session._id)}
            >
              <div>
                {openSession === session._id ? (
                  <div className="text-orange-500 flex justify-between items-center">
                    {session.name}
                    <MdOutlineKeyboardArrowUp size={24} />
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    {session.name}
                    <MdOutlineKeyboardArrowDown
                      className="text-gray-600"
                      size={24}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="pt-2 text-sm font-normal text-gray-500">
              <div>
                Session {session.position_order}
                <span className="px-2">•</span>
                {
                  lessons.filter((lesson) => lesson.session_id === session._id)
                    .length
                }{" "}
                lessons
                <span className="px-2">•</span>
                {(() => {
                  const totalMinutes = lessons
                    .filter((lesson) => lesson.session_id === session._id)
                    .reduce((total, lesson) => total + lesson.full_time, 0);
                  const hours = Math.floor(totalMinutes / 60);
                  const minutes = totalMinutes % 60;
                  return `${hours} hours ${minutes} minutes`;
                })()}
              </div>
            </div>
            {openSession === session._id && (
              <div className="my-2">
                <div className="mb-2">{session.description}</div>
                {lessons
                  .sort((a, b) => a.position_order - b.position_order)
                  .filter((lesson) => lesson.session_id === session._id)
                  .map((lesson) => (
                    <div key={lesson._id} className="mb-2 items-start">
                      <div
                        className="cursor-pointer flex"
                        onClick={() => toggleLesson(lesson._id)}
                      >
                        <div className="flex justify-between items-center">
                          {lesson.lesson_type === "video" ? (
                            <MdMovie className="text-orange-500" size={20} />
                          ) : lesson.lesson_type === "text" ? (
                            <MdMenuBook className="text-orange-500" size={20} />
                          ) : lesson.lesson_type === "quiz" ? (
                            <MdHelp className="text-orange-500" size={20} />
                          ) : null}
                          <div className="ml-2 flex items-center">
                            <span
                              className={
                                openLesson === lesson._id
                                  ? "text-orange-500"
                                  : ""
                              }
                            >
                              {lesson.name}
                            </span>
                            {openLesson === lesson._id ? (
                              <MdOutlineKeyboardArrowUp
                                className="ml-2 text-orange-500"
                                size={20}
                              />
                            ) : (
                              <MdOutlineKeyboardArrowDown
                                className="ml-2 text-gray-600"
                                size={20}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      {openLesson === lesson._id && (
                        <div className="text-gray-600 mt-2">
                          {lesson.description}
                          {lesson.lesson_type === "video" && (
                            <ReactPlayer
                              url={lesson.video_url}
                              width="100%"
                              className="rounded-lg"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
            <div className="pb-4 bg-white rounded-b-lg"></div>
          </div>
        ))}
    </div>
  );
};

export default SessionResponsive;
