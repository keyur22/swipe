export interface Message {
  senderId: string;
  receiverId: string;
  content: string;
}

export interface MessagesResponse {
  messages: Message[];
}
