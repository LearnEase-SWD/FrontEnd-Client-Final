const API_BASE_URL = "/api/session";

export const SESSION_API = {
  CREATE_SESSION: `${API_BASE_URL}`,
  GET_SESSIONS: `${API_BASE_URL}/search`,
  GET_SESSION: (id: string) => `${API_BASE_URL}/${id}`,
  UPDATE_SESSION: (id: string) => `${API_BASE_URL}/${id}`,
  DELETE_SESSION: (id: string) => `${API_BASE_URL}/${id}`,
};
