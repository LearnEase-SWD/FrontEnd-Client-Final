import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "../models/Course.model";
import { Session } from "../models/Session.model";
import { Lesson } from "../models/Lesson.model";
import Navbar from "../components/Navbar";
import Skeleton from "../components/LearningPage/Skeleton";
import Sidebar from "../components/LearningPage/Sidebar";
import MainComponent from "../components/LearningPage/MainComponent";
import ClientService from "../services/client.service";
import { completeLesson } from "../services/user.service";

const LearnCoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id ? id.toString() : "";

  const [course, setCourse] = useState<Course | null>(null);
  const [session, setSession] = useState<Session[] | null>(null);
  const [buttonText, setButtonText] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountDown] = useState(5);
  const [sidebarWidth, setSidebarWidth] = useState("33%");
  const [sessionMenu, setSessionMenu] = useState(false);

  const navigate = useNavigate();
  const colors = [
    "text-red-500",
    "text-yellow-500",
    "text-green-500",
    "text-blue-500",
    "text-purple-500",
  ];
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountDown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, navigate, courseId]);

  const fetchData = async (courseId: string) => {
    setLoading(true);
    try {
      const response = await ClientService.getCourseDetails(courseId);
      setCourse(response.data as Course);
      setSession(
        (response.data as Course).session_list as unknown as Session[]
      );
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(courseId);
  }, [courseId]);

  const sessionIndex = sessionStorage.getItem("sessionIndex");

  const [expandedSessions, setExpandedSessions] = useState<{
    [key: number]: boolean;
  }>(sessionIndex ? { [parseInt(sessionIndex)]: true } : {});

  const toggleSession = (index: number) => {
    setExpandedSessions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  useEffect(() => {
    const lessonIndex = sessionStorage.getItem("lessonIndex");
    if (lessonIndex) {
      const lesson = JSON.parse(lessonIndex);
      setSelectedLesson({
        ...lesson,
        is_completed: lesson.is_completed || false,
      });
      setButtonText(
        lesson.is_completed ? "Go To Next Item" : "Mark as Completed"
      );
    }
  }, []);

  const selectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    if (sessionMenu) {
      console.log("toggleSessionMenu");
      toggleSessionMenu();
    }
    setButtonText(
      lesson.is_completed ? "Go To Next Item" : "Mark as Completed"
    );
  };

  const handleClick = async (lesson: Lesson) => {
    if (buttonText === "Go To Next Item") {
      const currentSessionIndex = session?.findIndex((s) =>
        s.lesson_list.some((l) => l._id === lesson._id)
      );
      const currentLessonIndex = session?.[
        currentSessionIndex!
      ].lesson_list.findIndex((l) => l._id === lesson._id);

      if (
        currentSessionIndex !== undefined &&
        currentLessonIndex !== undefined
      ) {
        // Check if it's the last lesson in the current session
        if (
          currentLessonIndex <
          session![currentSessionIndex].lesson_list.length - 1
        ) {
          // Select the next lesson in the current session
          selectLesson(
            session![currentSessionIndex].lesson_list[currentLessonIndex + 1]
          );
        } else if (currentSessionIndex < session!.length - 1) {
          // Select the first lesson of the next session
          toggleSession(currentSessionIndex);
          toggleSession(currentSessionIndex + 1);
          selectLesson(session![currentSessionIndex + 1].lesson_list[0]);
        } else {
          // Last lesson of the last session
          setButtonText("Completed");
        }
      }
    } else if (buttonText === "Mark as Completed") {
      try {
        const success = await completeLesson(lesson._id);
        if (success) {
          setButtonText("Go To Next Item");
          setSelectedLesson({
            ...lesson,
            is_completed: true,
          });
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          if (!user.completed_lesson) {
            user.completed_lesson = [];
          }
          user.completed_lesson.push(lesson._id);
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

  const toggleSessionMenu = () => {
    setSessionMenu(!sessionMenu);
  };

  if (!course || !session) {
    return <Skeleton />;
  }

  // if (course.is_purchased === false) {
  //   return (
  //     <div className="my-40">
  //       <div className="font-exo text-2xl font-bold pt-8 text-center">
  //         You don't own this course yet! Redirect to course purchase page in{" "}
  //         <span
  //           className={`transition-all duration-500 ${colors[countdown - 1]}`} // Apply color to the countdown number only
  //         >
  //           {countdown}
  //         </span>{" "}
  //         seconds.
  //       </div>
  //       <div className="font-exo text-center pt-4">
  //         If you are not redirected automatically,{" "}
  //         <button
  //           className="text-orange-500 underline px-2"
  //           onClick={() => navigate(`/course/${courseId}`)}
  //         >
  //           go to purchase
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="fixed top-0 left-0 z-50 bg-white w-full h-[100vh] no-select">
      <div className="h-[8vh]">
        <Navbar />
      </div>
      <div className="flex justify-between">
        <div className="lg:block hidden w-1/3" style={{ width: sidebarWidth }}>
          <Sidebar
            sidebarWidth="100%"
            sessions={session}
            expandedSessions={expandedSessions}
            selectedLesson={selectedLesson}
            toggleSession={toggleSession}
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
      <div className="lg:hidden fixed bottom-3 w-full text-center rounded-lg py-2">
        <div
          className="text-white bg-orange-500 mx-4 py-2 rounded-lg font-bold"
          onClick={() => toggleSessionMenu()}
        >
          Session Menu
        </div>
      </div>
      {sessionMenu && (
        <div className="lg:hidden absolute top-24 bg-white">
          <div
            className="flex items-center justify-end gap-2 px-5 text-orange-500 font-semibold"
            onClick={() => toggleSessionMenu()}
          >
            <div>Close</div>
            <svg
              aria-hidden="true"
              fill="none"
              focusable="false"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              id="cds-react-aria-204"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.585 14.353l-11.94-12 .71-.706 11.94 12-.71.706z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.344 2.353l-11.99 12-.708-.706 11.99-12 .708.706z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <Sidebar
            sidebarWidth="100%"
            sessions={session}
            expandedSessions={expandedSessions}
            selectedLesson={selectedLesson}
            toggleSession={toggleSession}
            selectLesson={selectLesson}
          />
        </div>
      )}
    </div>
  );
};

export default LearnCoursePage;
