import React from 'react';
import image2 from "../assets/bk-footer.png";
import image from "../assets/st.jfif";
import ChatbotIcon from './chatbotIcon';
import {FaBrain,FaFile, FaComments , FaChartLine} from "react-icons/fa";
import image1 from "../assets/RobotLogo.png";
import { Link } from 'react-router-dom';

const services = [
  {
    icon: FaFile,
    title: "Soumission et suivi des demandes de test",
    description: "Automatisez la gestion des tests avec un suivi détaillé et des notifications en temps réel."
  },
  {
    icon: FaComments,
    title: "Chatbot d'assistance",
    description: "Un chatbot intelligent pour répondre à vos questions et vous guider dans le processus"
  },
  {
    icon: FaBrain,
    title: "Base de connaissances",
    description: "Accédez à des ressources complètes sur les bonnes pratiques et stratégies de test"
  },
  {
    icon: FaChartLine,
    title: "Rapports & Analyse",
    description: "Générez des rapports détaillés sur les résultats et optimisez vos tests."
  }
];
const avantages = [
  {
    title: "Gain de temps",
    description: "Automatisez et centralisez les demandes pour éviter les tâches manuelles répétitives."
  },
  {
    title: "Communication optimisée",
    description: "Les équipes QA, devs et chefs de projet collaborent via une interface unique."
  },
  {
    title: "Suivi centralisé",
    description: "Toutes les demandes, tests, et rapports sont regroupés dans un seul outil."
  },
  {
    title: "Réduction des erreurs",
    description: "Grâce à l'historique et la traçabilité, identifiez rapidement les sources de bugs."
  }
];
const articles = [
  {
    image: image1,
    title: "Introduction aux tests automatisés",
    summary: "Découvrez les bases des tests automatisés, leurs avantages, et comment les intégrer dans votre pipeline CI/CD.",
  },
  {
    title: "Cypress vs Selenium : que choisir ?",
    summary: "Une comparaison pratique des deux frameworks de test les plus populaires avec cas d’usage."
  },
  {
    title: "Comment structurer une campagne de test efficace ?",
    summary: "Étapes clés, outils à utiliser, bonnes pratiques… un guide pour bien démarrer."
  }
];

const LandingPage = () => {
  return (
    <div>
      <section className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image2})` }}>
        {/* Hero Section */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-4 py-16 md:py-24 text-white">
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Simplifiez la gestion des tests logiciels avec l'automatisation et l'IA</h1>
              <p className="text-lg mb-6">Créez, suivez et analysez vos tests en quelques clics grâce à une interface intuitive, un chatbot intelligent et une base de connaissances complète.</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="bg-orange-700 text-white hover:bg-orange-500 px-6 py-3 rounded-full font-medium transition duration-300">
                  Commencez
                </button>
                <button className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-orange-800 px-6 py-3 rounded-full font-medium transition duration-300">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        </div>
       
      </section>

      {/* Services cards */}
      {/* <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-800">Fonctionnalités clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Soumission et suivi des demandes des tests </h3>
              <p className="text-gray-700 mb-4">Automatisez la gestion des tests avec un suivi détaillé et des notifications en temps réel.</p>
              <a href="#" className="text-orange-700 hover:text-orange-800 font-medium inline-flex items-center">
                Explore facts
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            {/* Card 2 *
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Chatbot d'assistance</h3>
              <p className="text-gray-700 mb-4">Un chatbot intelligent pour répondre à vos questions et vous guider dans le processus</p>
              <a href="#" className="text-yellow-700 hover:text-yellow-800 font-medium inline-flex items-center">
                Find help
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            {/* Card 3 *
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Base de connaissances</h3>
              <p className="text-gray-700 mb-4">Accédez à des ressources complètes sur les bonnes pratiques et stratégies de test</p>
              <a href="#" className="text-orange-700 hover:text-purple-800 font-medium inline-flex items-center">
                Get advice
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Card 4 *
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Rapports & Analyse</h3>
              <p className="text-gray-700 mb-4">Générez des rapports détaillés sur les résultats et optimisez vos tests.</p>
              <a href="#" className="text-yellow-700 hover:text-yellow-800 font-medium inline-flex items-center">
                Get advice
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
      </section> */}
    
      <section className="bg-white text-blue-gray py-16">
      <h2 className="text-3xl md:text-3xl font-bold mb-6 text-center text-gray-800">Fonctionnalités clés</h2>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="text-center p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg bg-white hover:bg-white group"
            >
              <Icon className="text-orange-500 text-4xl mb-4 transition-colors duration-300 group-hover:text-blue-gray" />
              <h3 className="text-blue-gray text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-500 group-hover:text-gray-400">{service.description}</p>
            </div>
          );
        })}
      </div>

      </section>
      {/* Section des avantages*/}
      <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Vos avantages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {avantages.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    {/* section des articles */}
  <section className="bg-white py-16">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Articles proposés</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.map((article, idx) => (
        <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-300">
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <p className="text-gray-600">{article.summary}</p>
          <img src={article.image} alt={article.title} className="w-full h-auto mb-4" />
          <Link to={`/article/${article.title.toLowerCase().replace(/ /g, '-')}`} className="mt-4 text-blue-600 hover:underline">
  Lire l'article
</Link>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default LandingPage;

