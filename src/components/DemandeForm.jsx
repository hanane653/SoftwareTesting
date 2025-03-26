import React, { useState } from 'react';
import image from '../assets/attijari.jpg';
import image2 from "../assets/bk-footer.png";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

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
    <div className="min-h-screen relative">
    {/* Image de fond avec filtre */}
    <div
      className="absolute inset-0 bg-cover bg-center filter grayscale brightness-200"
      style={{
        backgroundImage: `url(${image2})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        zIndex: 0,
      }}
    ></div>
    
      {/* Contenu principal au-dessus de l'image */}
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
            <div>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                placeholder="Titre de la demande"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
                style={{ fontFamily: `'Times New Roman', Times, serif` }}
                required
              />
            </div>
            <div>
              <textarea
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
                style={{ fontFamily: `'Times New Roman', Times, serif` }}
                required
              />
            </div>
            <div>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
                style={{ fontFamily: `'Times New Roman', Times, serif` }}
                required>
                 <option value="">Sélectionner un type</option>
                 <option value="HOMOLOGATION">HOMOLOGATION</option>
                 <option value="">FONCTIONNEL</option>
                 <option value="">NON_FONCTIONNEL</option>
                 <option value="">AUTOMATISATION</option> 
       </select>
            </div>
            <div>
              <select
                name="priorite"
                value={formData.priorite}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
                style={{ fontFamily: `'Times New Roman', Times, serif` }}
                required>
                 <option value="">Sélectionner une priorité</option>
                 <option value="ELEVEE">ELEVEE</option>
                 <option value="MOYENNE">MOYENNE</option>
                 <option value="FAIBE">FAIBLE</option>
                 
       </select>
            </div>
            <div>
              <input
                type="date"
                name="dateTraitement"
                value={formData.dateTraitement}
                onChange={handleChange}
                placeholder="date de traitement"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
                style={{ fontFamily: `'Times New Roman', Times, serif` }}
                required
              />
            </div>
            <div>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                placeholder="Ajouter un fichier"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
                style={{ fontFamily: `'Times New Roman', Times, serif` }}
                required
              />
              <button
              type="button"
              onClick={handleAddFichier}
              className="bg-[#F4A300] text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm"
                > Ajouter </button>

            </div>  
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


            <div className="flex justify-center">
  <button
    type="submit"
    className="w-40 text-white py-2 font-bold transition duration-200 rounded-full mt-4"
    style={{
      backgroundColor: "#E65100",
      fontFamily: `'Times New Roman', Times, serif`,
      fontSize: "0.875rem",
    }}
    disabled={loading}
  >
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
