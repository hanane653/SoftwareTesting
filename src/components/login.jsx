import React from "react";
import image from "../assets/attijari.jpg";

const Login = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundColor: "white",
        fontFamily: `'Times New Roman', Times, serif`,
      }}
    >
      {/* Logo centré au-dessus de la card */}
      <img
        src={image}
        alt="Logo Attijari"
        className="h-24 w-auto mb-6"
      />

      {/* Card de connexion */}
      <div className="bg-white bg-opacity-95 shadow-lg p-10 w-full max-w-md rounded-none">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Connexion</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Nom d'utilisateur</label>
            <input
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              style={{ fontFamily: `'Times New Roman', Times, serif` }}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Mot de passe</label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              style={{ fontFamily: `'Times New Roman', Times, serif` }}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 font-bold transition duration-200"
            style={{
              backgroundColor: "#FFA726",
              fontFamily: `'Times New Roman', Times, serif`,
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
