import { useCustomNavigate } from "../hooks/customNavigate";
import { Button } from "antd";
import heroImage from "../assets/pexels-kseniachernaya-7301126.jpg";
// import { BiSearch } from "react-icons/bi";
import CategoriesGrid from "../components/home/CategoriesGrid";

// import {
//   FaPalette,
//   FaCode,
//   FaComments,
//   FaVideo,
//   FaCamera,
//   FaChartLine,
//   FaPenNib,
//   FaChartPie,
//   FaAtom,
//   FaNetworkWired,
// } from "react-icons/fa";
import CoursesGrid from "../components/home/CoursesGrid";
// import CTABanner from "../components/home/CTABanner";

import { ProofOfProduct } from "../components/home/ProofOfProduct";
import Search from "antd/es/input/Search";
import { BiSolidArrowFromLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { Course } from "../models/Course.model";
import ClientService from "../services/client.service";
import { GetBlogsClient, GetCourseClient } from "../models/Client.model";
import { useEffect, useState } from "react";
import { addToCart } from "../redux/slices/cartSlice";
import { Blog } from "../models/Blog.model";
import { Category } from "../models/Category.model";


const HomePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // const initialCoursesParams: GetCourseClient = {
    //   pageInfo: {
    //     pageIndex: 1,
    //     pageSize: 10,
    //   },
    //   searchCondition: {
    //     keyword: "",
    //     is_deleted: false,
    //     category_id: "",
    //   },
    // };

    const fetchCourses = async () => {
      const response = await ClientService.getCourses();
      setCourses(response?.data ?? []);
      console.log(response?.data)
    };

    const fetchCategories = async () => {
      const response = await ClientService.getCategories();
      setCategories(response?.data ?? []);
      console.log(response?.data)
    };



    fetchCourses(); // Call the async function
    fetchCategories()

  }, []);

  const navigate = useCustomNavigate();

  window.addEventListener("scroll", function () {
    const floatElements = document.querySelectorAll(".float-animation");

    floatElements.forEach((el) => {
      const position = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (position < windowHeight) {
        el.classList.add("show");
      }
    });
  });

  const { currentUser } = useSelector((state: RootState) => state.auth.login);

  const dispatch = useDispatch<AppDispatch>();

  const onAddCart = async (course: Course) => {
    await dispatch(addToCart({ course, userRole: currentUser?.role, navigate }));
    return true
  };

  return (
    <div className="flex flex-col items-center">
      {/* <div className="flex flex-col md:flex-row gap-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-md w-full md:w-auto"
          onClick={() => navigate("/admin/dashboard")}
        >
          Admin Dashboard
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md w-full md:w-auto"
          onClick={() => navigate("/instructor/dashboard")}
        >
          Instructor Dashboard
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded-md w-full md:w-auto"
          onClick={() => navigate("/student/dashboard")}
        >
          Student Dashboard
        </button>
      </div> */}
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
          {/* <Button className="rounded-xl bg-[#FF782D] border-none h-[40px] text-md font-semibold text-white">
            <BiSearch /> Find A Course
          </Button> */}
          {/* <Search
            placeholder="Search for any course..."
            onSearch={(e) => navigate(`course?search=${e}`)}
            enterButton
            className=" w-64 sm:w-96 custom-search"
          /> */}
        </section>

        <section className="float-animation show">
          <div className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex sm:flex-row flex-col  justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl mb-2 sm:mb-0 lg:text-4xl font-bold text-gray-800">
                    Featured Topics
                  </h2>
                  <a href="/course" onClick={() => navigate("/course")} className="text-orange-600 cursor-pointer underline sm:no-underline sm:text-gray-600">Explore our Popular Topics </a>

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
                  <BiSolidArrowFromLeft className="group-hover:scale-150 transition " />
                </Button>
              </div>
              <CategoriesGrid categories={categories} />
            </div>
            <p className="text-gray-600 mt-12 sm:text-2xl mx-auto text-center w-full italic font-semibold ">
              ...and many more to come!
            </p>
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
                  <a href="/course" onClick={() => navigate("/course")} className="text-orange-600 cursor-pointer underline sm:no-underline sm:text-gray-600">Explore our Popular Courses </a>

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
                  <BiSolidArrowFromLeft className="group-hover:scale-150 transition " />
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
