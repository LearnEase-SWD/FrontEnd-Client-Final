import { useState } from "react";
import { Course } from "../../models/Course.model";
import { Session } from "../../models/Session.model";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { Reviews } from "./Detail/Review";
import { Lesson, LessonType } from "../../models/Lesson.model";
import { useCustomNavigate } from "../../hooks/customNavigate";

type Props = {
  isEnrolled: boolean;
  course?: Course;
};

export const Detail = ({ course }: Props) => {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);

  const navigate = useCustomNavigate();


  const toggleLesson = (index: number) => {
    setExpandedLesson(expandedLesson === index ? null : index);
  };

  const handleGoToLesson = (lesson: Lesson) => {
    sessionStorage.setItem("lessonIndex", JSON.stringify(lesson));
    navigate("/learn/" + course?.courseID);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    course && (
      <div className="font-exo flex mt-12">
        <div className="lg:w-2/3 w-full">
          <div className="flex flex-col">
            {/* <div className="text-xl font-bold pb-2 pt-4">Overview</div>
            <div
              className={showMore ? "" : "max-h-40 overflow-hidden"}
              dangerouslySetInnerHTML={{ __html: course.content }}
            />
            <button
              onClick={toggleShowMore}
              className="text-left text-orange-500 hover:underline"
            >
              {showMore ? "Show Less" : "Show More"}
            </button> */}
            {/* {course.tag.length > 0 && (
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
            )} */}
          </div>
          <div>
            <div className="text-xl font-bold pb-2 pt-4">Curriculum</div>
            <div className="border-2 rounded-lg px-4">
              {Array.isArray(course.lessons) &&
                course.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="py-4 border-b-2 border-neutral-200">
                    <div
                      className="flex justify-between text-lg cursor-pointer font-bold hover:bg-orange-100 px-4 py-2 rounded"
                      onClick={() => toggleLesson(lessonIndex)}
                    >
                      {lesson.title}
                    </div>
                    <div
                      className={`transition-all duration-300 ease-out overflow-hidden ${expandedLesson === lessonIndex ? "max-h-[500px]" : "max-h-0"
                        }`}
                    >
                      <div className="lg:px-4 pt-2 h-full">
                        <div className="text-sm pt-2">{lesson.description}</div>
                        <div className="mt-2 text-sm">
                          {LessonType[lesson.lessonType]}
                          {/* <span className="px-2">•</span>
                          {lesson.full_time} minutes */}
                        </div>
                        {course.is_purchased && (
                          <div
                            className="mt-2 text-orange-500 underline cursor-pointer"
                            onClick={() => handleGoToLesson(lesson)}
                          >
                            Go to learn
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div>
              <div className="text-xl font-bold pb-2 pt-4">Comment</div>
              <Reviews label={false} courseId={course.courseID} />
            </div>
          </div>
        </div>
        <div className="lg:w-1/3"></div>
      </div>
    )
  );
};
