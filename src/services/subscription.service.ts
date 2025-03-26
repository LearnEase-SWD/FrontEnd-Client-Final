import { SUBSCRIPTION_API } from "../constants/api/subscription";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";

import { GlobalSearchParam } from "../models/SearchInfo.model";
import { Subscription } from "../models/Subscription.model";
import { postRequest } from "./httpsMethod";

const SubscriptionService = {
  createSubscription(
    instructor_id: string
  ): Promise<ApiResponse<Subscription>> {
    return postRequest(SUBSCRIPTION_API.CREATE_SUBSCRIPTION, {instructor_id: instructor_id}, false);
  },

  getSubscribers(
    params: GlobalSearchParam,
  ): Promise<ApiResponse<APIResponseData<Subscription>>> {
    return postRequest(SUBSCRIPTION_API.GET_SUBSCRIBERS, params);
  },
  
  getSubscriptions(
    params: GlobalSearchParam,
  ): Promise<ApiResponse<APIResponseData<Subscription>>> {
    return postRequest(SUBSCRIPTION_API.GET_SUBSCRIPTIONS, params);
  },
  checkSubscription(
    instructor_name: string,
  ): Promise<ApiResponse<APIResponseData<Subscription>>> {
    
    const params: GlobalSearchParam = {
      searchCondition: {
        keyword: instructor_name,
        is_deleted: false,
      },
      pageInfo: {
        pageNum:1,
        pageSize:50,
      },
    }
    return postRequest(SUBSCRIPTION_API.GET_SUBSCRIPTIONS, params, false);
  },
};

export default SubscriptionService;
