//Tables.jsx 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import * as XLSX from "xlsx";
import { 
  FaUsers, FaClipboardList, FaTasks, FaChartLine, 
  FaSearch, FaBell, FaUserCircle, FaCog, FaSignOutAlt 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import DemandeForm from './DemandeForm';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
const DashRespoDomaine = () => {
  // États
  const [activeTab, setActiveTab] = useState('dashboard');
  const [fichier, setFichier] = useState(null);
  const { domaine } = useParams();
  const [demandes, setDemandes] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [selectedRessources, setSelectedRessources] = useState({});
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDemandes: 0,
    demandesEnCours: 0,
    demandesTerminees: 0,
    totalUsers: 0
  });
  const [data, setData] = useState([]);

  
  // Chargement des données
  useEffect(() => {
    const fetchData = async () => {
      try {
         // Vérifier que l'utilisateur accède à son propre dashboard
        if (user.domaine !== (domaine)) {
          throw new Error('Accès non autorisé');
        }
        const [demandesRes] = await Promise.all([

          axios.get(`http://localhost:8084/api/demandes/domaine?domaine=${domaine}`)
        ]);

        setDemandes(demandesRes.data);
       
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, []);
const [formData, setFormData] = useState({
    
    piecesJointes: [],
  });
  // Données mockées pour les utilisateurs
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    // Ajoutez plus d'utilisateurs si nécessaire
  ];

  // Mise à jour des statistiques
  const updateStats = (demandes, users) => {
    setStats({
      totalDemandes: demandes.length,
      demandesEnCours: demandes.filter(d => d.statut === 'EN COURS').length,
      demandesTerminees: demandes.filter(d => d.statut === 'TRAITEE').length,
      totalUsers: users.length
    });
  };

  // Filtrage des demandes
  const filteredDemandes = demandes.filter(demande => 
    demande.description.toLowerCase().includes(searchTerm.toLowerCase()) 
    //demande.sujet.includes(searchTerm.toLowerCase())
  );
  const addNotification = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const color = type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
    const notif = { id: Date.now(), message, timestamp, color };
    setNotifications(prev => [notif, ...prev]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== notif.id)), 15000);
  };

  const handleStatusChange = (index, newStatus) => {
      setDemandes(prev => prev.map((d, i) => i === index ? { ...d, statut: newStatus } : d));
      addNotification(`Statut modifié en ${newStatus}`, 'info');
    };
  
    const handleAffecter = (demandeId) => {
      const ressourceId = selectedRessources[demandeId];
      if (!ressourceId) return;
      axios.post(`http://localhost:8084/api/demandes/${demandeId}/affecter?ressourceId=${ressourceId}`)
        .then(() => addNotification('Demande affectée avec succès', 'success'))
        .catch(() => addNotification("Erreur lors de l'affectation", 'error'));
    };
    //fonction pour joindre le backlog
  const handleAddFichier = (e)  => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Nom de la première feuille
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet); // Convertir en JSON
      setData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  

  const TypeCounts = {};
  demandes.forEach(d =>{
    const type = d.sujet || 'Inconnu';
    TypeCounts[type] = (TypeCounts[type] || 0) + 1;
  });
  
  const chartData2 = {
    labels : Object.keys(TypeCounts),
    datasets: [{
      label: 'Nombre de demandes par sujet',
      data: Object.values(TypeCounts),
      backgroundColor: 'rgba(228, 112, 3, 0.5)'

    }

    ]
  }

  const statusCounts = {};
  demandes.forEach(d => {
    const stat = d.statut || 'Inconnu';
    statusCounts[stat] = (statusCounts[stat] || 0) + 1;
  });


  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [{
      label: 'Nombre de demandes',
      data: Object.values(statusCounts),
      backgroundColor: 'rgba(75,192,192,0.6)'
    }]
  };
  
  // fonction pour joindre le backlog
  const handleFileUploader = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Nom de la première feuille
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet); // Convertir en JSON
      setData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  

  return (
    <div className="flex h-screen bg-gray-100 mt-20">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-gray-900 text-white"
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-8">Responsable de pole Panel</h2>
          <nav className="space-y-2">
            <SidebarItem
              icon={<FaChartLine />}
              text="Dashboard"
              active={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            />
            <SidebarItem
              icon={<FaClipboardList />}
              text="Demandes soumises"
              active={activeTab === 'demandes'}
              onClick={() => setActiveTab('demandes')}
            />
            <SidebarItem
              icon={<FaTasks />}
              text="Nouvelle Demande"
              active={activeTab === 'newDemande'}
              onClick={() => setActiveTab('newDemande')}
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
                {activeTab === 'newDemande' && 'Formulaire de création de demande'}
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
            <DashboardView stats={stats} chartData={chartData} chartData2={chartData2} />
          )}
          
          {activeTab === 'demandes' && (
            <DemandesView 
              demandes={filteredDemandes}
              handleStatusChange={handleStatusChange}
              handleAffecter={handleAffecter}
              selectedRessources={selectedRessources}
              setSelectedRessources={setSelectedRessources}
            />
          )}
          
          {activeTab === 'newDemande' && (
            <DemandeForm />
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
    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors
                ${active ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
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
      <span className="text-gray-700">Responsable Pole</span>
    </button>
  </div>
);

const DashboardView = ({ stats, chartData, chartData2 }) => (
  <div className="space-y-6">
    {/* Statistiques */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Demandes soumises"
        value={stats.totalDemandes}
        icon={<FaClipboardList />}
        color="blue"
      />
      <StatCard
        title="En Cours"
        value={stats.demandesEnCours}
        icon={<FaTasks />}
        color="yellow"
      />
      <StatCard
        title="Terminées"
        value={stats.demandesTerminees}
        icon={<FaChartLine />}
        color="green"
      />
      <StatCard
        title="Utilisateurs"
        value={stats.totalUsers}
        icon={<FaUsers />}
        color="purple"
      />
    </div>

    {/* Graphiques */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="Statut des Demandes" chart={<Chart type="bar" data={chartData} />} />
      <ChartCard title="Répartition par Type" chart={<Chart type="pie" data={chartData2} />} />
    </div>
  </div>
);

const DemandesView = ({ demandes, handleAddFichier,handleStatusChange, handleAffecter, selectedRessources, setSelectedRessources }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* En-tête du tableau */}
        <thead className="bg-gray-50">
        <tr>
                      <th className="px-6 py-2">Projet</th>
                      <th className=" px-6 border-r">Domaine</th>
                      <th className="px-6 border-r">Sujet Demande</th>
                      <th className=" px-6 border-r">Description</th>
                      <th className="px-6 border-r">Priorité</th>
                      <th className="px-6 border-r">Statut</th>
                      <th className="px-6 border-r">Début planifiée</th>
                      <th className="px-6 border-r">Fin planifiée</th>
                      <th className="px-6 border-r">Charge Planifiée</th>
                      <th className='px-6 py-2'>Backlog</th>
                      
          </tr>
        </thead>
        {/* Corps du tableau */}
        <tbody className="bg-white divide-y divide-gray-200">
          {demandes.map((demande, index) => (
            <tr key={demande.id} className="hover:bg-gray-50">
              <td className="px-6 border-r py-2">{demande.nomProjet}</td>
                        <td className="px-6 border-r">{demande.nomDomaine}</td>
                        <td className="px-6 border-r">{demande.sujetDemande}</td>
                        <td className="px-6 border-r">{demande.description}</td>
                        <td className="px-6 border-r">{demande.priorite}</td>
                        <td className="px-6 border-r">{demande.statut}</td>
                        <td className="px-6 border-r text-gray-700">{new Date(demande.dateDebutPlanifiee).toLocaleDateString()}</td>
                        <td className="px-6 border-r">{new Date(demande.dateFinPlanifiee).toLocaleDateString()}</td>
                        <td className="px-6 border-r">{demande.chargePlanifiee}</td>
                        

                        
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);



const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`bg-white p-6 rounded-lg shadow-sm border-l-4 border-${color}-500`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
      <div className={`text-${color}-500 text-2xl`}>{icon}</div>
    </div>
  </motion.div>
);

const ChartCard = ({ title, chart }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    {chart}
  </div>
);

export default DashRespoDomaine;
