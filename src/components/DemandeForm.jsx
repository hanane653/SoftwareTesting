import React, { useState } from 'react';
import image from '../assets/attijari.jpg';

const DemandeForm = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type: '',
    priorite: '',
    statut: '',  
    dateTraitement: '', 
    piecesJointes: [],
  });

  const [fichier, setFichier] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Fichier sélectionné:", selectedFile);
    setFichier(selectedFile);
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

  const handleRemoveFichier = (index) => {
    const updatedFiles = [...formData.piecesJointes];
    updatedFiles.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      piecesJointes: updatedFiles,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append('titre', formData.titre);
    dataToSend.append('description', formData.description);
    dataToSend.append('type', formData.type);
    dataToSend.append('priorite', formData.priorite);
    dataToSend.append('dateTraitement', formData.dateTraitement);

    // Vérification des fichiers ajoutés avant envoi
    if (formData.piecesJointes.length > 0) {
        formData.piecesJointes.forEach((file) => {
            console.log("Ajout de fichier:", file.name); // Log pour vérifier
            dataToSend.append('piecesJointes', file);
        });
    } else {
        console.log("Aucun fichier à envoyer");
    }

    try {
      const response = await fetch('http://localhost:8084/api/demandes', {
        method: 'POST',
        body: dataToSend,
      });

      if (!response.ok) {
        // Si la réponse n'est pas OK, affichez le code de statut et le texte de la réponse
        const errorText = await response.text(); // Vous pouvez aussi utiliser `response.json()` si la réponse est en JSON
        console.error(`Erreur HTTP ${response.status}: ${errorText}`);
      } else {
        console.log("Demande envoyée avec succès!");

        // Reset form after successful submission
        setFormData({
          titre: '',
          description: '',
          type: '',
          priorite: '',
          statut: '',
          dateTraitement: '',
          piecesJointes: [],
        });
      }
    } catch (error) {
      console.error('Erreur de réseau ou de serveur:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        
        {/* Image Section */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={image}
            alt="Form Illustration"
            className="w-full h-full object-contain rounded-l-2xl"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-[#C8102E]">Créer une Demande</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Titre Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A300]"
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A300]"
                required
              />
            </div>

            {/* Type Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A300]"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="HOMOLOGATION">HOMOLOGATION</option>
                <option value="FONCTIONNEL">FONCTIONNEL</option>
                <option value="NON_FONCTIONNEL">NON_FONCTIONNEL</option>
                <option value="AUTOMATISATION">AUTOMATISATION</option>
              </select>
            </div>

            {/* Priorité Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
              <select
                name="priorite"
                value={formData.priorite}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A300]"
                required
              >
                <option value="">Sélectionner une priorité</option>
                <option value="ELEVEE">ELEVEE</option>
                <option value="MOYENNE">MOYENNE</option>
                <option value="FAIBLE">FAIBLE</option>
              </select>
            </div>

           {/* Date Traitement Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de Traitement</label>
              <input
                type="date"
                name="dateTraitement"
                value={formData.dateTraitement}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A300]"
                required
              />
            </div>

            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ajouter un fichier</label>
              <div className="flex items-center gap-3">
                <input type="file" onChange={handleFileChange} className="flex-1 border p-2 rounded" />
                <button
                  type="button"
                  onClick={handleAddFichier}
                  className="bg-[#F4A300] text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm"
                >
                  Ajouter
                </button>
              </div>
            </div>

            {/* Files Display */}
            {formData.piecesJointes.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium text-sm text-gray-700">Fichiers joints :</p>
                {formData.piecesJointes.map((file, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md text-sm">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFichier(index)}
                      className="text-red-500 hover:underline text-xs"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#C8102E] text-white py-3 rounded-lg hover:bg-red-800 text-lg font-semibold"
            >
              Créer la Demande
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DemandeForm;
