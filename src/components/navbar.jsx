import React, { useState } from "react";
import image from "../assets/attijari.jpg";
import image2 from "../assets/bk-footer.png";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import axios from "axios";




const Navbar = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [showMenu,setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleLogout = async () => {
    try{
      await axios.post("http://localhost:8089/auth/logout",{},{withCredentials:true
    });
    setUser(null);
    navigate("/SignIn");
  }
  catch(err){
    console.error("erreur lors de la déconnexion");
  }
  };
  const handleClick = () =>{
    navigate("/SignIn");
  }         
  const handleAcceuilClick = () =>{
    navigate("/home");
  }
  const handlebiblioClick = () =>{
    navigate("/biblio");
  }  
  const handleDashClick= () =>{
    navigate("/dashboard");
  
  }  
  const handleAboutClick=()=>{
    navigate("/about");
  }
  const {user} =  useAuth();
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <a
            href="https://SoftwareTestingAWB.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={image} className="h-12" alt="AWB Logo" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? ( 
  <div className="flex items-center space-x-2 mt-4 relative">
    <img
      src={user.avatar} 
      alt="User Avatar"
      className="w-8 h-8 rounded-full"
      onClick={toggleMenu}
    />
    <span className="text-black font-bold">{user.username}</span>
    {
      showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
          <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
         Se déconnecter
          </button>
          </div>
      )
    }
  </div>
) : (
  <button
    onClick={handleClick}
    type="submit"
    style={{
      backgroundColor: "#E65100",
      fontFamily: "Times New Roman, Times, serif",
      fontSize: "0.875rem",
    }}
    className="w-40 text-white py-2 font-bold transition duration-200 rounded-full mt-4"
  >
    Se connecter
  </button>
)}


            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-9 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"  
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full h-9 md:flex md:w-auto md:order-1 top-0"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-3 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 no-underline">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 bg-orange-600 rounded-sm md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-500 hover:bg-[#E65100] md:hover:bg-transparent md:hover:text-red-500 no-underline"
                  aria-current="page"
                  style={{fontFamily: `'Times New Roman', Times, serif`,}}
                  onClick={handleAcceuilClick}
                >
                  Acceuil
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleDashClick}
                  style={{fontFamily: `'Times New Roman', Times, serif`,}}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-[#E65100] md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 no-underline"
                  
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{fontFamily: `'Times New Roman', Times, serif`,}}
                  onClick={handlebiblioClick}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-[#E65100] md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 no-underline"
                >
                  Bibliothéque Documentaire
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{fontFamily: `'Times New Roman', Times, serif`,}}
                  onClick={handleAboutClick}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-[#E65100] md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 no-underline"
                >
                  A propos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{fontFamily: `'Times New Roman', Times, serif`,}}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-[#E65100] md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 no-underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    
  );
};

export default Navbar;