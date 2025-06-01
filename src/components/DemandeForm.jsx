import React, { useState } from 'react';
import image from '../assets/attijari.jpg';
import image2 from "../assets/bk-footer.png";
import { useNavigate } from "react-router-dom";

const DemandeForm = ({ onDemandeCree }) => {
  const [formData, setFormData] = useState({
    projet: '',
    domaine: '',
    description: '',
    sujet: '',
    priorite: '',
    statut: 'En attente',
    dateDebutPlanifiee: '', 
    dateFinPlanifiee: '',
    chargePlanifiee:'',
    piecesJointes: [],
  });

  const [fichier, setFichier] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFormData((prev) => ({
        ...prev,
        piecesJointes: [...prev.piecesJointes, selectedFile],
      }));
      setFichier(null);
    }
  };
  
  const handleAddFichier = () => {
    if (fichier) {
      setFormData((prev) => ({
        ...prev,
        piecesJointes: [...prev.piecesJointes, fichier],
      }));
      setFichier(null);
    } else {
      console.log("Aucun fichier sélectionné !");
    }
  };

  const onDateFocus = (e) => (e.target.type = "datetime-local");
  const onDateBlur = (e) => (e.target.type = "text");

  const handleRemoveFichier = (index) => {
    const updatedFiles = [...formData.piecesJointes];
    updatedFiles.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      piecesJointes: updatedFiles,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

      const username = localStorage.getItem('username');
    if (!username) {
        throw new Error('User not authenticated');
    }

    const dataToSend = new FormData();
    dataToSend.append('projet', formData.projet);
    dataToSend.append('domaine',formData.domaine)
    dataToSend.append('description', formData.description);
    dataToSend.append('sujet', formData.sujet);
    dataToSend.append('priorite', formData.priorite);
    dataToSend.append('dateDebutPlanifiee', formData.dateDebutPlanifiee);
    dataToSend.append('dateFinPlanifiee', formData.dateFinPlanifiee);
    dataToSend.append('chargePlanifiee' , formData.chargePlanifiee); 

    if (formData.piecesJointes.length > 0) {
      formData.piecesJointes.forEach((file) => {
        dataToSend.append('piecesJointes', file);
      });
    }
        
    try {
      const response = await fetch('http://localhost:8084/api/demandes', {

        method: 'POST',
         headers: {
                'X-User-Id': username
            },
        body: dataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur HTTP ${response.status}: ${errorText}`);
        setError("Erreur lors de l'envoi de la demande.");
      } else {
        const created = await response.json();
        console.log("Demande envoyée avec succès!");
        setSuccessMessage("Votre demande a été envoyée avec succès !");
        onDemandeCree?.(created);
        setFormData({
          projet: '',
          domaine: '',
          description: '',
          sujet: '',
          priorite: '',
          statut: '',
          dateDebutPlanifiee: '',
          dateFinPlanifiee: '',
          chargePlanifiee: ''  ,
          piecesJointes: [],
        });
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } catch (error) {
      console.error('Erreur de réseau ou de serveur:', error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen relative mt-16">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center filter grayscale brightness-200"
        style={{
          backgroundImage: `url(${image2})`,
          zIndex: 0,
        }}
      ></div>

      {/* Alerte de succès flottante */}
      {successMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded shadow-lg z-50">
          {successMessage}
          <button
            onClick={() => setSuccessMessage("")}
            className="ml-4 text-white font-bold hover:text-gray-100"
          >
            &times;
          </button>
        </div>
      )}

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen"
        style={{ fontFamily: `'Times New Roman', Times, serif` }}>
        <div className="bg-white bg-opacity-95 shadow-lg p-10 w-full rounded-none display-flex">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Bienvenue</h2>
          <h3 className="text-xl text-center text-gray-800 mb-6">
            Veuillez soumettre votre demande 
          </h3>

          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <input type="text" name="projet" value={formData.projet} onChange={handleChange} placeholder="Nom du projet"
              className="flex-1 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />
            <select name="domaine" value={formData.domaine} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required>
              <option value="">Nom du domaine</option>
              <option value="Cash_Management">Cash Management</option>
              <option value="Engagement_Transformation_Credit">Engagement & Transformation crédit</option>
              <option value="Compliance">Compliance</option>
              <option value="DATALAKE">Datalake</option>
              <option value="Finance_Compta">Finance et Comptabilité</option>
              <option value="Risque_Reglementaire">Risque réglementaire</option>
              <option value="SWIFT">SWIFT</option>
              <option value="Trade_Finance">Trade Finance</option>
              <option value="Distribution">Distribution</option>
              <option value="Self_Care">Self Care</option>
            </select>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"
              className="flex-1 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />

            <select name="sujet" value={formData.sujet} onChange={handleChange}
              className="flex-1 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required>
              <option value="">Sujet de la demande</option>
              <option value="HOMOLOGATION">HOMOLOGATION</option>
              <option value="qualification_fonctionnelle">QUALIFICATION FONCTIONNELLE</option>
              <option value="Formation_Test">Demande de Formation TESTING</option>
              <option value="AUTOMATISATION">AUTOMATISATION</option>
              <option value="lancement_TNRs">Lancement des TNRs</option>
              <option value="jeux_donnees">Préparation des jeux de données</option>
            </select>

            <select name="priorite" value={formData.priorite} onChange={handleChange}
              className="flex-1 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required>
              <option value="">Priorité</option>
              <option value="ELEVEE">ÉLEVÉE</option>
              <option value="MOYENNE">MOYENNE</option>
              <option value="FAIBLE">FAIBLE</option>
            
            </select>
           {  /* <input type="number" name="nombreRessources" value={formData.NombreRessources} onChange={handleChange} placeholder='Nombre de ressources' className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic' style={{ fontFamily: `'Times New Roman', Times, serif` }} /> */ }
              
           <input type="text" name="chargePlanifiee" value={formData.chargePlanifiee} onChange={handleChange} placeholder="Charge Planifiée"
              className="flex-2 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />
            <input type="text" name="dateDebutPlanifiee" value={formData.dateDebutPlanifiee}
              onChange={handleChange} onFocus={onDateFocus} onBlur={onDateBlur}
              placeholder="Date de début planifiée"
              className="flex-2 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />
            
          {/* <input type="text" name="dateFinPlanifiée" value={formData.dateFinPlanifiee}
              onChange={handleChange} onFocus={onDateFocus} onBlur={onDateBlur}
              placeholder="Date de fin planifiee"
              className="flex-2 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }}  />*/} 
           
<input type="file" name="file" onChange={handleFileChange}

  className="flex-2 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
  style={{ fontFamily: `'Times New Roman', Times, serif` }} />
    

            {formData.piecesJointes.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium text-sm text-gray-700">Fichiers joints :</p>
                {formData.piecesJointes.map((file, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md text-sm">
                    <span>{file.name}</span>
                    <button type="button" onClick={() => handleRemoveFichier(index)}
                      className="text-red-500 hover:underline text-xs">Supprimer</button>
                  </div>
                ))}
              </div>
            )}
               
            
          </form>
          <div className="flex justify-center">
              <button type="submit"
                onClick={handleSubmit}
                className="w-40 text-white py-2 font-bold transition duration-200 rounded-full mt-4"
                style={{
                  backgroundColor: "#E65100",
                  fontFamily: `'Times New Roman', Times, serif`,
                  fontSize: "0.875rem",
                }}
                disabled={loading}>
                   
                {loading ? "Chargement..." : "Ajouter la demande"}
               
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DemandeForm;
