const API_BASE_URL = "/api/users";

export const USER_API = {
  PREVIEW_INSTRUCTOR: `${API_BASE_URL}/review-profile-instructor`,
  GET_USERS: `${API_BASE_URL}/search`,
  CREATE_USER: `${API_BASE_URL}/create`,
  GET_USER: (id: string) => `${API_BASE_URL}/${id}`,
  UPDATE_USER: (id: string) => `${API_BASE_URL}/${id}`,
  DELETE_USER: (id: string) => `${API_BASE_URL}/${id}`,
  CHANGE_ROLE: `${API_BASE_URL}/change-role`,
  CHANGE_STATUS: `${API_BASE_URL}/change-status`,
  COMPLETED_LESSON: `${API_BASE_URL}/completed-lesson`,
};

export default USER_API;
