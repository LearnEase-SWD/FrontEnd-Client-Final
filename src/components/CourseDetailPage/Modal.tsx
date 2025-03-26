import { useEffect, useState } from "react";
import { Course } from "../../models/Course.model";
import { handleAddCart } from "../../utils/handleAddCart";
import { useCustomNavigate } from "../../hooks/customNavigate";

type Props = {
  course: Course;
  isPurchased: boolean;
};

export const DetailModal = ({ course, isPurchased }: Props) => {
  const [animateClass, setAnimateClass] = useState("");
  const [showCourseInfo, setShowCourseInfo] = useState(false);
  const navigate = useCustomNavigate();

  const currentUser = localStorage.getItem("user");

  const handleAdd = async (
    userRole: string,
    course: Course,
    navigate: ReturnType<typeof useCustomNavigate>
  ) => {
    await handleAddCart(userRole, course, navigate);
    navigate("/cart/new");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowCourseInfo(true);
        setAnimateClass("animate-float-in");
      } else {
        setAnimateClass("animate-float-out");
        setTimeout(() => setShowCourseInfo(false), 200);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showCourseInfo ? (
        <div
          className={`lg:block hidden fixed z-10 mt-16 lg:w-1/3 px-8 right-0 top-8 ${animateClass} `}
        >
          <div className="relative h-[20vh] bg-orange-200 rounded-t-lg">
            <div className="absolute bg-orange-500 text-white m-4 px-2 py-1 rounded">
              {course.category_name}
            </div>
            <img
              src={course.image_url}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-gradient">
              {course.name}
            </h2>
            <p>
              <strong>Instructor:</strong> {course.instructor_name}
            </p>
            <p className="flex flex-col">
              <strong>Overview:</strong>{" "}
              <span className="h-[25vh] overflow-y-scroll">
                {course.description}
              </span>
            </p>
            {isPurchased ? (
              <div>
                <div className="text-sm font-light pt-2">Already enrolled</div>
                <div className="bg-orange-500 text-center text-lg font-bold text-white p-2 mt-2 rounded">
                  Go to course
                </div>
              </div>
            ) : (
              <div>
                {course.discount ? (
                  <div className="flex gap-2 items-baseline">
                    <div className="text-xl font-bold text-orange-500 pt-2">
                      US${course.price_paid.toFixed(2)}
                    </div>
                    <div className="text-sm line-through">
                      US${course.price.toFixed(2)}
                    </div>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-orange-500 pt-2">
                    US${course.price.toFixed(2)}
                  </div>
                )}
                <div>
                  <div
                    className="bg-orange-500 text-center text-lg font-bold text-white p-2 mt-2 rounded"
                    onClick={() =>
                      currentUser
                        ? handleAdd(
                            JSON.parse(currentUser).role,
                            course,
                            navigate
                          )
                        : navigate("/login")
                    }
                  >
                    Buy Now
                  </div>
                  <div
                    onClick={() =>
                      currentUser
                        ? handleAddCart(
                            JSON.parse(currentUser).role,
                            course,
                            navigate
                          )
                        : navigate("/login")
                    }
                    className="text-center cursor-pointer text-lg font-bold border-2 border-orange-500 p-2 mt-2 rounded"
                  >
                    Add to cart
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
