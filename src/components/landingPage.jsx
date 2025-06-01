// LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import image2 from "../assets/bk-footer.png";
import image from "../assets/st.jfif";
import image1 from "../assets/RobotLogo.png";
import ChatbotIcon from './chatbotIcon';
import { FaBrain, FaFile, FaComments, FaChartLine, FaBell, FaArrowRight, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import image3 from "../assets/Cypress-vs-Selenium.png";
import image4 from "../assets/article.jfif";


// Flash Info Data
const flashNews = [
  {
    id: 1,
    type: 'important',
    title: "Nouvelle mise à jour majeure",
    content: "Version 2.0 disponible avec de nouvelles fonctionnalités d'automatisation",
    date: "2024-03-20"
  },
  {
    id: 2,
    type: 'event',
    title: "Webinaire : Tests automatisés",
    content: "Rejoignez-nous le 25 mars pour un webinaire sur les meilleures pratiques",
    date: "2024-03-25"
  },
  {
    id: 3,
    type: 'update',
    title: "Maintenance planifiée",
    content: "Une maintenance est prévue le 30 mars de 2h à 4h",
    date: "2024-03-30"
  }
];

// Existing data structures...
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
    title: "Amélioration de la qualité",
    description: "Automatisez et centralisez les demandes pour éviter les tâches manuelles répétitives."
  },
  {
    title: "Optimisation des coûts",
    description: "Les équipes QA, devs et chefs de projet collaborent via une interface unique."
  },
  {
    title: "Réduction du Time To Market",
    description: "Toutes les demandes, tests, et rapports sont regroupés dans un seul outil."
  },
  {
    title: "Industrialisation et qualifications des tests",
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
    image: image3,
    title: "Cypress vs Selenium : que choisir ?",
    summary: "Une comparaison pratique des deux frameworks de test les plus populaires avec cas d’usage."
  },
  {
    image: image4,
    title: "Comment structurer une campagne de test efficace ?",
    summary: "Étapes clés, outils à utiliser, bonnes pratiques… un guide pour bien démarrer."
  }
];

const LandingPage = () => {
  const [activeFlashNews, setActiveFlashNews] = useState(0);
  const [showFlashNews, setShowFlashNews] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFlashNews((prev) => (prev + 1) % flashNews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative pt-16">
      {/* Flash Info Banner */}
      <AnimatePresence>
        {showFlashNews && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative bg-gradient-to-r from-orange-600 to-orange-800 text-white"
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaBell className="h-5 w-5 mr-2 animate-bounce" />
                  <div className="flex flex-col">
                    <p className="font-semibold">
                      {flashNews[activeFlashNews].title}
                    </p>
                    <p className="text-sm text-orange-100">
                      {flashNews[activeFlashNews].content}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setActiveFlashNews((prev) => (prev + 1) % flashNews.length)}
                    className="text-orange-100 hover:text-white transition-colors"
                  >
                    <FaArrowRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setShowFlashNews(false)}
                    className="text-orange-100 hover:text-white transition-colors"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-orange-300/30 w-full">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, repeat: Infinity }}
                className="h-full bg-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Amélioré */}
      <section className="relative min-h-screen bg-cover bg-center overflow-hidden bg-fixed" style={{ backgroundImage: `url(${image2})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 flex items-center">
          <motion.div
            initial={{ opacity: 1.2, y: 20 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ duration: 1.5 }}
            className="container mx-auto px-4 py-16 md:py-24 text-white"
          >
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Simplifiez la gestion des tests logiciels avec
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  {" "}l'automatisation et l'IA
                </span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Créez, suivez et analysez vos tests en quelques clics grâce à une interface intuitive,
                un chatbot intelligent et une base de connaissances complète.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 
                           rounded-full font-medium shadow-lg hover:shadow-orange-500/20 
                           transition duration-300"
                >
                  Commencer 
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 
                           hover:bg-white/20 px-8 py-4 rounded-full font-medium transition duration-300"
                >
                  Voir la démo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-2 h-2 bg-white rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Services Section - Amélioré */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Fonctionnalités clés</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos outils puissants pour optimiser votre processus de test
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl 
                           transition-all duration-300 group"
                >
                  <div className="mb-6">
                    <Icon className="text-5xl text-orange-500 group-hover:text-orange-600 
                                   transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avantages Section - Amélioré */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Nos engagements</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Optimisez votre processus de test et gagnez en efficacité
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {avantages.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-700 
                         transition-all duration-300 transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold mb-4 text-orange-400">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section - Amélioré */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Articles proposés</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Restez à jour avec nos derniers articles et guides
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg 
                              hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover transform group-hover:scale-110 
                               transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.summary}</p>
                    <Link
                      to={`/article/${article.title.toLowerCase().replace(/ /g, '-')}`}
                      className="inline-flex items-center text-orange-600 hover:text-orange-700 
                               font-medium transition-colors duration-300"
                    >
                      Lire l'article
                      <FaArrowRight className="ml-2 text-sm" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
