export interface Message {
    message: string;
    timeStamp: string;
  }
  
  export interface ChatMessage {
    user1?: { message: string; timeStamp: string };
    user2?: { message: string; timeStamp: string };
    you: { message: string; timeStamp: string };
  }
 export interface User {
    userId: string;
    name: string;
    unreadCount: number;
    profilePictureURL: string;
    chat: ChatMessage[] | any;
  }