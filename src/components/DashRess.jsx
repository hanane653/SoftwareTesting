import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ResourceDashboard = () => {
  const navigate = useNavigate();  
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
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
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

        {/* Liste des demandes */}
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
    </div>
  );
};

export default ResourceDashboard;