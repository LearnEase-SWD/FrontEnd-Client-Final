import { Lesson } from "./Lesson.model";
import {
  CourseLogSearchCondition,
  PageInfo,
  SearchCondition,
} from "./SearchInfo.model";
import { Session } from "./Session.model";

export interface Course {
  courseID: string;
  topicID: string;
  topicName: string;
  title: string;
  description: string;
  content: string; // Assuming content is HTML string
  status: string;
  video_url?: string; // Optional video URL
  image_url: string;
  tag: string[];
  level: string;
  enrolled: number;
  price: number;
  discount: number;
  createdAt: string;
  price_paid: number;
  full_time: number;
  user_name: string;
  name: string;
  totalLessons: number;
  lessons: Lesson[];
  is_in_cart: boolean;
  is_purchased: boolean;
  average_rating: number;
  review_count: number;
  difficultyLevel: string;
}

export interface CourseLog {
  _id: string;
  course_id: string;
  user_id: string;
  old_status: CourseStatusEnum;
  new_status: CourseStatusEnum;
  comment: string;
  created_at: string;
  is_deleted: boolean;
  user_name: string;
  course_name: string;
}

export interface CourseRequest {
  name: string;
  category_id: string;
  description: string;
  content: string;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  level: number;
}

export interface CourseStatusUpdate {
  course_id: string;
  new_status: CourseStatusEnum;
  comment: string;
}

export enum CourseStatusEnum {
  NEW = "new",
  WAITING_APPROVE = "waiting_approve",
  APPROVE = "approve",
  REJECT = "reject",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface GetCourses {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}

export interface GetCourseLogs {
  searchCondition: CourseLogSearchCondition;
  pageInfo: PageInfo;
}
