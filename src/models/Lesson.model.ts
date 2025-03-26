import { LessonSearchCondition, PageInfo } from "./SearchInfo.model";

export interface Lesson {
  _id: string;
  name: string;
  user_id: string;
  course_id: string;
  session_id: string;
  lesson_type: string;
  description: string;
  video_url: string;
  image_url: string;
  assignment: string;
  full_time: number;
  position_order: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  user_name: string;
  course_name: string;
  session_name: string;
  is_completed: boolean;
}

export interface LessonRequest {
  name: string;
  user_id: string;
  course_id: string;
  session_id: string;
  lesson_type: string;
  description: string;
  video_url: string;
  image_url: string;
  assignment?: string;
  full_time: number;
  position_order: number;
}

export interface GetLessons {
  searchCondition: LessonSearchCondition;
  pageInfo: PageInfo;
}

export enum LessonTypeEnum {
  READING = "reading",
  VIDEO = "video",
  IMAGE = "image",
  ASSIGNMENT = "assignment",
}


export enum LevelsEnum {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}
