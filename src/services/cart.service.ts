import { Dispatch } from "redux";
import { CART_API } from "../constants/api/cart";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";
import {
  Cart,
  CartStatusEnum,
  CartStatusUpdate,
  SearchCartByStatus,
} from "../models/Cart.model";
import { PurchaseSearchCondition } from "../models/SearchInfo.model";
import { updateCartCount } from "../redux/slices/cartSlice";
import { deleteRequest, postRequest, putRequest } from "./httpsMethod";


const CartService = {
  createCart(courseId: string): Promise<ApiResponse> {
    return postRequest(CART_API.CREATE_CART, { course_id: courseId }, false);
  },
  async getCartsByStatus(
    params: SearchCartByStatus,
    dispatch?: Dispatch
  ): Promise<ApiResponse<APIResponseData<Cart>>> {
    const response: ApiResponse<APIResponseData<Cart>> = await postRequest(CART_API.SEARCH_CART, params);
  
    // Update cart count in Redux state if status is NEW
    if (params.searchCondition.status === CartStatusEnum.NEW && dispatch) {
      const cartCount = response.data?.pageData?.length || 0;
      dispatch((updateCartCount(cartCount)))
      console.log('somethign')
    }
    return response;
  },
  getCartsWithPurchase(
    params: PurchaseSearchCondition
  ): Promise<ApiResponse<APIResponseData<Cart>>> {
    return postRequest(CART_API.SEARCH_CART_WITH_PURCHASE, params);
  },
  getCartsAmount(
    params: SearchCartByStatus
  ): Promise<ApiResponse<APIResponseData<Cart>>> {
    return postRequest(CART_API.SEARCH_CART, params, false);
  },
  updateStatusCart(params: CartStatusUpdate, isLoad?: boolean): Promise<ApiResponse> {
    if (isLoad) return putRequest(CART_API.UPDATE_CART_STATUS, params);
    return putRequest(CART_API.UPDATE_CART_STATUS, params, false);
  },
  deleteCart(cartId: string): Promise<ApiResponse> {
    return deleteRequest(CART_API.DELETE_CART(cartId), false);
  },
};

// //exmaple for logging

// const searchValues: SearchCartByStatus = {
//     searchCondition: {
//         keyword: 'example', // Optional
//         category_id: '123', // Optional
//         status: CartStatusEnum.CANCEL, // Set this based on your enum
//         is_deleted: false // Required
//     },
//     pageInfo: {
//         pageNum: 1, // Set to desired page number
//         pageSize: 10 // Set to desired items per page
//     }
// };

// const response = await CartService.getCartByStatus(searchValues);
// console.log(response.data?.pageData)

export default CartService;
