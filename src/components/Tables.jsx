import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import image2 from '../assets/bk-footer.png';
import {
  CDBSidebar, CDBSidebarContent, CDBSidebarFooter,
  CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Tables = () => {
  const [demandes, setDemandes] = useState([]);
  const [ressources, setRessources] = useState([]);
  const [selectedRessources, setSelectedRessources] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8084/api/demandes').then(res => setDemandes(res.data));
    //axios.get('http://localhost:8084/api/ressources').then(res => setRessources(res.data));
  }, []);

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

  return (
    <div className="relative min-h-screen mt-20">
      <div className="flex min-h-screen overflow-auto">
        <div className="w-64 mt-8">
          <CDBSidebar textColor="#fff" backgroundColor="#1e293b">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>Admin Panel</a>
            </CDBSidebarHeader>
            <CDBSidebarContent>
              <CDBSidebarMenu>
                <NavLink exact to="/" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/tables" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">Demandes</CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter style={{ textAlign: 'center' }}>
              <div style={{ padding: '20px 5px' }}>Software Testing / CPS</div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>

        <main className="flex-1 relative p-8">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image2})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "grayscale(20%) brightness(200%)", zIndex: 0 }}></div>
          <div className="relative z-10 flex flex-col gap-8">

            <section className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Statistiques</h3>
              <div className="w-full max-w-lg h-64">
                <Chart type="bar" data={chartData} options={{ maintainAspectRatio: false }} />
                <Chart type="pie" data={chartData2} options={{maintainAspectRatio: false}}/>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h3>
              <ul className="space-y-2">
                {notifications.map(notif => (
                  <li key={notif.id} className={`p-3 rounded ${notif.color}`}>
                    <div className="flex justify-between">
                      <span>{notif.message}</span>
                      <span className="text-xs text-gray-500">{notif.timestamp}</span>
                    </div>
                  </li>
                ))}
                {notifications.length === 0 && <li className="text-gray-500 text-sm">Aucune notification.</li>}
              </ul>
            </section>

            <section className="bg-white rounded-xl shadow p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Liste des Demandes</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="px-6 py-2">Projet</th>
                      <th className=" px-6 border-r">Domaine</th>
                      <th className="px-6 border-r">Sujet Demande</th>
                      <th className=" px-6 border-r">Description</th>
                      <th className="px-6 border-r">Priorité</th>
                      <th className="px-6 border-r">Statut</th>
                      <th className="px-6 border-r">Début planifiée</th>
                      <th className="px-6 border-r">Fin planifiée</th>
                      <th className="px-6 border-r">Ressource</th>
                      <th className="px-6 border-r">Charge Planifiée</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demandes.map((demande, index) => (
                      <tr key={demande.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 border-r py-2">{demande.projet}</td>
                        <td className="px-6 border-r">{demande.domaine}</td>
                        <td className="px-6 border-r">{demande.sujet}</td>
                        <td className="px-6 border-r">{demande.description}</td>
                        <td className="px-6 border-r">{demande.priorite}</td>
                        <td className="px-6 border-r">
                          <select
                            className="border rounded px-2 py-1"
                            value={demande.statut}
                            onChange={e => handleStatusChange(index, e.target.value)}>
                            <option value="EN ATTENTE">EN ATTENTE</option>
                            <option value="TRAITEE">TRAITEE</option>
                            <option value="EN COURS">EN COURS</option>
                            <option value="ARCHIVEE">ARCHIVEE</option>
                          </select>
                        </td>
                        <td className="px-6 border-r text-gray-700">{new Date(demande.dateDebutPlanifiee).toLocaleDateString()}</td>
                        <td className="px-6 border-r">{new Date(demande.dateFinPlanifiee).toLocaleDateString()}</td>
                        <td className="px-6border-r">
                          <select
                            className="border rounded px-2 py-1"
                            value={selectedRessources[demande.id] || ''}
                            onChange={e =>
                              setSelectedRessources({ ...selectedRessources, [demande.id]: e.target.value })
                            }>
                            <option value="">-- Choisir --</option>
                            <option value="Zainab Joual">Zainab JOUAL</option>
                            <option value="Fatima zahra ">Fatima zahra SEBHAOUI</option>
                            <option value="Mohammed HALLOUMI">Mohammed HALLOUMI</option>
                            {ressources.map(res => (
                              <option key={res.id} value={res.id}>{res.nom}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 border-r">{demande.chargePlanifiee}</td>
                        <td>
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            onClick={() => handleAffecter(demande.id)}>
                            Affecter
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tables;
