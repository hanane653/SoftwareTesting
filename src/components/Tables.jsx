import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DemandeForm from './DemandeForm';

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
      <aside className="w-64 bg-orange-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:text-gray-200">Demandes</a>
          <a href="#" className="hover:text-gray-200">Notifications</a>
        </nav>
      </aside>

      <main className="flex-1 p-8 space-y-8">
       

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
