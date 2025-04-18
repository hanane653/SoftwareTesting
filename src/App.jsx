import DemandeForm from './components/DemandeForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress, 
} from "@material-tailwind/react";

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

const steps = [
  {
      id: '0',
      message: 'Salut!',

      trigger: '1',
  }, {
      id: '1',

      message: 'Comment je peux vous aider?',
      trigger: '2'
  }, {
      id: '2',

   
      user: true,
      trigger: '3',
  }, {
      id: '3',
      message: " hi {previousValue}, how can I help you?",
      trigger: 4
  }, {
      id: '4',
      options: [

          { value: 1, label: 'Avoir des informations générales sur le testing ' },
          { value: 2, label: 'Comment utiliser le portail' },

      ],
      end: true         
  }
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
        <Navbar/>
        <ThemeProvider theme={theme}> <ChatBot steps={steps} { ...config} /> </ThemeProvider>
                
        <Routes>
          <Route path="/SignIn" element={<Login />} />
          <Route path="/demande" element={<DemandeForm />} />
          <Route path="/" element={<Navbar />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/biblio" element={<Bibliothéque />} />
          <Route path="/article/:slug" element={<ArticleDetails />} />
          <Route path='/dashboard' element={<Tables />} />
          <Route path='/chatbot' element={ <ThemeProvider theme={theme}> <ChatBot steps={steps} { ...config} /> </ThemeProvider>} />
          <Route path='/pdf' element= {<PDFViewer style={{ width: '100%', height: '500px' }}>
          
        <MyPDF/>
      </PDFViewer>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
