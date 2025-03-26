const API_BASE_URL = "/api/category";

export const CATEGORY_API = {
  CREATE_CATEGORY: `${API_BASE_URL}`,
  GET_CATEGORIES: `${API_BASE_URL}/search`,
  GET_CATEGORY: (id: string) => `${API_BASE_URL}/${id}`,
  UPDATE_CATEGORY: (id: string) => `${API_BASE_URL}/${id}`,
  DELETE_CATEGORY: (id: string) => `${API_BASE_URL}/${id}`,
};
