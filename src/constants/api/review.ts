const API_BASE_URL = "/api/review";

export const REVIEW_API = {
  CREATE_REVIEW: `${API_BASE_URL}`,
  GET_REVIEWS: `${API_BASE_URL}/search`,
  GET_REVIEW: (id: string) => `${API_BASE_URL}/${id}`,
  UPDATE_REVIEW: (id: string) => `${API_BASE_URL}/${id}`,
  DELETE_REVIEW: (id: string) => `${API_BASE_URL}/${id}`,
};