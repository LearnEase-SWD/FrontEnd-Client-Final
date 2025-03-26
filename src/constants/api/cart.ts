const API_BASE_URL = "/api/cart";
const API_BASE_URL_PURCHASE = "/api/purchase";
export const CART_API = {
  CREATE_CART: `${API_BASE_URL}`,
  SEARCH_CART: `${API_BASE_URL}/search`,
  UPDATE_CART_STATUS: `${API_BASE_URL}/update-status`,
  SEARCH_CART_WITH_PURCHASE: `${API_BASE_URL_PURCHASE}/search-for-student`,
  DELETE_CART: (id: string) => `${API_BASE_URL}/${id}`,
};
