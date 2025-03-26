import { BLOG_API } from "../constants/api/blog";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";
import { Blog, BlogRequest,  } from "../models/Blog.model";
import { BlogSearchParams } from "../models/SearchInfo.model";
import { deleteRequest, getRequest, postRequest, putRequest } from "./httpsMethod";

const BlogService = {
    // Create a new blog
    createBlog(params: BlogRequest): Promise<ApiResponse> {
        return postRequest(BLOG_API.CREATE_BLOG, params);
    },

    // Get a list of blogs with optional search filters
    getBlogs(params: BlogSearchParams): Promise<ApiResponse<APIResponseData<Blog>>> {
        return postRequest(BLOG_API.GET_BLOGS, params);
    },

    // Get details for a specific blog by ID
    getBlog(blogId: string): Promise<ApiResponse<Blog>> {
        return getRequest(BLOG_API.GET_BLOG(blogId));
    },

    // Update a blog by ID
    updateBlog(blogId: string, params: BlogRequest): Promise<ApiResponse<Blog>> {
        return putRequest(BLOG_API.UPDATE_BLOG(blogId), params);
    },

    // Delete a blog by ID
    deleteBlog(blogId: string): Promise<ApiResponse> {
        return deleteRequest(BLOG_API.DELETE_BLOG(blogId));
    }
}
export default BlogService;