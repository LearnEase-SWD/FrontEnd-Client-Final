import { PAYOUT_API } from "../constants/api/payout";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";
import { CreatePayout, GetPayoutRequest, UpdateStatusPayoutRequest,  Payout } from "../models/Payout.model";
import { postRequest, putRequest } from "./httpsMethod";

const PayoutService = {
  createPayout(params: CreatePayout): Promise<ApiResponse<APIResponseData<Payout>>> {
    return postRequest(PAYOUT_API.CREATE_PAYOUT, params);
  },
    getPayout(params: GetPayoutRequest): Promise<ApiResponse<APIResponseData<Payout>>> {
    return postRequest(PAYOUT_API.GET_PAYOUT, params);
  },
  updatePayoutStatus(payoutId: string, params: UpdateStatusPayoutRequest): Promise<ApiResponse<Payout>> {
    const url = `${PAYOUT_API.UPDATE_PAYOUT_STATUS}/${payoutId}`;
    return putRequest(url, params);
  }
};

export default PayoutService;
