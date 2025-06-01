import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DemandeDetails = () => {
  const { id } = useParams();
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [historique, setHistorique] = useState([]);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();  
    
const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const demandeRes = await axios.get(`http://localhost:8084/api/demandes/${id}`);
        const historiqueRes = await axios.get(`http://localhost:8084/api/demandes/${id}/historique`);
        setDemande(demandeRes.data);
        setHistorique(historiqueRes.data);
        setNewStatus(demandeRes.data.statut);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleStatusChange = async () => {
    setUpdating(true);
    try {
      await axios.put(`http://localhost:8084/api/demandes/${id}/status`, { statut: newStatus });
      setDemande(prev => ({ ...prev, statut: newStatus }));
    } catch (error) {
      console.error("Erreur mise à jour:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-10">Chargement...</div>;
  if (!demande) return <div className="text-center py-10">Demande introuvable.</div>;

  const statutData = [
    { name: 'En attente', value: 10 },
    { name: 'En cours', value: 15 },
    { name: 'Terminée', value: 5 },
    { name: 'Archivée', value: 2 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        
        {/* En-tête */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-4xl font-bold text-gray-800">{demande.nomProjet}</h1>
          <p className="text-gray-600">{demande.description}</p>
        </div>

        {/* Statut et dates */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <span className="text-gray-500">Statut :</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${demande.statut === 'EN_COURS' ? 'bg-blue-100 text-blue-600' : demande.statut === 'TERMINEE' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
              {demande.statut}
            </span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <span className="text-gray-500">Période :</span>
            <span className="text-gray-700 font-semibold"> {new Date(demande.dateDebutPlanifiee).toLocaleDateString()} - {new Date(demande.dateFinPlanifiee).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Modification du statut */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Modifier le statut</label>
          <select 
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="block w-full mt-2 border border-gray-300 rounded-md p-2"
          >
            <option value="EN_ATTENTE">En attente</option>
            <option value="EN_COURS">En cours</option>
            <option value="TERMINEE">Terminée</option>
            <option value="ARCHIVEE">Archivée</option>
          </select>
          <button 
            onClick={handleStatusChange} 
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-300 ease-in-out"
            disabled={updating}
          >
            {updating ? "Mise à jour..." : "Mettre à jour le statut"}
          </button>
        </div>

        {/* Graphique des statuts */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Statistiques des demandes</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statutData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Historique des modifications */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Historique des modifications</h2>
          <div className="border-l-4 border-gray-300 pl-4 space-y-4">
            {historique.map((item, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-md shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
                  <p className="text-gray-700">{item.modificationDescription}</p>
                </div>
                <span className="text-xs font-semibold bg-blue-200 text-blue-800 px-2 py-1 rounded-md">
                  Modification
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer avec options */}
        <div className="mt-10 text-center">
          <button className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition-all"
                onClick={() => navigate(`/resource-dashboard/${user.username}`)}>
            Retour au tableau de bord
          </button>
        </div>

      </div>
    </div>
  );
};

export default DemandeDetails;
