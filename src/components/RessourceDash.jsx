//Tables.jsx 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { 
  FaUsers, FaClipboardList, FaTasks, FaChartLine, 
  FaSearch, FaBell, FaUserCircle, FaCog, FaSignOutAlt 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


const ResTest = () => {
  // États
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
   const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [selectedRessources, setSelectedRessources] = useState({});
  const { resourceId } = useParams();
  const { user } = useAuth();
  const [resourceData, setResourceData] = useState(null);
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [occupationData, setOccupationData] = useState(null);


  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        // Vérifier que l'utilisateur accède à son propre dashboard
        if (user.username !== (resourceId)) {
          throw new Error('Accès non autorisé');
        }

        const [resourceResponse, demandesResponse,occupationRes] = await Promise.all([
          axios.get(`http://localhost:8089/auth/id/${resourceId}`),
          axios.get(`http://localhost:8084/api/demandes/affectees?ressourceId=${resourceId}`),
          axios.get(`http://localhost:8084/api/demandes/${resourceId}/occupation`)
      
          
        ]);

        setResourceData(resourceResponse.data);
        setDemandes(demandesResponse.data);
        setOccupationData(occupationRes.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResourceData();
    
  }, [resourceId, user]);
   if (loading) {
    return <div>Chargement...</div>;
  }

  if (!resourceData) {
    return <div>Ressource non trouvée</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 mt-20">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-gray-100 text-gray-800"
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            <SidebarItem
              icon={<FaChartLine />}
              text="Dashboard"
              active={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            />
            <SidebarItem
              icon={<FaClipboardList />}
              text="Demandes"
              active={activeTab === 'demandes'}
              onClick={() => setActiveTab('demandes')}
            />
    
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'demandes' && 'Gestion des Demandes'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
              <NotificationBell notifications={notifications} />
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 overflow-auto h-[calc(100vh-4rem)]">
          {activeTab === 'dashboard' && (
            <DashboardView 
            resourceData={resourceData}
            occupationData={occupationData}
            demandes={demandes}
            />

          )}
          {activeTab === 'demandes' && (
            <DemandesView 
            demandes={demandes}
           
            navigate ={navigate}
            />
          )}
        </main>
      </div>
    </div>
  );
};

// Composants auxiliaires
const SidebarItem = ({ icon, text, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-full transition-colors
                ${active ? 'bg-orange-300 text-orange-600' : 'hover:bg-orange-300'}`}
    onClick={onClick}
  >
    {icon}
    <span>{text}</span>
  </motion.button>
);

const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Rechercher..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const NotificationBell = ({ notifications }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="relative p-2"
  >
    <FaBell className="text-gray-600 text-xl" />
    {notifications.length > 0 && (
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {notifications.length}
      </span>
    )}
  </motion.button>
);

const UserMenu = () => (
  <div className="relative">
    <button className="flex items-center space-x-2">
      <FaUserCircle className="text-2xl text-gray-600" />
      <span className="text-gray-700">RESSOURCE_TESTING</span>
    </button>
  </div>
);

const DashboardView = ({ resourceData,demandes,occupationData }) => (
  <div className="space-y-6">
    <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">
            Bienvenue, {resourceData.username}
          </h1>
          <p className="text-gray-600">{resourceData.role}</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Demandes en cours</h3>
            <p className="text-3xl font-bold text-orange-600">
              {demandes.filter(d => d.statut === 'EN_COURS').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Demandes terminées</h3>
            <p className="text-3xl font-bold text-green-600">
              {demandes.filter(d => d.statut === 'TERMINEE').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Demandes en attente</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {demandes.filter(d => d.statut === 'EN_ATTENTE').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
  <h3 className="text-lg font-semibold mb-2">Taux d'occupation</h3>
  <div className="text-4xl font-bold">
    {occupationData ? `${occupationData.tauxOccupation}%` : "Chargement..."}
  </div>
  <p className={`mt-2 ${occupationData && occupationData.tauxOccupation >= 100 ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
    {occupationData && occupationData.tauxOccupation >= 100 ? "⚠ Ressource saturée" : "Charge équilibrée"}
  </p>
</div>
        </div>
   
  </div>
  </div>
);

const DemandesView = ({ demandes,navigate, handleStatusChange, handleAffecter, selectedRessources, setSelectedRessources,roleUsers }) => (
  
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Mes demandes</h2>
          <div className="space-y-4">
            {demandes.map((demande) => (
              <div
                key={demande.id_Demande}
                
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                onClick={() => navigate(`/demande/${demande.id_Demande}`)}

              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{demande.sujetDemande}</h3>
                    <p className="text-sm text-gray-500">{demande.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      demande.statut === 'TERMINEE'
                        ? 'bg-green-100 text-green-800'
                        : demande.statut === 'EN_COURS'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {demande.statut}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      demande.priorite === 'ELEVEE'
                        ? 'bg-red-100 text-red-800'
                        : demande.priorite === 'MOYENNE'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {demande.priorite}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
);


export default ResTest;
