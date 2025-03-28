import { CLIENT_API } from "../constants/api/client"
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model"
// import { Blog } from "../models/Blog.model"
import { Category } from "../models/Category.model"
import { GetBlogsClient, GetCategoriesClient, GetCourseClient } from "../models/Client.model"
import { Course } from "../models/Course.model"
import { getRequest, postRequest } from "./httpsMethod"

const ClientService = {
    getCourses(): Promise<ApiResponse> {
        return getRequest(CLIENT_API.COURSE_SEARCH, false)
    },
    getCourseDetails(courseId: string):  Promise<ApiResponse>{
        return getRequest(CLIENT_API.COURSE_DETAILS(courseId), false)
    },
    getCategories():  Promise<ApiResponse> {
        return getRequest(CLIENT_API.CATEGORY_SEARCH,false)
    },
    // getBlogs(params: GetBlogsClient):  Promise<ApiResponse<APIResponseData<Blog>>> {
    //     return postRequest(CLIENT_API.BLOG_SEARCH, params,false)
    // },
    // getBlogDetail(blogId: string):  Promise<ApiResponse<Blog>> {
    //     return getRequest(CLIENT_API.BLOG_DETAILS(blogId),false)
    // },
    
    


}
     

export default ClientService