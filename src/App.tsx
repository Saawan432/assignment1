
import  { useState } from 'react';
import data from './assets/Data';
import LeftScreen from './components/LeftScreen';
import MainScreen from './components/MainScreen';
const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatClick = (chat:any) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex">
      <div className="w-full lg:w-1/3">
        <LeftScreen data={data} onChatClick={handleChatClick} />
      </div>
      <div className="hidden lg:block w-2/3">
        {selectedChat && <MainScreen chat={selectedChat} />}
      </div>
    </div>
  );
};

export default App;
