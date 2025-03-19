
import DemandeForm from './components/DemandeForm';
import SignUp from './components/signUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';




const App = () => {

  return (
  <Router>  
<div>
  <Routes>
  <Route path="/SighUp" element={<SignUp />} />
    

  <Route path="/creerDemande" element={<DemandeForm />} />
  </Routes>
</div> 

</Router>      
     
  );
};

export default App;
