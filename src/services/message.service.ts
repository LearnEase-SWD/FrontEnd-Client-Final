// import { MESSAGE_API } from "../constants/api/message";
// import { ApiResponse, ApiResponseData } from "../models/ApiReponse.model";
// import {
//   ConversationSearchParams,
//   Message,
//   MessageSearchParams,
// } from "../models/Message.model";
// import { getRequestMessage, postRequest } from "./httpsMethod";

// const MESSAGE_SERVICE = {
//   sendMessages(
//     params: ConversationSearchParams
//   ): Promise<ApiResponseData<ApiResponse<Message>>> {
//     return postRequest(MESSAGE_API.GET_MESSAGES, params);
//   },
//   // getMessages(params: ConversationSearchParams): Promise<Message[]> {
//   //   return getRequestMessage(
//   //     ${MESSAGE_API.GET_MESSAGES}?receiver_id:${params.receiver_id}&sender_id:${params.sender_id}
//   //   );
//   // },
// };
// export default MESSAGE_SERVICE;