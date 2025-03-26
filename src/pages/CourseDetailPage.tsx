import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Banner } from "../components/CourseDetailPage/Banner";
import { Detail } from "../components/CourseDetailPage/Detail";
import { LeaveAComment } from "../components/LeaveAComment";
import { Course } from "../models/Course.model";
import { Session } from "../models/Session.model";
import { DetailModal } from "../components/CourseDetailPage/Modal";
import DetailSkeleton from "../components/CourseDetailPage/DetailSkeleton";
import ClientService from "../services/client.service";

const CourseDetailPage = () => {
  // Get the course ID from the URL
  const { id } = useParams<{ id: string }>();
  const courseId = id ? id.toString() : "";
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [course, setCourse] = useState<Course>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (courseId: string) => {
    setLoading(true);
    try {
      const response = await ClientService.getCourseDetails(courseId);
      setCourse(response.data as Course);
      setSession((response.data as Course).session_list as unknown as Session);
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(courseId);
  }, [courseId]);

  if (loading) {
    return <DetailSkeleton />;
  }

  if (course && id) {
    return (
      <div className="relative">
        <div className="px-5 lg:inset-x-0 flex flex-col">
          <Banner
            course={course}
            isPurchased={course.is_purchased}
            id={id}
            completed_lesson={user.completed_lesson || []}
          />
        </div>
        <Detail
          isEnrolled={course.is_purchased}
          course={course || undefined}
          session={session || undefined}
        />
        <div className="lg:w-2/3">
          <LeaveAComment courseId={courseId} />
        </div>
        <DetailModal course={course} isPurchased={course.is_purchased} />
      </div>
    );
  }
};

export default CourseDetailPage;
