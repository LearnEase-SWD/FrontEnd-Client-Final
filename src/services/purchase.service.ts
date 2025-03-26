import { PURCHASE_API } from "../constants/api/purchase";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";

import { GetPurchases, Purchase } from "../models/Purchase.model";
import { postRequest } from "./httpsMethod";

const PurchaseService = {
  getPurchases(
    params: GetPurchases
  ): Promise<ApiResponse<APIResponseData<Purchase>>> {
    return postRequest(PURCHASE_API.GET_PURCHASES, params);
  },

  getPurchasesStudent(
    params: GetPurchases
  ): Promise<ApiResponse<APIResponseData<Purchase>>> {
    return postRequest(PURCHASE_API.GET_PURCHASES_STUDENT, params);
  },
  
  getPurchasesInstructor( //instructor orders
    params: GetPurchases
  ): Promise<ApiResponse<APIResponseData<Purchase>>> {
    return postRequest(PURCHASE_API.GET_PURCHASES_INSTRUCTOR, params);
  },
};

export default PurchaseService;
