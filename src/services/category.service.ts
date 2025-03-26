import { CATEGORY_API } from "../constants/api/category";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";
import { Category, CategoryRequest, GetCategories } from "../models/Category.model";
import { getRequest, postRequest, putRequest, deleteRequest } from "./httpsMethod";

const CategoryService = {
    // Create a new CATEGORY
    createCategory(params: CategoryRequest): Promise<ApiResponse> {
        return postRequest(CATEGORY_API.CREATE_CATEGORY, params);
    },

    // Get a list of CATEGORYs with optional search filters
    getCategories(params: GetCategories): Promise<ApiResponse<APIResponseData<Category>>> {
        return postRequest(CATEGORY_API.GET_CATEGORIES, params);
    },

    // Get details for a specific CATEGORY by ID
    getCategory(categoryId: string): Promise<ApiResponse<Category>> {
        return getRequest(CATEGORY_API.GET_CATEGORY(categoryId));
    },

    // Update a CATEGORY by ID
    updateCategory(categoryId: string, params: CategoryRequest): Promise<ApiResponse<Category>> {
        return putRequest(CATEGORY_API.UPDATE_CATEGORY(categoryId), params);
    },

    // Delete a CATEGORY by ID
    deleteCategory(categoryId: string): Promise<ApiResponse> {
        return deleteRequest(CATEGORY_API.DELETE_CATEGORY(categoryId));
    }
};

export default CategoryService;
