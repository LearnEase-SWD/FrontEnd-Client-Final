const API_BASE_URL = "/api/blog";

export const BLOG_API = {
    CREATE_BLOG: `${API_BASE_URL}`,
    GET_BLOGS: `${API_BASE_URL}/search`,
    GET_BLOG: (id: string) => `${API_BASE_URL}/${id}`,
    UPDATE_BLOG: (id: string) => `${API_BASE_URL}/${id}`,
    DELETE_BLOG: (id: string) => `${API_BASE_URL}/${id}`,
}