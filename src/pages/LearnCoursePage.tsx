import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "../models/Course.model";
import { Lesson } from "../models/Lesson.model";
import Navbar from "../components/Navbar";
import Skeleton from "../components/LearningPage/Skeleton";
import Sidebar from "../components/LearningPage/Sidebar";
import MainComponent from "../components/LearningPage/MainComponent";
import ClientService from "../services/client.service";
import { completeLesson } from "../services/user.service";
import LessonService from "../services/lesson.service";

const LearnCoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id ? id.toString() : "";


  const [buttonText, setButtonText] = useState("Mark as Completed");
  const [loading, setLoading] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("33%");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await LessonService.getLessonByCourseId(courseId);
        setLessons(response?.data ?? []);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (lessons.length) {
      setSelectedLesson(lessons[0]);
    }
  }, [lessons]);

  const selectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    console.log("Lesson:", lesson)
    setButtonText(lesson.is_completed ? "Go To Next Item" : "Mark as Completed");
  };

  const handleClick = async () => {
    if (!selectedLesson || !lessons) return;

    if (buttonText === "Go To Next Item") {
      const currentLessonIndex = lessons.findIndex((l) => l.lessonID === selectedLesson.lessonID);

      if (currentLessonIndex !== -1 && currentLessonIndex < lessons.length - 1) {
        selectLesson(lessons[currentLessonIndex + 1]);
      } else {
        setButtonText("Completed");
      }
    } else if (buttonText === "Mark as Completed") {
      try {
        const success = await completeLesson(selectedLesson.lessonID);
        if (success) {
          setButtonText("Go To Next Item");
          setSelectedLesson({ ...selectedLesson, is_completed: true });

          // Lưu tiến trình học vào localStorage
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          user.completed_lesson = user.completed_lesson || [];
          user.completed_lesson.push(selectedLesson.lessonID);
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (error) {
        console.error("Error completing lesson:", error);
      }
    }
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth >= 15 && newWidth <= 40) {
      setSidebarWidth(`${newWidth}%`);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  if (!lessons) {
    return <Skeleton />;
  }

  return (
    <div className="fixed top-0 left-0 z-50 bg-white w-full h-[100vh] no-select">
      <div className="h-[8vh]">
        <Navbar />
      </div>
      <div className="flex justify-between">
        <div className="lg:block hidden" style={{ width: sidebarWidth }}>
          <Sidebar
            sidebarWidth="100%"
            lessons={lessons}
            selectedLesson={selectedLesson}
            selectLesson={selectLesson}
          />
        </div>
        <div
          className="lg:flex hidden group h-[92vh] items-center justify-center w-2 bg-orange-100"
          onMouseDown={handleMouseDown}
        >
          <div className="group-hover:block hidden w-[1px] bg-orange-500 h-[85vh]"></div>
        </div>
        <MainComponent
          remainingWidth={`calc(${100 - parseInt(sidebarWidth)}% - 2px)`}
          selectedLesson={selectedLesson}
          handleClick={handleClick}
          loading={loading}
          buttonText={buttonText}
        />
      </div>
    </div>
  );
};

export default LearnCoursePage;
