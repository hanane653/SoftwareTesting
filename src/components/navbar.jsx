import React, { useState } from "react";
import image from "../assets/attijari.jpg";
import image2 from "../assets/bk-footer.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
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
  return (

    

    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://SoftwareTestingAWB.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={image} className="h-12" alt="AWB Logo" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={handleClick}
              type="submit"
              className="w-40 text-white py-2 font-bold transition duration-200 rounded-full mt-4"
              style={{
                backgroundColor: "#E65100", // couleur orange
                fontFamily: `'Times New Roman', Times, serif`,
                fontSize: "0.875rem",
                
              }}
            >
             Se connecter 
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-orange-600 rounded-sm md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-500 hover:bg-[#E65100] md:hover:bg-transparent md:hover:text-red-500  "
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
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-[#E65100] md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{fontFamily: `'Times New Roman', Times, serif`,}}
                  onClick={handlebiblioClick}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-[#E65100] md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Bibliothéque Documentaire
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{fontFamily: `'Times New Roman', Times, serif`,}}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-[#E65100] md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
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
