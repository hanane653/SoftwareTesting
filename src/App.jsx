
import DemandeForm from './components/DemandeForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './components/login';




const App = () => {

  return (
  <Router>  
<div>
  <Routes>
  <Route path="/SignIn" element={<Login />} />
    

  <Route path="/creerDemande" element={<DemandeForm />} />
  </Routes>
</div> 

</Router>      
     
  );
};

export default App;
