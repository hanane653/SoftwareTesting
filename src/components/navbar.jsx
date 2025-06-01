import React, { useState, useEffect } from "react";
import image from "../assets/attijari.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHome = () => navigate("/home");
  const handleAbout = () => navigate("/about");
  const handleBiblio = () => navigate("/biblio");
  const handleContact = () => navigate("/contact");

  const handleDash = async () => {
    try {
          const userRes = await axios.get("http://localhost:8089/auth/user/me",{withCredentials:true,});
          
          setUser(userRes.data);
      if (userRes.data.role === "ADMINISTRATEUR") {
        navigate("/dashboard");
      } else if (userRes.data.role === "RESSOURCE_TESTING") {
        navigate(`/dashRes/${userRes.data.username}`);
      } else {
        setSuccessMessage("Connexion réussie!");
        setTimeout(() => navigate("/dashboard"), 30);
      }
    } catch (err) {
      console.error("Erreur lors de la redirection");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8089/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/SignIn");
    } catch (err) {
      console.error("Erreur lors de la déconnexion");
    }
  };

  const navItems = [
    { name: "Accueil", action: handleHome },
    { name: "Dashboard", action: handleDash },
    { name: "Bibliothèque Documentaire", action: handleBiblio },
    { name: "À propos", action: handleAbout },
    { name: "Contact", action: handleContact },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out ${
      scrolled ? "bg-white shadow-lg" : "bg-white/90 backdrop-blur-md"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={image} className="h-16 w-auto" alt="Attijari Bank Logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className="relative group px-3 py-2 text-sm font-medium text-gray-800 hover:text-orange-600 transition-colors duration-200"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button onClick={() => setShowMenu(!showMenu)} className="flex items-center space-x-3 focus:outline-none">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                  <span className="hidden md:block font-medium text-gray-700">{user.username}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`} />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/SignIn")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
              >
                Se connecter
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-lg p-2 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button key={item.name} onClick={() => { item.action(); setIsMobileMenuOpen(false); }} className="block w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors duration-200">
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
