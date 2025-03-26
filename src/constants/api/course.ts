const API_BASE_URL = "/api/course";

export const COURSE_API = {
  CREATE_COURSE: `${API_BASE_URL}`,
  GET_COURSES: `${API_BASE_URL}/search`,
  GET_COURSE: (id: string) => `${API_BASE_URL}/${id}`,
  UPDATE_COURSE: (id: string) => `${API_BASE_URL}/${id}`,
  DELETE_COURSE: (id: string) => `${API_BASE_URL}/${id}`,
  UPDATE_COURSE_STATUS: `${API_BASE_URL}/change-status`,
  GET_COURSE_LOGS: `${API_BASE_URL}/log/search`,
};
