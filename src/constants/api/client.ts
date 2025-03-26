const API_BASE_URL = "/api/client";

export const CLIENT_API = {
  COURSE_SEARCH: `${API_BASE_URL}/course/search`,
  COURSE_DETAILS: (id: string) => `${API_BASE_URL}/course/${id}`,
  CATEGORY_SEARCH: `${API_BASE_URL}/category/search`,
  BLOG_SEARCH: `${API_BASE_URL}/blog/search`,
  BLOG_DETAILS: (id: string) => `${API_BASE_URL}/blog/${id}`,
};

