import React from 'react';
import '../chatbotIcon.css';
const ChatbotIcon = () => {
    return (
      <div className="chatbot-icon">
        <div className="chatbot-head">
          <div className="chatbot-eyes">
            <div className="eye left-eye"></div>
            <div className="eye right-eye"></div>
          </div>
          <div className="chatbot-mouth"></div>
        </div>
        <div className="chatbot-body"></div>
      </div>
    );
  };
  
  export default ChatbotIcon;