import { Button, Card, Tag } from "antd";
import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { FaBook, FaShoppingCart } from "react-icons/fa";
// import { TiUserOutline } from "react-icons/ti";
import { Course } from "../models/Course.model";
import { FaStar } from "react-icons/fa6";
import { useCustomNavigate } from "../hooks/customNavigate";
import { moneyFormatter } from "../utils/moneyFormatter";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { ArrowRightOutlined } from "@ant-design/icons";

const CourseCard: React.FC<{
  course: Course;
  viewMode: string;
  index: number;
  onAddCartClick: (course: Course) => void;
}> = ({ course, viewMode, onAddCartClick }) => {
  // const [isMdScreen, setIsMdScreen] = useState(false);
  const [isInCart, setIsInCart] = useState(course.is_in_cart);
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  const [loading, setLoading] = useState(false);
  const navigate = useCustomNavigate();

  const handleAddCart = async () => {
    setLoading(true);
    await onAddCartClick(course);
    setLoading(false);
    if (currentUser?.role) {
      setIsInCart(true);
    }
  }

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(min-width: 1200px)");
  //   const handleResize = () => setIsMdScreen(mediaQuery.matches);
  //   handleResize(); // Initial check
  //   mediaQuery.addEventListener("change", handleResize); 

  //   return () => mediaQuery.removeEventListener("change", handleResize); 
  // }, []);

  return (
    <div className="group relative cursor-pointer">
      <a href={`/course/${course.courseID}`}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/course/${course.courseID}`);
        }}>
        <Card
          hoverable

          styles={{
            body: {
              height: "100%",
              width: "100%",
            },
          }}
          cover={
            <div className="relative">
              <img
                alt={course.title}
                src={course.image_url}
                className={`${viewMode === "list"
                    ? "min-w-[200px]  w-[200px] md:min-w-[250px] md:w-[250px]"
                    : "w-full"
                  } h-40 sm:h-56 object-cover`}
              />
              <Tag className="absolute top-2 left-2 bg-black text-white">
                {course.category_name}
              </Tag>
            </div>
          }
          className={`${viewMode === "list" && " h-[200px] md:"
            }h-full group-hover:shadow-lg rounded-3xl overflow-hidden group font-jost  group-hover:-translate-y-2  hover:-translate-y-2 transition-all duration-500 ${viewMode === "list" ? "flex" : ""
            }`}
        >
          <div className="flex-grow">
            {/* <a className="text-gray-500 text-sm mb-2" 
            href={`profile/${course.instructor_id}`} 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              navigate(`/profile/${course.instructor_id}`)
            }
            }>
              by {course.instructor_name}
            </a> */}
            <h2 className="text-base font-semibold  overflow-ellipsis overflow-hidden whitespace-nowrap transition group-hover:text-[#FFAB2D]">
              {course.title}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Level {course.difficultyLevel}
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-between text-sm text-gray-500 mb-4">
              <span className="flex items-center">
                <AiOutlineClockCircle
                  className="mr-1 text-orange-500"
                  size={18}
                />
                {Math.ceil(course.full_time / 60)} Hours
              </span>
              <span className="flex items-center justify-end text-left">
                <FaStar className="mr-1 text-yellow-400" size={20} />
                {course.average_rating} ({course.review_count})
              </span>

              <span className="flex items-center">
                <BiBook className="mr-1 text-orange-500" size={18} />
                {course.totalLessons} Lessons
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-base sm:text-lg font-bold text-orange-500">
                {!course.is_purchased ? (<p className="flex items-center">
                  {typeof course.price === "number" ? moneyFormatter(course.price, course.discount) : course.price}
                  {course.discount > 0 && <span className=" ml-2 font-normal text-sm line-through text-gray-400 "> {moneyFormatter(course.price)}</span>}
                </p>)
                  : (
                    <a href={`/course/${course.courseID}`}
                      className="px-4 sm:px-2 py-1 bg-orange-500 rounded-full hover:bg-orange-400 text-sm transition-all flex justify-center font-jost font-medium text- text-white hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/course/${course.courseID}`)
                      }}>Go to course <ArrowRightOutlined className="w-3 ml-2" /></a>
                  )}
              </span>

            </div>
          </div>
        </Card>

        <div
          className={`z-40 absolute top-0 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4  transition-all duration-300 transform pointer-events-none group-hover:pointer-events-auto
            ${viewMode !== "list"
              ? "w-full group-hover:-translate-y-4 max-h-[70%] min-h-[60%]"
              : "w-[352px] left-full translate-x-4"}
            `}

        >
          <div className={`${viewMode !== "list" ? "w-full" : "w-80"} font-jost bg-white p-4 rounded-3xl shadow-lg`}>
            <h3 className="text-xl font-semibold">{course.title}</h3>
            {/* <a className="text-gray-500 text-sm mb-2" 
            href={`profile/${course.instructor_id}`} 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              navigate(`/profile/${course.instructor_id}`)
            }
            }>
              by {course.instructor_name}
            </a> */}
            <p className="text-sm text-gray-600">
              Created at{" "}
              {new Date(course.createdAt).toLocaleDateString() ?? "Recently"}
            </p>
            <p className="text-sm text-gray-700 mb-4 mt-2">
              {course.description ??
                "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."}
            </p>
            {/* <ul className="text-sm text-gray-600 mb-4">
              <li className="flex items-center mb-1">
                <AiOutlineClockCircle className="mr-2 text-primary" size={16} />
                {Math.ceil(course.full_time/60)} Hours
              </li>
              <li className="flex items-center mb-1">
                <BiBook className="mr-2 text-primary" size={16} />
                {course.level}
              </li>
              <li className="flex items-center mb-1">
                <BiBook className="mr-2 text-primary" size={16} />
                {course.lesson_count}
              </li>
            </ul> */}
            {!isInCart &&
              <Button
                loading={loading}
                className="font-jost cursor-pointer w-full bg-primary text-primary-foreground hover:bg-primary/90 flex view-button ant-btn-variant-solid"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddCart()
                }}
              >
                <FaShoppingCart className="text-white" size={18} /> Add to cart
              </Button>
            }
            {(isInCart && !course.is_purchased) &&
              <Button
                className="font-jost cursor-pointer w-full bg-primary text-primary-foreground hover:bg-primary/90 flex view-button ant-btn-variant-solid"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/cart/new`)
                }}
              >
                <FaShoppingCart className="text-white" size={18} /> View In Your Cart
              </Button>
            }

            {course.is_purchased &&
              <Button
                className="font-jost cursor-pointer w-full bg-primary text-primary-foreground hover:bg-primary/90 flex view-button ant-btn-variant-solid"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/course/${course.courseID}`)
                }}
              >
                <FaBook className="text-white" size={18} /> Learn Now
              </Button>
            }

          </div>
        </div>
      </a>
    </div>
  );
};
export default CourseCard;
