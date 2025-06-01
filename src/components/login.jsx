import React, { useState } from "react";
import axios from "axios";
import image from "../assets/attijari.jpg";
import image2 from "../assets/bk-footer.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [successMessage,setSuccessMessage] = useState('');
  {
    successMessage &&(
      <div className="mb-4 p-3 rounded bg-green-100 text-green-800 shadow" >
  {successMessage}
      </div>
    )
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
            credentials: 'include',
            body: JSON.stringify({ username, password })
        }
      );
      const userRes = await axios.get("http://localhost:8089/auth/user/me",{withCredentials:true,});
      setUser(userRes.data);
      console.log(userRes.data);
      
      console.log("✅ Connexion réussie !");
      
      
      // Stocker les informations de l'utilisateur dans le localStorage
        localStorage.setItem('userId', userRes.data.id);
        localStorage.setItem('userRoles', JSON.stringify(userRes.data.role));
        localStorage.setItem('username', userRes.data.username);

      setLoading(false);

      if (userRes.data.role === "ADMINISTRATEUR") {
        navigate("/dashboard");
      } else if (userRes.data.role === "RESSOURCE_TESTING") {
        navigate(`/dashRes/${userRes.data.username}`);
      } else if (userRes.data.role === "RESPONSABLE_DOMAINE") {
        navigate(`/dashResDomaine/${userRes.data.domaine}`);
      } 
      else {
        setSuccessMessage("Connexion réussie!");
        setTimeout(()=>navigate("/dashboard"),30);
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
        className="absolute inset-0 bg-cover bg-center filter grayscale-20 brightness-200"
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
