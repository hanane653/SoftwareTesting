import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
    botName: "QA Assistant",
  initialMessages: [createChatBotMessage(`Bonjour, je suis votre assistant QA. Comment puis-je vous aider ?`)],
  customStyles: {
    botMessageBox:{
        backgroundColor: '#E65100'
    },
    chatButton:{
        backgroundColor:'#E65100'
    },
    

  },
};

export default config;