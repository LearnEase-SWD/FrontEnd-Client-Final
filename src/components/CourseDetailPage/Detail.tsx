import { useState } from "react";
import { Course } from "../../models/Course.model";
import { Session } from "../../models/Session.model";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { Reviews } from "./Detail/Review";
import { Lesson } from "../../models/Lesson.model";
import { useCustomNavigate } from "../../hooks/customNavigate";

type Props = {
  isEnrolled: boolean;
  course?: Course;
  session?: Session;
};

export const Detail = ({ course, session }: Props) => {
  const [expandedSession, setExpandedSession] = useState<number | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);

  const navigate = useCustomNavigate();

  const toggleSession = (index: number) => {
    setExpandedSession(expandedSession === index ? null : index);
  };

  const toggleLesson = (index: number) => {
    setExpandedLesson(expandedLesson === index ? null : index);
  };

  const handleGoToLesson = (sessionIndex: number, lesson: Lesson) => {
    sessionStorage.setItem("sessionIndex", sessionIndex.toString());
    sessionStorage.setItem("lessonIndex", JSON.stringify(lesson));
    navigate("/learn/" + course?._id);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    course && (
      <div className="font-exo flex mt-12">
        <div className="lg:w-2/3 w-full">
          <div className="flex flex-col">
            <div className="text-xl font-bold pb-2 pt-4">Overview</div>
            <div
              className={showMore ? "" : "max-h-40 overflow-hidden"}
              dangerouslySetInnerHTML={{ __html: course.content }}
            />
            <button
              onClick={toggleShowMore}
              className="text-left text-orange-500 hover:underline"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
            {course.tag.length > 0 && (
              <div>
                <div className="text-xl font-bold pb-2 pt-4">Tags</div>
                <div className="flex flex-wrap gap-2 text-sm">
                  {course.tag.map((tag, index) => (
                    <div
                      key={index}
                      className=" bg-orange-200 text-neutral-800 px-2 py-1 rounded"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="text-xl font-bold pb-2 pt-4">Curriculum</div>
            <div className="border-2 rounded-lg px-4">
              {Array.isArray(session) &&
                session.map((session, sessionIndex) => (
                  <div className={`py-4 border-b-2 border-neutral-200`}>
                    <div
                      className="flex flex-col hover:bg-orange-100 px-4 py-2 rounded cursor-pointer"
                      onClick={() => toggleSession(sessionIndex)}
                    >
                      {expandedSession === sessionIndex ? (
                        <div className="flex justify-between text-orange-500 text-lg cursor-pointer font-bold hover:text-orange-600">
                          {session.name}
                          <MdOutlineKeyboardArrowUp size={24} />
                        </div>
                      ) : (
                        <div
                          className="flex justify-between text-lg cursor-pointer font-bold"
                          onClick={() => toggleSession(sessionIndex)}
                        >
                          {session.name}
                          <MdOutlineKeyboardArrowDown
                            className="text-gray-600"
                            size={24}
                          />
                        </div>
                      )}
                      <div className="flex text-sm font-light">
                        <div className="">Session {session.position_order}</div>
                        <span className="px-2">•</span>
                        <div>{session.lesson_list.length} lessons</div>
                        <span className="px-2">•</span>
                        <div>{Math.round(session.full_time / 60)} hours</div>
                      </div>
                    </div>
                    <div
                      className={`transition-all duration-300 ease-out overflow-hidden ${
                        expandedSession === sessionIndex
                          ? "max-h-[500px]"
                          : "max-h-0"
                      }`}
                    >
                      <div className="lg:px-4 pt-2 h-full">
                        <div
                          className="text-sm pt-2"
                          dangerouslySetInnerHTML={{
                            __html: session.description,
                          }}
                        />
                        {session.tag.length > 0 && (
                          <div>
                            <div className="flex justify-between cursor-pointer font-semibold my-2">
                              Tags
                            </div>
                            <div className="flex text-xs flex-wrap gap-2">
                              {session.tag.map((tag: string, index: number) => (
                                <div
                                  key={index}
                                  className=" bg-orange-200 text-neutral-800 px-2 py-1 rounded"
                                >
                                  {tag}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div
                          className="mt-2 cursor-pointer text-orange-500 hover:underline"
                          onClick={() => toggleLesson(sessionIndex)}
                        >
                          {expandedLesson === sessionIndex
                            ? "Hide info about session content"
                            : "Show info about session content"}
                        </div>
                        {expandedLesson === sessionIndex && (
                          <div className="flex flex-col">
                            {session.lesson_list.map(
                              (lesson: Lesson, lessonIndex: number) => (
                                <div
                                  key={lessonIndex}
                                  className="flex py-2 group"
                                >
                                  <div className="w-4/5">
                                    {course.is_purchased && (
                                      <div>
                                        <div>{lesson.name}</div>
                                        <div>
                                          {lesson.lesson_type
                                            .charAt(0)
                                            .toUpperCase() +
                                            lesson.lesson_type.slice(1)}
                                          <span className="px-2">•</span>
                                          {lesson.full_time} minutes
                                        </div>
                                      </div>
                                    )}
                                    {!course.is_purchased && (
                                      <div>
                                        {lesson.name}
                                        <span className="px-2">•</span>
                                        {lesson.full_time} minutes
                                      </div>
                                    )}
                                  </div>
                                  {course.is_purchased && (
                                    <div
                                      className={`w-1/5 text-orange-500 underline cursor-pointer lg:hidden group-hover:block`}
                                      onClick={() =>
                                        handleGoToLesson(sessionIndex, lesson)
                                      }
                                    >
                                      Go to learn
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div>
              <div className="text-xl font-bold pb-2 pt-4">Comment</div>
              <Reviews label={false} courseId={course._id} />
            </div>
          </div>
        </div>
        <div className="lg:w-1/3"></div>
      </div>
    )
  );
};
