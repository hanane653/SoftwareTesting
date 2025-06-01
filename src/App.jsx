import DemandeForm from './components/DemandeForm';
import { BrowserRouter, Routes, Route, replace } from 'react-router-dom';
import React, { useState , useEffect } from 'react'; 
//import { ThemeProvider } from 'styled-components';
import Login from './components/login';
import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import Bibliothéque from './components/Bibliothéque';
import MyPDF from './components/MyPdf';
import { PDFViewer } from '@react-pdf/renderer';
import ArticleDetails from './components/ArticleDetails';
import Tables from './components/Tables';
import { AuthProvider } from './context/AuthContext';
import ChatDirect from './components/ChatDirect';
import About from './components/About';
import ChatbotRag from './components/MyChatbot';
import axios from 'axios';
import MyChatbot from './components/MyChatbot';
import Test from './components/test';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './components/chatbotFiles/config.js';
import MessageParser from './components/chatbotFiles/MessageParser.js'
import ActionProvider from './components/chatbotFiles/ActionProvider.js';
import DashRespo from './components/DashRespo.jsx';
import Footer from './components/Footer.jsx';
import ExcelReader from './components/ExcelReader.jsx';
import ExcelCharts from './components/excel.jsx';
import ResourceDashboard from './components/DashRess.jsx';
import ProtectedRoute from './components/Routes/ProtectedRoute.jsx';
import DemandeDetails from './components/DemandeDetails.jsx';
import  Table  from './components/Table.jsx';
import ResTest from './components/RessourceDash.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import DashRespoDomaine from './components/DashRespoDomaine.jsx';
const Chat = (props) =>
{
  return <div>test component</div>;
};

const ChatAPI = (props) => 
  { const { steps, triggerNextStep } = props; 
  useEffect(() => {
    console.log('Steps dans ChatAPI :',steps);
    console.log('triggerNextStep:',triggerNextStep);
    if(!steps || !triggerNextStep)
    {
      console.error('steps ou triggerNextStep non initialisés');
      return;
    }

    const fetchData = async () => {
      const userMessage = steps.userInput.value;
      console.log('Message envoyé:', userMessage); // Debug

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

        console.log('Réponse complète de l\'API:', response); // Debug complet
        console.log('Données de réponse:', response.data); // Debug données

        // Vérification et traitement de la réponse
       const botResponse = response.data?.answer || response.data?.response || JSON.stringify(response.data);

        console.log('Réponse formatée:', botResponse); // Debug réponse finale

        // Déclencher la prochaine étape avec la réponse
        if(triggerNextStep)
        {
       triggerNextStep({
          
          value: botResponse,
          trigger: 'askAgain'
        });
      }
      else{
        console.error('triggerNextStep is undefined');
      }
      } catch (error) {
        console.error('Erreur détaillée:', error.response || error); // Debug erreur
        if(triggerNextStep)
          {
        triggerNextStep({
        
          value: "Je suis désolé, je n'ai pas pu traiter votre demande. Pouvez-vous réessayer ?",
          trigger: 'askAgain'
        });
        
      }
      else{
        console.error('triggerNextStep is undefined');
      }
    }
    };

    fetchData();
  }, [steps, triggerNextStep]);

  return (
    <div style={{ padding: '10px', fontStyle: 'italic' }}>
      Traitement de votre demande...
    </div>
  );
};

console.log("ChatApi vaut:" ,ChatAPI);
const steps = [
  {
    id: '1',
    message: 'Bonjour, je suis votre assistant QA. Comment puis-je vous aider ?',
    trigger: 'userInput',
  },
  {
    id: 'userInput',
    user: true,
    trigger: 'processing',
  },
  {
    id: 'processing',
    component: <ChatAPI/> ,
    waitAction: true,
    asMessage: true,
    
  },
  {
    id: 'askAgain',
    message: 'Avez-vous une autre question ?',
    trigger: 'userChoice',
  },
  {
    id: 'userChoice',
    options: [
      { value: 1, label: 'Oui', trigger: 'userInput' },
      { value: 2, label: 'Non, merci', trigger: 'end' },
    ],
  },
  {
    id: 'end',
    message: 'Merci d\'avoir utilisé notre assistant ! À bientôt !',
    end: true,
  },
];

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Arial, sans-serif',
  headerBgColor: '#E65100',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#E65100',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

/*const config = {
  floating: true,
  width: "350px",
  height: "500px",
  placeholder: 'Tapez votre message...',
  headerTitle: 'Assistant QA',
  botAvatar: "🤖",
  userAvatar: "👤",
  floatingStyle: {
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
  },
};
*/

const App = () => {
  
  return (
    <BrowserRouter>
      <div>
        <AuthProvider>
        <Navbar/>
        
        
            <div className="chatbot-container">
              <MyChatbot
               />
            </div>
          


                
        <Routes>
          <Route path="/SignIn" element={<Login />} />
          <Route path="/demande" element={<DemandeForm />} />
          <Route path="/dashRespo" element={<DashRespo/>}/>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/biblio" element={<Bibliothéque />} />
          <Route path="/chat" element={<ChatDirect/>}/>
          <Route path="/rag" element={<ChatbotRag/>}/>
          <Route path="/test" element={<Tables/>}/>
          <Route path="/bcklog" element={<ExcelReader/>}/>
          <Route path="/excel" element={<ExcelCharts/>}/>
          <Route path="/article/:slug" element={<ArticleDetails />} />
          <Route path='/dashboard' element={<Test />} />
          <Route path='/table' element={<Table />} />
          <Route path="/demande/:id" element={<DemandeDetails />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/dashRes/:resourceId" element={
              <ProtectedRoute allowedRoles={['RESSOURCE_TESTING']}>
                <ResTest />
              </ProtectedRoute>
            }/>
            <Route path="/dashResDomaine/:domaine" element={
              <ProtectedRoute allowedRoles={['RESPONSABLE_DOMAINE']}>
                <DashRespoDomaine />
              </ProtectedRoute>
            }/>
          <Route
            path="/resource-dashboard/:resourceId"
            element={
              <ProtectedRoute allowedRoles={['RESSOURCE_TESTING']}>
                <ResourceDashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/pdf' element= {<PDFViewer style={{ width: '100%', height: '500px' }}> 
        <MyPDF/>
      </PDFViewer>}></Route>
        </Routes>
        <Footer/>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;