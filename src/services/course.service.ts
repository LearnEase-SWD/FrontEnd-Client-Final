import { COURSE_API } from "../constants/api/course";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";
import {
  Course,
  CourseStatusUpdate,
  CourseRequest,
  GetCourses,
  GetCourseLogs,
  CourseLog,
} from "../models/Course.model";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./httpsMethod";

const CourseService = {
  createCourse(params: CourseRequest): Promise<ApiResponse<Course>> {
    return postRequest(COURSE_API.CREATE_COURSE, params);
  },

  getCourses(
    params: GetCourses
  ): Promise<ApiResponse<APIResponseData<Course>>> {
    return postRequest(COURSE_API.GET_COURSES, params);
  },

  getCourse(courseId: string): Promise<ApiResponse<Course>> {
    return getRequest(COURSE_API.GET_COURSE(courseId));
  },

  updateCourse(
    courseId: string,
    params: CourseRequest
  ): Promise<ApiResponse<Course>> {
    return putRequest(COURSE_API.UPDATE_COURSE(courseId), params);
  },

  deleteCourse(courseId: string): Promise<ApiResponse> {
    return deleteRequest(COURSE_API.DELETE_COURSE(courseId));
  },

  updateCourseStatus(params: CourseStatusUpdate): Promise<ApiResponse> {
    return postRequest(COURSE_API.UPDATE_COURSE_STATUS, params);
  },

  getCourseLogs(
    params: GetCourseLogs
  ): Promise<ApiResponse<APIResponseData<CourseLog>>> {
    return postRequest(COURSE_API.GET_COURSE_LOGS, params);
  },
};

export default CourseService;
