import React, { useState } from "react"; 
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

import config from "./chatbotFiles/config";
import MessageParser from "./chatbotFiles/MessageParser";
import ActionProvider from "./chatbotFiles/ActionProvider";

const MyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition"
      >
        🗨️
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-50 w-auto max-h-[500px] shadow-lg border rounded-lg overflow-hidden">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
}

export default MyChatbot;

