import { LessonSearchCondition, PageInfo } from "./SearchInfo.model";

export interface Lesson {
  lessonID: string;
  title: string;
  user_id: string;
  courseID: string;
  session_id: string;
  lessonType: LessonType;
  description: string;
  videoLesson: VIDEOLESSON[];
  theoryLesson: string;
  assignment: string;
  full_time: number;
  position_order: number;
  is_deleted: boolean;
  createdAt: string;
  updated_at: string;
  user_name: string;
  course_name: string;
  session_name: string;
  exercises: Exercise[];
  flashcards: Flashcard[];
  is_completed: boolean;
}
export interface VIDEOLESSON {
  videoID: string;
  lessonID: string;
  videoURL: string;
  createdAt: string;
  duration: string;
}
export interface Exercise {
  exerciseID: string;
  lessonID: string;
  lesson: string;
  type: string;
  question: string;
  answerOptions: string[];
  correctAnswer: string;
  createdAt: string;
  userExercises: [];
}
export interface Flashcard {
  flashcardID: string;
  lessonID: string;
  lesson: string;
  front: string;
  back: string;
  pronunciationAudioURL: string;
  createdAt: string;
  userFlashcards: [];
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
export enum LessonType { 
  Video = 0,
  Theory = 1,
  Exercise = 2,
  Conversation = 3
}

export enum LevelsEnum {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}
