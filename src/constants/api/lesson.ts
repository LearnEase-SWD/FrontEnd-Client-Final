const API_BASE_URL = "/api/lesson";

export const LESSON_API = {
  CREATE_LESSON: `${API_BASE_URL}`,
  GET_LESSONS: `${API_BASE_URL}/search`,
  GET_LESSON: (id: string) => `${API_BASE_URL}/${id}`,
  UPDATE_LESSON: (id: string) => `${API_BASE_URL}/${id}`,
  DELETE_LESSON: (id: string) => `${API_BASE_URL}/${id}`,
};
