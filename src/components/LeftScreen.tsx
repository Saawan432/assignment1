import React, { useState } from 'react';
import { backIcon, threeDotsIcon } from "../assets/Icon";
import { User } from "../assets/interfaces";

interface Props {
  data: User[];
  onChatClick: (user: User) => void;
}

const LeftScreen: React.FC<Props> = ({ data, onChatClick }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [chats, setChats] = useState<User[]>(data);

  const toggleDropdown = (userId: string) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  const handleOptionClick = (option: string, userId: string) => {
    console.log(`Option: ${option} clicked for user: ${userId}`);
  
    if (option === 'Delete') {

      const updatedChats = chats.filter((user:any) => {user.userId !== userId});
      console.log(updatedChats,"updatedChats",chats)
      setChats(updatedChats);
    }
  
    setOpenDropdown(null); 
  };
  

  const handleChatItemClick = (item: User) => {
    onChatClick(item);
    const updatedChats = chats.map(user =>
      user.userId === item.userId ? { ...user, unreadCount: 0 } : user
    );
    setChats(updatedChats);
  };

  return (
    <>
      <div className="flex gap-3 mt-3 m-2">
        <span className="mt-1">{backIcon}</span>
        <span className="font-normal text-black">Chats</span>
      </div>
      
      {chats.map((item: User, index: number) => {
        const latestChat = item.chat[item.chat.length - 1];

        return (
          <div key={index}
            className="flex gap-3 mt-3 m-2 items-center"
            onClick={() => handleChatItemClick(item)} // Handle chat item click
          >
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img
                src={item.profilePictureURL}
                className="h-full w-full object-cover"
                alt={item.name}
              />
            </div>
            <div className="flex-grow flex flex-col">
              <span className="font-semibold">{item.name}</span>
              <div className="text-gray-600 text-sm">
                {latestChat.user1 ? latestChat.user1.message : latestChat.user2 ? latestChat.user2.message : latestChat.you.message}
              </div>
            </div>
            <span className="text-gray-500 text-sm">
              {latestChat.user1 ? latestChat.user1.timeStamp : latestChat.user2 ? latestChat.user2.timeStamp : latestChat.you.timeStamp}
            </span>
            {item.unreadCount > 0 && (
              <div className="ml-2 mt-1">
                <span className="bg-green-500 rounded-full px-2 py-1 text-xs text-white">{item.unreadCount}</span>
              </div>
            )}
            <div className="relative">
              <button onClick={() => toggleDropdown(item.userId)}>
                {threeDotsIcon}
              </button>
              {openDropdown === item.userId && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                  <ul className="py-1">
                    <li
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick('Mark as Read', item.userId)}
                    >
                      Mark as Read
                    </li>
                    <li
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Cancel
                    </li>
                    <li
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick('Delete', item.userId)}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LeftScreen;
