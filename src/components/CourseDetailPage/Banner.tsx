import { FaPlay } from "react-icons/fa";
import { useCustomNavigate } from "../../hooks/customNavigate";
import { Course } from "../../models/Course.model";
import { CourseSummary } from "./CourseSummary";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  hideLoadingOverlay,
  showLoadingOverlay,
} from "../../utils/loadingOverlay";

type Props = {
  course: Course;
  isPurchased: boolean;
  id: string;
  completed_lesson: string[];
};

export const Banner = ({
  id,
  course,
  isPurchased,
  completed_lesson,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  // const totalLessons = course.session_list.reduce((sum, session) => {
  //   return sum + session.lesson_list.length;
  // }, 0);
  const { currentUser } = useSelector((state: RootState) => state.auth.login);

  // const completedLessonCount = course.session_list.reduce((sum, session) => {
  //   return (
  //     sum +
  //     session.lesson_list.filter((lesson) =>
  //       completed_lesson.includes(lesson._id)
  //     ).length
  //   );
  // }, 0);
  // const progressPercentage = (completedLessonCount / totalLessons) * 100;

  const navigate = useCustomNavigate();

  const handleAdd = async (
    userRole: string,
    course: Course,
    navigate: (path: string) => void
  ) => {
    try {
      showLoadingOverlay();
      await dispatch(addToCart({ course, userRole, navigate }));
      navigate("/cart/new");
    } finally {
      hideLoadingOverlay();
    }
  };

  const handleLearn = (course: Course) => {
    console.log(course.session_list[0].lesson_list[0]);
    sessionStorage.setItem("sessionIndex", "0");
    sessionStorage.setItem(
      "lessonIndex",
      JSON.stringify(course.session_list[0].lesson_list[0])
    );
    navigate(`/learn/${id}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePreview = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="font-exo flex flex-col bg-orange-50 px-20 lg:-mx-40 -mx-24 pb-10">
      <div className="flex gap-8 pt-10">
        <div className="lg:w-2/3 w-full flex flex-col gap-4 items-start">
          <div className="lg:hidden relative w-full aspect-w-16 aspect-h-9 ">
            <img
              src={course.image_url}
              alt="Logo"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-2 left-2 bg-orange-500 text-white font-bold px-4 py-2 rounded-lg">
              {course.name}
            </div>
          </div>
          <div className="hidden lg:block bg-orange-500 text-white font-bold px-4 py-2 rounded-lg">
            {course.name}
          </div>
          <div className="font-jost text-5xl font-bold text-gradient">
            {course.title}
          </div>
          <div className="text-lg">{course.description}</div>
          {/* <div className="text-lg cursor-pointer">
            Instructor:{" "}
            <span
              className="px-2 underline"
              onClick={() => navigate(`/profile/${course.instructor_id}`)}
            >
              {course.instructor_name}
            </span>
          </div> */}
          {isPurchased ? (
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <div
                className="bg-orange-500 text-white text-2xl font-semibold px-8 py-4 rounded cursor-pointer text-center"
                onClick={() => handleLearn(course)}
              >
                Learn Now
              </div>
              <div className="flex-grow">
                <div className="font-light">Already enrolled</div>
                <div className="flex justify-between items-baseline">
                  <div>Your Progress </div>
                  {/* <div className="mt-2 text-sm">
                    {completedLessonCount} of {totalLessons} lessons completed (
                    {progressPercentage.toFixed(0)}%)
                  </div> */}
                </div>
                <div className="bg-gray-200 h-3 w-full rounded">
                  {/* <div
                    className="bg-orange-400 h-3 rounded"
                    style={{ width: `${progressPercentage}%` }}
                  ></div> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex">
              {/* {currentUser._id === course.instructor_id ? (
                <div
                  className="bg-orange-500 text-white text-2xl font-semibold px-8 py-4 rounded cursor-pointer"
                  onClick={() => navigate("/dashboard/instructor/my-courses")}
                >
                  Edit This Course
                </div>
              ) : ( */}
              <div
                className="bg-orange-500 text-white text-2xl font-semibold px-8 py-4 rounded cursor-pointer"
                onClick={() => {
                  if (currentUser?.role) {
                    if (course.is_in_cart) {
                      navigate(`/cart/new`)
                    } else {
                      handleAdd(currentUser.role, course, navigate)
                    }
                  } else {
                    navigate("/login")
                  }
                }
                }
              >
                {course.is_in_cart ? "View in Cart" : "Buy Now"}
              </div>
              {/* )} */}
              <div className="flex flex-col items-start justify-center ml-4">
                {course.discount && course.discount > 0 ? (
                  <>
                    <div className="text-xl line-through text-gray-500">
                      {course.price.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="text-2xl font-bold text-orange-500">
                      {course.price_paid.toLocaleString("vi-VN")}đ
                    </div>
                  </>
                ) : (
                  <div className="text-2xl font-bold text-orange-500">
                    {course.price.toLocaleString("vi-VN")}đ
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
        <div className="hidden lg:w-1/3 lg:block relative">
          <div className="absolute inset-0" onClick={() => handlePreview()}>
            <img
              src={course.image_url}
              alt={course.title}
              className="rounded-lg w-full h-full object-cover"
            />

            <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-full bg-white">
              <FaPlay className="h-6 w-6" />
            </div>
            <div className="absolute z-10 bottom-2 left-1/2 transform -translate-x-1/2 text-white font-bold px-4 py-2 rounded-lg">
              Preview this course
            </div>
            <div className="custom-bottom-gradient z-0 absolute bottom-0 inset-0"></div>
          </div>
          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 overflow-auto"
              onClick={handleModalClick}
            >
              <div className="bg-white p-4 rounded-lg relative flex items-center justify-center">
                <video
                  controls
                  className="max-w-[80vw] max-h-[80vh] object-contain"
                >
                  <source src={course.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="relative flex justify-center">
        <CourseSummary
          time={course.full_time}
          student={course.enrolled}
          level={course.level}
          lessons={totalLessons}
          quizzes={0}
        />
      </div> */}
    </div>
  );
};
