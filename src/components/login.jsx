import React, { useState } from "react";
import axios from "axios";
import image from "../assets/attijari.jpg";
import image2 from "../assets/bk-footer.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8089/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("✅ Connexion réussie !");
      setLoading(false);

      if (response.data.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (response.data.role === "USER") {
        navigate("/user-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setLoading(false);
      setError("❌ Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen relative mt-16">
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
            Pour accéder à l'application, merci de vous identifier
          </h3>

          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
                style={{ fontFamily: `'Times New Roman', Times, serif` }}
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 italic"
                style={{ fontFamily: `'Times New Roman', Times, serif` }}
                required
              />
            </div>
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
    {loading ? "Chargement..." : "Se connecter"}
  </button>
</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
