

export const LESSON_API = {
  // CREATE_LESSON: `${API_BASE_URL}`,
  GET_LESSONS: `lessons`,
  GET_LESSON: (id: string) => `lessons/${id}`,
  GET_LESSONBYCOURSEID:(CourseId: string) =>`lessons/course/${CourseId}`,
  // UPDATE_LESSON: (id: string) => `${API_BASE_URL}/${id}`,
  // DELETE_LESSON: (id: string) => `${API_BASE_URL}/${id}`,
};
