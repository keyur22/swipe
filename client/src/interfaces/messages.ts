export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
}

export interface MessagesResponse {
  messages: Message[];
}
