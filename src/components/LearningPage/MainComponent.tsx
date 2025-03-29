import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Lesson, LessonType } from "../../models/Lesson.model";
import LessonService from "../../services/lesson.service";

interface MainContentProps {
  remainingWidth: string;
  selectedLesson: Lesson | null;
  handleClick: (lesson: Lesson) => void;
  loading: boolean;
  buttonText: string;
  lessons: Lesson[];
}

const MainContent: React.FC<MainContentProps> = ({
  remainingWidth,
  selectedLesson,
  handleClick,
  loading,
  buttonText,
  lessons
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [selectedLesson]);
  console.log("check:", selectedLesson);


  return (
    <div
      ref={scrollRef}
      className="flex-grow lg:h-[92vh] h-[86vh] overflow-y-scroll"
      style={{ width: remainingWidth }}
    >
      {selectedLesson && (
        <div className="mt-4 p-4 rounded">
          <h2 className="text-2xl font-bold">{selectedLesson.title}</h2>
          <div className="pt-2 rounded">
            {selectedLesson?.lessonType === LessonType.Video && selectedLesson?.videoLessons?.length ? (
              <div className="w-full max-h-[70vh]">
                <ReactPlayer url={selectedLesson.videoLessons[0].videoURL} controls />
              </div>
            ) : selectedLesson?.lessonType === LessonType.Video ? (
              <p className="text-red-500">No video available</p>
            ) : selectedLesson?.lessonType === LessonType.Theory ? (
              <div className="w-full">
                <div>
                  <h3 className="text-xl ">
                    {selectedLesson?.theoryLessons[0].content || "No theory available"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {selectedLesson?.theoryLessons[0].examples || "No description available"}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="w-full"
                dangerouslySetInnerHTML={{
                  __html: selectedLesson?.description || "<p>No content available</p>",
                }}
              />
            )}


          </div>
          <div className="flex items-baseline gap-4">
            <button
              onClick={() => handleClick(selectedLesson)}
              className="mt-4 px-4 py-2 font-bold bg-orange-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : buttonText}
            </button>
            {selectedLesson.is_completed && (
              <div className="text-orange-500 font-bold text-lg">
                ✔ Completed
              </div>
            )}
          </div>
        </div>
      )}

    </div>

  );
};

export default MainContent;
