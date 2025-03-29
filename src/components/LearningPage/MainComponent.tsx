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
}

const MainContent: React.FC<MainContentProps> = ({
  remainingWidth,
  selectedLesson,
  handleClick,
  loading,
  buttonText,
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
          <h2 className="text-xl font-bold">{selectedLesson.title}</h2>
          <div className="pt-2 rounded">
            {selectedLesson?.lessonType === LessonType.Video && Array.isArray(selectedLesson.videoLesson) && selectedLesson.videoLesson.length > 0 ? (
              <div className="w-full max-h-[70vh]">
                <ReactPlayer url={selectedLesson.videoLesson[0].videoURL} controls />

              </div>
            ) : selectedLesson?.lessonType === LessonType.Theory ? (
              <div className="w-full">
                <div><img src={selectedLesson?.image_url} alt="Image" /></div>
              </div>
            ) : (
              <div
                className="w-full"
                dangerouslySetInnerHTML={{
                  __html: selectedLesson?.description || "",
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
