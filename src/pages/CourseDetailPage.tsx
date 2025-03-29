import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Banner } from "../components/CourseDetailPage/Banner";
import { Detail } from "../components/CourseDetailPage/Detail";
import { LeaveAComment } from "../components/LeaveAComment";
import { Course } from "../models/Course.model";
import { DetailModal } from "../components/CourseDetailPage/Modal";
import DetailSkeleton from "../components/CourseDetailPage/DetailSkeleton";
import ClientService from "../services/client.service";
import axios from "axios";

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id ? id.toString() : "";
  const userId = localStorage.getItem("userId");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [course, setCourse] = useState<Course>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isPurchased, setIsPurchased] = useState<boolean>(false); // Add isPurchased state

  const fetchData = async (courseId: string) => {
    setLoading(true);
    try {
        const response = await ClientService.getCourseDetails(courseId);
        if (response.data && typeof response.data === 'object') {
            setCourse(response.data as Course);
            setIsPurchased(response.data.isPurchased); // Cập nhật isPurchased từ API
        } else {
            console.error("Invalid API response:", response.data);
            setCourse(null);
        }
    } catch (error) {
        console.error("Error fetching course details:", error);
        setCourse(null);
    } finally {
        setLoading(false);
    }
};
const checkPurchaseStatus = async () => {
  if (courseId && userId) {
      try {
          const response = await axios.get(`https://localhost:7002/api/courses/${courseId}/user/${userId}`);
          console.log("API response:", response.data);
          if (response.data && response.data.data) {
              setIsPurchased(response.data.data.isPurchased);
          }
      } catch (error) {
          console.error("Error checking purchase status:", error);
      }
  }
};

useEffect(() => {
  fetchData(courseId);
  checkPurchaseStatus(); // Kiểm tra trạng thái mua hàng khi component mount
}, [courseId, userId]);

  if (loading) {
    return <DetailSkeleton />;
  }

  if (course && id) {
    return (
      <div className="relative">
        <div className="px-5 lg:inset-x-0 flex flex-col">
          <Banner
            course={course}
            isPurchased={isPurchased} // Use the isPurchased state
            id={id}
            completed_lesson={user.completed_lesson || []}
          />
        </div>
        <Detail
          isEnrolled={isPurchased} // Use the isPurchased state
          course={course || undefined}
        />
        <div className="lg:w-2/3">
          <LeaveAComment courseId={courseId} />
        </div>
        <DetailModal course={course} isPurchased={isPurchased} />
      </div>
    );
  }
};

export default CourseDetailPage;