import { CONVERSATION_API } from "../constants/api/conversation";
// import {
//   ApiResponse,
//   ApiResponseData,
//   ApiResponseMessage,
// } from "../models/ApiReponse.model";
import { CreateConversation } from "../models/Conversation.model";
// import { Message } from "../models/Message.model";
import { getRequest, postRequest } from "./httpsMethod";

const CONVERSATION_SERVICE = {
  create_conversation(
    params: CreateConversation
  )
//   : Promise<[ApiResponseData<ApiResponse<Message>>]>
   {
    return postRequest(CONVERSATION_API.CREATE_CONVERSATION, params);
  },
  get_conversation(
    params : string
  )
//   : Promise<ApiResponseData<ApiResponseMessage>>
    {
    return getRequest(`${CONVERSATION_API.GET_CONVERSATION_LIST}/${params}`);
  },
};
export default CONVERSATION_SERVICE;
