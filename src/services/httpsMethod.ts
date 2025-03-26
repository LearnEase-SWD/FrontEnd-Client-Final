import { AxiosResponse } from "axios";
import axiosClientVer2 from "./axiosInterceptors";
import {
  hideLoadingOverlay,
  showLoadingOverlay,
} from "../utils/loadingOverlay";
import { ApiResponse } from "../models/ApiReponse.model";
import { Message } from "../models/Message.model";
import { CreateConversation } from "../models/Conversation.model";

// [GET]
const getRequest = async <T>(
  url: string,
  showLoading = true
): Promise<ApiResponse<T>> => {
  if (showLoading) showLoadingOverlay();
  try {
    const res: AxiosResponse<ApiResponse<T>> = await axiosClientVer2.get(url);
    return res.data;
  } finally {
    if (showLoading) hideLoadingOverlay();
  }
};

// [POST]
const postRequest = async <T>(
  url: string,
  payload: unknown,
  showLoading = true
): Promise<ApiResponse<T>> => {
  if (showLoading) showLoadingOverlay();
  try {
    const res: AxiosResponse<ApiResponse<T>> = await axiosClientVer2.post(
      url,
      payload
    );
    return res.data;
  } finally {
    if (showLoading) hideLoadingOverlay();
  }
};

// [PUT]
const putRequest = async <T>(
  url: string,
  payload: unknown,
  showLoading = true
): Promise<ApiResponse<T>> => {
  if (showLoading) showLoadingOverlay();
  try {
    const res: AxiosResponse<ApiResponse<T>> = await axiosClientVer2.put(
      url,
      payload
    );
    return res.data;
  } finally {
    if (showLoading) hideLoadingOverlay();
  }
};

// [PATCH]
const patchRequest = async <T>(
  url: string,
  payload: unknown,
  showLoading = true
): Promise<ApiResponse<T>> => {
  if (showLoading) showLoadingOverlay();
  try {
    const res: AxiosResponse<ApiResponse<T>> = await axiosClientVer2.patch(
      url,
      payload
    );
    return res.data;
  } finally {
    if (showLoading) hideLoadingOverlay();
  }
};

// [DELETE]
const deleteRequest = async <T>(
  url: string,
  showLoading = true
): Promise<ApiResponse<T>> => {
  if (showLoading) showLoadingOverlay();
  try {
    const res: AxiosResponse<ApiResponse<T>> = await axiosClientVer2.delete(
      url
    );
    return res.data;
  } finally {
    if (showLoading) hideLoadingOverlay();
  }
};

// [GET REQUEST MESSAGE]
const getRequestMessage = async (
  url: string,
  showLoading = true
): Promise<Message[]> => {
  if (showLoading) showLoadingOverlay();
  try {
    const res: AxiosResponse<Message[]> = await axiosClientVer2.get(url);
    return res.data;
  } finally {
    if (showLoading) hideLoadingOverlay();
  }
};

// [CREATE NEW CONVERSATION]
const createNewConversation = async (
  url: string,
  showLoading = true,
  payload: CreateConversation
) => {
  if (showLoading) showLoadingOverlay();
  try {
    const res = await axiosClientVer2.post(url, payload);
    return res.data;
  } finally {
    if (showLoading) hideLoadingOverlay();
  }
};

const getListConversation = async (url: string, showLoading = true) => {
  if (showLoading) showLoadingOverlay();
  try {
    const res = await axiosClientVer2.get(url);
    return res.data;
  } finally {
    if (showLoading) hideLoadingOverlay();
  }
};
// Export functions for use elsewhere
export {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest,
  getRequestMessage,
  getListConversation,
  createNewConversation,
};

// HOW TO USE: Custom Service Example (e.g., CartService)

// 1. Define your API endpoints in a constants file (e.g., CART_API).

// 2. Import required models for requests and responses.

// 3. Create a service object using the base HTTP methods:
//
//    const CartService = {
//      createCart(cartId: string): Promise<ApiResponse<specify return structure if needed>> {
//        return postRequest(CART_API.CREATE_CART, { cartId });
//      },
//      getCartByStatus(params: SearchCartByStatus): Promise<ApiResponse<APIResponseData<Cart>>> {
//        return postRequest(CART_API.SEARCH_CART, params);
//      },
//      updateStatusCart(params: CartStatusUpdate): Promise<ApiResponse> {
//        return putRequest(CART_API.UPDATE_CART_STATUS, params);
//      },
//      deleteCart(cartId: string): Promise<ApiResponse> {
//        return deleteRequest(CART_API.DELETE_CART(cartId));
//      }
//    };
//    export default CartService;
//
// 4. Use the service methods in your components, handling promises for responses and errors:
//    E.g.,
//    CartService.createCart(newCartId)
//      .then(response => console.log("Cart created:", response))

//or...

// const searchValues: SearchCartByStatus = {
//   searchCondition: {
//       keyword: 'example', // Optional
//       category_id: '123', // Optional
//       status: CartStatusEnum.CANCEL, // Set this based on your enum
//       is_deleted: false // Required
//   },
//   pageInfo: {
//       pageNum: 1, // Set to desired page number
//       pageSize: 10 // Set to desired items per page
//   }
// };

// const response = await CartService.getCartByStatus(searchValues);
