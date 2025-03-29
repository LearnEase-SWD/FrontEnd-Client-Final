import { LESSON_API } from "../constants/api/lesson";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";
import { GetLessons, Lesson, LessonRequest } from "../models/Lesson.model";
import { getRequest, postRequest, putRequest, deleteRequest } from "./httpsMethod";

const LessonService = {
    // // Create a new Lesson
    // createLesson(params: LessonRequest): Promise<ApiResponse> {
    //     return postRequest(LESSON_API.CREATE_LESSON, params);
    // },

    // Get a list of Lessons with optional search filters
    getLessons(): Promise<ApiResponse> {
        return getRequest(LESSON_API.GET_LESSONS);
    },

    // Get details for a specific Lesson by ID
    getLesson(lessonId: string): Promise<ApiResponse> {
        return getRequest(LESSON_API.GET_LESSON(lessonId));
    },
    getLessonByCourseId(courseId: string): Promise<ApiResponse> {
        return getRequest(LESSON_API.GET_LESSONBYCOURSEID(courseId));
    }

    // // Update a Lesson by ID
    // updateLesson(lessonId: string, params: LessonRequest): Promise<ApiResponse<Lesson>> {
    //     return putRequest(LESSON_API.UPDATE_LESSON(lessonId), params);
    // },

    // // Delete a Lesson by ID
    // deleteLesson(lessonId: string): Promise<ApiResponse> {
    //     return deleteRequest(LESSON_API.DELETE_LESSON(lessonId));
    // }


};

export default LessonService;
