export interface Message {
  _id?: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: Date;
}

export interface MessageSearchParams {
  receiver_id: string;
  content?: string;
}
export interface ConversationSearchParams {
  receiver_id: string;
  sender_id: string;
}