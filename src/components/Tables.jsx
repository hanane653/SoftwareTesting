import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DemandeForm from './DemandeForm';
import image2 from '../assets/bk-footer.png';
import { FaHome } from 'react-icons/fa';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
const services = [
  {
     icon : FaHome,
     Titre : "Dashboard"
  }
];
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Steps taken per day',
    },
  },
};
const Tables = () => {
  const [demandes, setDemandes] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8084/api/demandes')
      .then((res) => setDemandes(res.data))
      .catch((err) => console.error('Erreur API :', err));
  }, []);

  const addNotification = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString(); 
    const color = type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
    const notif = { id: Date.now(), message, timestamp, color };
    setNotifications((prev) => [notif, ...prev]);

    // Auto-dismiss après 6s 
    setTimeout(() => {
      setNotifications((prev) => prev.filter(n => n.id !== notif.id));
    }, 6000);
  };

  const handleDemandeCree = (nouvelleDemande) => {
    setDemandes((prev) => [...prev, nouvelleDemande]);
    addNotification(`Nouvelle demande "${nouvelleDemande.titre}" ajoutée avec succès.`);
  };

  const getStatusBadgeColor = (statut) => {
    switch (statut) {
      case 'En cours': return 'bg-yellow-100 text-yellow-800';
      case 'Terminé': return 'bg-green-100 text-green-800';
      case 'Rejeté': return 'bg-red-100 text-red-800';
      case 'En attente': return 'bg-gray-100 text-gray-800';
      default: return 'bg-[#F4A300] text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mt-20">
    
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', marginTop:'20px' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
    
      <main className="flex-1 p-8 space-y-8 ">
       <section className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Statistiques</h3>
       </section>
      
        <section className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Notifications</h3>
          <ul className="space-y-2">
            {notifications.map((notif) => (
              <li key={notif.id} className={`p-3 rounded ${notif.color}`}>
                <div className="flex justify-between">
                  <span>{notif.message}</span>
                  <span className="text-xs">{notif.timestamp}</span>
                </div>
              </li>
            ))}
            {notifications.length === 0 && (
              <li className="text-gray-500 text-sm">Aucune notification pour le moment.</li>
            )}
          </ul>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-6">Liste des Demandes</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Titre</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Priorité</th>
                  <th className="px-4 py-2 text-left">Statut</th>
                  <th className="px-4 py-2 text-left">Début</th>
                  <th className="px-4 py-2 text-left">Fin</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map((demande, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{demande.titre}</td>
                    <td className="px-4 py-2">{demande.type}</td>
                    <td className="px-4 py-2">{demande.priorite}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(demande.statut)}`}>
                        {demande.statut}
                      </span>
                    </td>
                    <td className="px-4 py-2">{demande.dateDebutTraitement}</td>
                    <td className="px-4 py-2">{demande.dateFinTraitement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Tables;
