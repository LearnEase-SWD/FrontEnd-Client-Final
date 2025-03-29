import { useCustomNavigate } from "../hooks/customNavigate";
import { Button } from "antd";
import heroImage from "../assets/pexels-kseniachernaya-7301126.jpg";
import CategoriesGrid from "../components/home/CategoriesGrid";
import CoursesGrid from "../components/home/CoursesGrid";
import { ProofOfProduct } from "../components/home/ProofOfProduct";
import { BiSolidArrowFromLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { Course } from "../models/Course.model";
import ClientService from "../services/client.service";
import { useEffect, useState } from "react";
import { addToCart } from "../redux/slices/cartSlice";
import { Blog } from "../models/Blog.model";
import { Category } from "../models/Category.model";

const HomePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.auth.login);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await ClientService.getCourses();
        setCourses(response?.data ?? []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await ClientService.getCategories();
        setCategories(response?.data ?? []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCourses();
    fetchCategories();
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

 

  const onAddCart = async (course: Course) => {
    await dispatch(addToCart({ course, userRole: currentUser?.role, navigate }));
    return true;
  };

  return (
    <div className="flex flex-col items-center">
      <main className="w-full text-left overflow-visible font-jost">
        <section className="relative lg:h-[400px] flex justify-center items-center flex-col space-y-4 bg-black">
          <img src={heroImage} className="absolute object-cover brightness-75" alt="Hero" />
          <div className="z-40 text-white text-3xl font-semibold text-center">
            Elevate Your Skills With <span className="underline">Online Courses</span>
          </div>
        </section>

        <section className="py-12">
          <CategoriesGrid categories={categories} />
        </section>

        <section className="py-12">
          <CoursesGrid courses={courses} viewMode="grid" onAddCartClick={onAddCart} />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
