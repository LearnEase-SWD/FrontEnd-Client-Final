import { CourseStatusEnum } from "../pages/AdminDashboard/monitors/course/courseList";
import { LessonTypeEnum } from "./Lesson.model";
import { PurchaseStatusEnum } from "./Purchase.model";

export interface SearchCondition<T = unknown> {
  keyword?: string;
  user_id?: string;
  category_id?: string;
  status?: T;
  is_deleted: false;
}

export interface CourseLogSearchCondition {
  course_id: string;
  keyword?: string;
  old_status: CourseStatusEnum | "";
  new_status: CourseStatusEnum | "";
  is_deleted: false;
}

export interface SessionSearchCondition {
  course_id: string;
  keyword?: string;
  is_position_order: boolean;
  is_deleted: false;
}

export interface LessonSearchCondition {
  course_id?: string;
  session_id?: string;
  lesson_type?: LessonTypeEnum;
  keyword?: string;
  is_position_order: boolean;
  is_deleted: false;
}

export interface PurchaseSearchCondition {
  purchase_no?: string;
  cart_no?: string;
  course_id?: string;
  status?: PurchaseStatusEnum | "";
  is_delete?: false;
}

export interface UserSearchCondition {
  keyword?: string;
  role?: string;
  status: boolean | string;
  is_verified?: boolean;
  is_delete?: boolean;
}

export interface UserSearchParams {
  searchCondition: UserSearchCondition;
  pageInfo: PageInfo;
}

export interface CoursesSearchParams {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
  totalItems?: number;
  totalPages?: number;
}

export interface BlogSearchCondition {
  category_id?: string;
  is_delete?: boolean;
}

export interface BlogSearchParams {
  searchCondition: BlogSearchCondition;
  pageInfo: PageInfo;
}

export interface ReviewSearchCondition {
  course_id?: string;
  rating?: number;
  is_instructor?: boolean;
  is_rating_order?: boolean;
  is_deleted?: boolean
}

export interface SubcriptionSearchParams {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}
export interface GlobalSearchParam {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}

