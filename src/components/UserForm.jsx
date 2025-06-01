import React, { useState } from 'react';
import image from '../assets/attijari.jpg';
import image2 from "../assets/bk-footer.png";
import { useNavigate } from "react-router-dom";

const UserForm = ({ onDemandeCree }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    username: '',
    password: '',
    role: '',
    pole: '', 
    domaine:'',
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

 
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

      

    const dataToSend = new FormData();
    dataToSend.append('nom', formData.nom);
    dataToSend.append('prenom',formData.prenom)
    dataToSend.append('email', formData.email);
    dataToSend.append('username', formData.username);
    dataToSend.append('password', formData.password);
    dataToSend.append('role', formData.role);
    dataToSend.append('pole', formData.pole);
    dataToSend.append('domaine',formData.domaine);

        
    try {
      const response = await fetch('http://localhost:8089/auth/addUser', {

        method: 'POST',
        body: dataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur HTTP ${response.status}: ${errorText}`);
        setError("Erreur lors de l'envoi de user.");
      } else {
        const created = await response.json();
        console.log("utilisateur crée avec succès!");
        setSuccessMessage("Utilisateur ajouté avec succés !");
        onDemandeCree?.(created);
        setFormData({
         nom: '',
         prenom: '',
         email: '',
         username: '',
         password: '',
         role: '',
         pole: '', 
         domaine:''
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
             Ajouter un nouvel utilisateur du portail
          </h3>

          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom d'utilisateur"
              className="flex-1 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />
              <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom d'utilisateur"
              className="flex-1 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />
              <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email d'utilisateur"
              className="flex-1 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username d'utilisateur"
              className="flex-1 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password d'utilisateur"
              className="flex-1 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required />
              <select name="pole" value={formData.pole} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required>
              <option value="">Pole d'utilisateur</option>
              <option value="BFIG">BFIG</option>
              <option value="Compliance">Compliance</option>
              <option value="Crédits_Engagements">Crédits_Engagements</option>
              <option value="Risques_Reglementaire"> Risques_Reglementaire</option>
              <option value="Pilotage_MC"> Pilotage_MC </option>
              <option value="TF_CM"> TF_CM </option>
            </select>
            <select name="role" value={formData.role} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }} required>
              <option value="">Role d'utilisateur</option>
              <option value="ADMINISTRATEUR">Administrateur</option>
              <option value="RESSOURCE_TESTING">Ressource testing</option>
              <option value="RESPONSABLE_POLE">Responsable de pole</option>
              <option value="RESPONSABLE_DOMAINE"> Responsable de domaine</option>
              <option value="COLLABORATEUR"> Collaborateur </option>
            </select>
            <input type="text" name="domaine" value={formData.domaine} onChange={handleChange} placeholder="Domaine d'utilisateur"
              className="flex-1 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
              style={{ fontFamily: `'Times New Roman', Times, serif` }}  />

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
                   
                {loading ? "Chargement..." : "Ajouter un utilisateur"}
               
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
