import { useEffect, useState } from "react";
import { useCustomNavigate } from "../hooks/customNavigate";
import { Button } from "antd";
import heroImage from "../assets/pexels-kseniachernaya-7301126.jpg";
import CategoriesGrid from "../components/home/CategoriesGrid";
import CoursesGrid from "../components/home/CoursesGrid";
import { ProofOfProduct } from "../components/home/ProofOfProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { addToCart } from "../redux/slices/cartSlice";
import ClientService from "../services/client.service";
import { Course } from "../models/Course.model";
import { Blog } from "../models/Blog.model";
import { Category } from "../models/Category.model";

const HomePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const navigate = useCustomNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.auth.login);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await ClientService.getCourses();
      setCourses(response?.data ?? []);
    };

    const fetchCategories = async () => {
      const response = await ClientService.getCategories();
      setCategories(response?.data ?? []);
    };

    fetchCourses();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Parse query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("vnp_OrderInfo")?.split("/")[1]; // Extract courseId from vnp_OrderInfo
    const userId = localStorage.getItem("userId") || params.get("vnp_OrderInfo")?.split("/")[0]; // Extract userId or get from localStorage

    if (courseId && userId) {
      // Call the PurchaseCourse method
      const purchaseCourse = async () => {
        try {
          const response = await ClientService.purchaseCourse(courseId, userId);
          if (response?.status === 200) {
            console.log("Course purchased successfully:", response.data);
          } else {
            console.error("Failed to purchase course:", response);
          }
        } catch (error) {
          console.error("Error purchasing course:", error);
        }
      };

      purchaseCourse();
    }
  }, []);

  const onAddCart = async (course: Course) => {
    await dispatch(addToCart({ course, userRole: currentUser?.role, navigate }));
    return true;
  };

  return (
    <div className="flex flex-col items-center">
      <main className="w-full text-left overflow-visible font-jost ">
        <section className="relative lg:h-[400px] font-jost h-[300px] w-[115vw] -ml-[10vw] lg:-ml-[15vw] flex justify-center items-center flex-col space-y-4 shadow-2xl shadow-orange-300  bg-black overflow-y-hidden">
          <img
            className=" xs:w-[115vw] min-h-[300px] xs:h-auto absolute xs:-top-36 object-cover xs:object-bottom brightness-75 float-animation show "
            src={heroImage}
            alt="Hero"
          />
          <div className="z-40 text-white text-3xl sm:text-4xl lg:text-5xl font-semibold w-[320px] xs:w-[400px] sm:w-[500px] text-center font-exo">
            Elevate Your Skills With{" "}
            <span className="underline">Online Courses</span>
          </div>
          <div className="z-40 w-[320px] xs:w-[400px] text-white text-center italic">
            "All the courses you need, all in one place." Get started today to
            unlock your hidden potential!
          </div>
        </section>

        <section className="float-animation show">
          <div className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex sm:flex-row flex-col  justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl mb-2 sm:mb-0 lg:text-4xl font-bold text-gray-800">
                    Featured Topics
                  </h2>
                  <a
                    href="/course"
                    onClick={() => navigate("/course")}
                    className="text-orange-600 cursor-pointer underline sm:no-underline sm:text-gray-600"
                  >
                    Explore our Popular Topics{" "}
                  </a>
                </div>
                <Button
                  type="default"
                  className="group hover:bg-orange-500 sm:flex hidden hover:text-white text-base transition-colors py-6 px-6 rounded-3xl font-jost"
                  style={{
                    backgroundColor: "#0f0f0f",
                    color: "white",
                  }}
                  onClick={() => navigate("/course")}
                >
                  All Courses{" "}
                </Button>
              </div>
              <CategoriesGrid categories={categories} />
            </div>
          </div>
        </section>

        <section className="float-animation">
          <div className="py-12 pt-0">
            <div className="container mx-auto px-4">
              <div className="flex sm:flex-row flex-col  justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl mb-2 sm:mb-0 lg:text-4xl font-bold text-gray-800">
                    Featured Courses
                  </h2>
                  <a
                    href="/course"
                    onClick={() => navigate("/course")}
                    className="text-orange-600 cursor-pointer underline sm:no-underline sm:text-gray-600"
                  >
                    Explore our Popular Courses{" "}
                  </a>
                </div>

                <Button
                  onClick={() => navigate("/course")}
                  type="default"
                  className="group hidden  sm:flex  hover:bg-orange-500 hover:text-white text-base transition-colors py-6 px-6 rounded-3xl font-jost"
                  style={{
                    backgroundColor: "#0f0f0f",
                    color: "white",
                  }}
                >
                  All Courses{" "}
                </Button>
              </div>
              <CoursesGrid
                courses={courses}
                viewMode="grid"
                onAddCartClick={onAddCart}
              />
            </div>
          </div>
        </section>

        <section className="mt-4 p-8 pb-0 float-animation bg-zinc-50 rounded-3xl">
          <div>
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 text-center">
              Students Love Us{" "}
            </h2>
            <p className="text-orange-600 text-center">
              Learn <span className="underline font-semibold">anything</span>{" "}
              from home with experts
            </p>
          </div>
          <ProofOfProduct />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
