import React, { useState } from 'react';
import { attachmentIcon, voiceIcon, sendIcon } from "../assets/Icon";
import { User, ChatMessage } from "../assets/interfaces";

interface Props {
  chat: User;
}

const MainScreen: React.FC<Props> = ({ chat }) => {
  console.log(chat,"0o0o0o0o0o0oo123")
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newChatMessage: ChatMessage = {
        you: {
          message: newMessage,
          timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };
      chat.chat.push(newChatMessage); // Add your message to the chat object
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen p-2">
      <div className="flex items-center p-3 bg-gray-100 shadow-md">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src={chat.profilePictureURL}
            className="h-full w-full object-cover"
            alt={chat.name}
          />
        </div>
        <div className="ml-3 flex-grow">
          <h2 className="text-lg font-semibold">{chat.name}</h2>
          <span className="text-sm text-gray-600">Click here for contact info</span>
        </div>
        <div className="flex gap-3">
          {/* Add your icons here */}
        </div>
      </div>

    
       <div className="flex flex-col flex-grow p-4 bg-gray-50 overflow-y-auto">
      {chat.chat.map((msg:any, index:any) => {
        const userMessage = msg[chat.userId];
        const youMessage = msg.you;

       
        const renderUserMessage = () => (
          <div className="flex justify-start mb-2">
            <div className="rounded-lg p-2 max-w-xs bg-white text-left">
              <p className="text-sm">{userMessage.message}</p>
              <span className="text-xs text-gray-500 block mt-1">{userMessage.timeStamp}</span>
            </div>
          </div>
        );

    
        const renderYouMessage = () => (
          <div className="flex justify-end mb-2">
            <div className="rounded-lg p-2 max-w-xs bg-green-100 text-right">
              <p className="text-sm">{youMessage.message}</p>
              <span className="text-xs text-gray-500 block mt-1">{youMessage.timeStamp}</span>
            </div>
          </div>
        );

        return (
          <React.Fragment key={index}>
            {userMessage && renderUserMessage()}
            {youMessage && renderYouMessage()}
          </React.Fragment>
        );
      })}
    </div>

      {/* Message Input */}
      <div className="flex items-center p-3 bg-gray-100">
        <button className="p-2">{attachmentIcon}</button>
        <button className="p-2">{voiceIcon}</button>
        <div className="relative flex-grow mx-2">
          <input
            type="text"
            className="w-full p-2 border rounded-full"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="absolute right-0 top-0 bottom-0 p-2" onClick={handleSendMessage}>{sendIcon}</button>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
