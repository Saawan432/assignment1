import React, { useState } from 'react';
import LeftScreen from './components/LeftScreen';
import MainScreen from './components/MainScreen';
import data from './assets/Data';

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showMainScreen, setShowMainScreen] = useState(false); // State to manage visibility of MainScreen on mobile

  const handleChatClick = (chat: any) => {
    setSelectedChat(chat);
    setShowMainScreen(true); // Show MainScreen on chat click for mobile view
  };

  const handleBackClick = () => {
    setSelectedChat(null); // Reset selected chat on back click
    setShowMainScreen(false); // Hide MainScreen again after clicking back
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* LeftScreen */}
      <div className="lg:w-2/5">
        <LeftScreen data={data} onChatClick={handleChatClick} />
      </div>

      {/* MainScreen or Back Button */}
      <div className={`lg:w-3/5 ${showMainScreen ? 'block' : 'hidden'}`}>
        {selectedChat && (
          <MainScreen chat={selectedChat} onBack={handleBackClick} />
        )}
      </div>
    </div>
  );
};

export default App;
