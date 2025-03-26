export interface Conversation {
  sender_id: string;
  receiver_id: string;
}

export interface CreateConversation {
    members :[string, string]
}
  