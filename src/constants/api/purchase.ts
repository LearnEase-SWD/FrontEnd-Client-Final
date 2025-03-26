const API_BASE_URL = "/api/purchase";

export const PURCHASE_API = {
  CREATE_PURCHASE: `${API_BASE_URL}`,
  GET_PURCHASES: `${API_BASE_URL}/search`,
  GET_PURCHASES_INSTRUCTOR: `${API_BASE_URL}/search-for-instructor`,
  GET_PURCHASES_STUDENT: `${API_BASE_URL}/search-for-student`,
};
