import { useState } from "react";
import { MdLibraryBooks } from "react-icons/md";

interface Lesson {
  name: string;
  course_id: string;
  session_id: string;
  lesson_type: "video" | "article" | "quiz";
  description: string;
  video_url: string;
  image_url: string;
  full_time: number;
  position_order: number;
}

interface SessionProps {
  items: Lesson[];
}

export const Session = ({ items }: SessionProps) => {
  const [open, setOpen] = useState<string | null>(null);

  const togglePanel = (id: string) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className="rounded-b-lg">
      {items.map((lesson) => (
        <div key={lesson.session_id}>
          <div
            className="flex gap-2 items-center cursor-pointer py-4 px-10 bg-white hover:text-orange-500"
            onClick={() => togglePanel(lesson.session_id)}
          >
            <MdLibraryBooks />
            {lesson.name}
          </div>
          {open === lesson.session_id && (
            <div className="p-4 bg-white">
              <p>{lesson.description}</p>
              <p>Type: {lesson.lesson_type}</p>
              <p>Duration: {lesson.full_time} minutes</p>
              {lesson.video_url && (
                <a
                  href={lesson.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Video
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
