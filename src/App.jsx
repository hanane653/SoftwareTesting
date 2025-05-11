import DemandeForm from './components/DemandeForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState , useEffect } from 'react'; 
import { ThemeProvider } from 'styled-components';
import Login from './components/login';
import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import ChatBot from 'react-simple-chatbot';
import Bibliothéque from './components/Bibliothéque';
import MyPDF from './components/MyPdf';
import { PDFViewer } from '@react-pdf/renderer';
import ArticleDetails from './components/ArticleDetails';
import Tables from './components/Tables';
import { AuthProvider } from './context/AuthContext';
import ChatDirect from './components/ChatDirect';
import About from './components/About';
import ChatbotRag from './components/chatbot';
import axios from 'axios';



const ChatAPI = ({ steps, triggerNextStep }) => {
  useEffect(() => {
    const fetchData = async () => {
      const userMessage = steps.userInput.value;

      try {
        const response = await axios.post(
          'https://fictional-broccoli-g944v47xg6929x5x-5000.app.github.dev/ask',
          { question: userMessage },
          {
            headers: {
              'X-Github-Token': 'ghu_U2Q2Ps9TF5EGh1IVtEA7TFy4pew35s3BgQTZ',
              'Content-Type': 'application/json',
            },
          }
        );

        triggerNextStep({ value: response.data.reply, trigger: '3' });
      } catch (error) {
        triggerNextStep({
          value: 'Erreur lors de l’appel API.',
          trigger: '3',
        });
      }
    };

    fetchData();
  }, [steps, triggerNextStep]);

  return <div>Merci pour votre message...</div>;
};

const steps = [
  {
    id: '1',
    message: 'Bonjour, comment puis-je vous aider ?',
    trigger: 'userInput',
  },
  {
    id: 'userInput',
    user: true,
    trigger: 'fetchResponse',
  },
  {
    id: 'fetchResponse',
    component: <ChatAPI />,
    waitAction: true,
  },
  {
    id: '3',
    message: '{previousValue}',
    end: true,
  },
];




// Creating our own theme
const theme = {    
  background: '#FFFBF0', 
  headerBgColor: '#E65100', 
  headerFontSize: '22px',
  botBubbleColor: '#E65100', 
  headerFontColor: 'white',
  botFontColor: 'white', 
  userBubbleColor: '#FFCC80', 
  userFontColor: '#212121', 
};


// Set some properties of the bot
const config = {

  
  floating: true,

};

const App = () => {
  
  return (
    <BrowserRouter>
      <div>
        <AuthProvider>
        <Navbar/>
        <ThemeProvider theme={theme}>
            <ChatBot
              steps={steps}
              {...config}
            />
          </ThemeProvider>

                
        <Routes>
          <Route path="/SignIn" element={<Login />} />
          <Route path="/demande" element={<DemandeForm />} />
          <Route path="/" element={<Navbar />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/biblio" element={<Bibliothéque />} />
          <Route path="/chat" element={<ChatDirect/>}/>
          <Route path="/rag" element={<ChatbotRag/>}/>
          <Route path="/article/:slug" element={<ArticleDetails />} />
          <Route path='/dashboard' element={<Tables />} />
          <Route path='/pdf' element= {<PDFViewer style={{ width: '100%', height: '500px' }}>

          
        <MyPDF/>
      </PDFViewer>}></Route>
        </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;