import React, { useState } from 'react';
import image from '../assets/attijari.jpg';
import image2 from "../assets/bk-footer.png";
import { useNavigate } from "react-router-dom";

const DemandeForm = ({ onDemandeCree }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type: '',
    priorite: '',
    statut: 'En attente',
    dateDebutTraitement: '', 
    dateFinTraitment: '',
    NombreRessources :'',
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

    const dataToSend = new FormData();
    dataToSend.append('titre', formData.titre);
    dataToSend.append('description', formData.description);
    dataToSend.append('type', formData.type);
    dataToSend.append('priorite', formData.priorite);
    dataToSend.append('nombreRessources',formData.NombreRessources)
    dataToSend.append('dateDebutTraitement', formData.dateDebutTraitement);
    dataToSend.append('dateFinTraitement', formData.dateFinTraitment);

    if (formData.piecesJointes.length > 0) {
      formData.piecesJointes.forEach((file) => {
        dataToSend.append('piecesJointes', file);
      });
    }

    try {
      const response = await fetch('http://localhost:8084/api/demandes', {
        method: 'POST',
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
          titre: '',
          description: '',
          type: '',
          priorite: '',
          statut: '',
          NombreRessources:'',
          dateDebutTraitement: '',
          dateFinTraitment: '',
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

        <img src={image} alt="Logo Attijari" className="h-24 w-auto mb-6" />
        <div className="bg-white bg-opacity-95 shadow-lg p-10 w-full max-w-md rounded-none">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Bienvenue</h2>
          <h3 className="text-xl text-center text-gray-800 mb-6">
            Veuillez soumettre votre demande 
          </h3>

          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="titre" value={formData.titre} onChange={handleChange} placeholder="Titre de la demande"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />

            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />

            <select name="type" value={formData.type} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required>
              <option value="">Type de demande</option>
              <option value="HOMOLOGATION">HOMOLOGATION</option>
              <option value="FONCTIONNEL">FONCTIONNEL</option>
              <option value="NON_FONCTIONNEL">NON_FONCTIONNEL</option>
              <option value="AUTOMATISATION">AUTOMATISATION</option>
            </select>

            <select name="priorite" value={formData.priorite} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required>
              <option value="">Priorité</option>
              <option value="ELEVEE">ÉLEVÉE</option>
              <option value="MOYENNE">MOYENNE</option>
              <option value="FAIBLE">FAIBLE</option>
            
            </select>
            <input type="number" name="nombreRessources" value={formData.NombreRessources} onChange={handleChange} placeholder='Nombre de ressources' className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic' style={{ fontFamily: `'Times New Roman', Times, serif` }} />
            <input type="text" name="dateDebutTraitement" value={formData.dateDebutTraitement}
              onChange={handleChange} onFocus={onDateFocus} onBlur={onDateBlur}
              placeholder="Date de début de traitement"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />

            <input type="text" name="dateFinTraitement" value={formData.dateFinTraitment}
              onChange={handleChange} onFocus={onDateFocus} onBlur={onDateBlur}
              placeholder="Date de fin de traitement"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} />

<input type="file" name="file" onChange={handleFileChange}
  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
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

            <div className="flex justify-center">
              <button type="submit"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default DemandeForm;
