//About.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaInfoCircle, FaLinkedin, FaGithub, FaEnvelope, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Link } from 'react-router-dom';

// Images d'arrière-plan et de décoration
import heroImage from '../assets/bk-footer.png'

// Images de l'équipe
import team1 from '../assets/team1.jfif';
import projImage1 from '../assets/demo1.jfif';
import { rgba } from 'motion';



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '30rem',
    width: '90%',
    borderRadius: '1.5rem',
    padding: '2.5rem',
    boxShadow: '0 20px 35px rgba(0,0,0,0.25)',
    animation: 'fadeIn 0.4s ease-in-out',
    border: 'none',
    background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(8px)',
  },
};

Modal.setAppElement('#root');

const About = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedEngagement, setSelectedEngagement] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const engagements = [
    {
      title: 'Transparence',
      description: 'Nous communiquons ouvertement sur nos processus et résultats.',
      icon: '🔍',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Responsabilité',
      description: 'Nous assumons pleinement la qualité de notre travail.',
      icon: '⚡',
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Innovation',
      description: 'Nous adoptons les dernières technologies pour des tests efficaces.',
      icon: '💡',
      color: 'from-yellow-400 to-orange-600'
    },
    {
      title: 'Collaboration',
      description: 'Nous travaillons main dans la main avec vos équipes.',
      icon: '🤝',
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Éthique',
      description: 'Nous respectons les normes les plus strictes en matière de confidentialité.',
      icon: '🛡️',
      color: 'from-red-400 to-red-600'
    },
  ];

  const teamMembers = [
    {
      name: 'Sarah L.',
      title: 'Ingénieure QA Senior',
      img: team1,
      bio: "Plus de 8 ans d'expérience en tests automatisés",
      expertise: ['Selenium', 'Cypress', 'Jest'],
      social: {
        linkedin: "#",
        github: "#",
        email: "sarah@example.com"
      }
    },
    {
      name: 'Sarah L.',
      title: 'Ingénieure QA Senior',
      img: team1,
      bio: "Plus de 8 ans d'expérience en tests automatisés",
      expertise: ['Selenium', 'Cypress', 'Jest'],
      social: {
        linkedin: "#",
        github: "#",
        email: "sarah@example.com"
      }
    }
  ];

  const statistics = [
    { number: '900+', label: 'Cas de tests conçus' },
    { number: '1000+', label: 'Nombre de cas de tests automatisés' },
    { number: '500+', label: 'Nombre des jeux de données génerés via des scripts automatisés' },
    { number: '10', label: 'Experts QA' },
  ];
  const projects = [
    {
      name:'Borj Crédit', image:{projImage1},description:'Réduction du Time To Market: 2H pour le déroulement des TNRs vs 8 jours avant'
    },
    {
      name:'Murex', image:{projImage1},description:'Déroulement de Sanity Check : 0 ETP vs  2 ETP Avant'
    },
    {
      name:'Sypex', image:{projImage1},description:'Réduction du Time To Market: 1 fichier traité pendant 1 minute vs 15 minutes avant '
    },
    {
      name:'Upgrade TI plus', image:{projImage1},description:'Réduction du Time To Market: 1 transaction traitée pendant 15 minutes vs 1 heure avant '
    },

  ];

  return (
    <div className="font-sans overflow-hidden">
      {/* HERO SECTION avec Parallax et Animations */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-20">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div
            className="w-full h-full bg-cover bg-center bg-fixed"
            style={{ 
              backgroundImage: `url(${heroImage})`,
              filter: 'brightness(0.2)'
             
            }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-white/40 to-transparent" />

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <h1 className="text-7xl font-extrabold mb-8 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r bg-white">
              Excellence en Tests Logiciels
            </span>
          </h1>
          <p className="text-2xl text-gray-800 mb-12 leading-relaxed">
            Nous transformons la qualité logicielle en avantage compétitif
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full
                     text-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Découvrir Notre Expertise
          </motion.button>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-2 h-2 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* STATISTICS SECTION avec Animation au Scroll */}
      <section className="py-30 text-white">
        <div className="max-w-10xl mx-auto px-12 bg-opacity-50 bg-center w-100 h-50 "
          style={{ backgroundColor: 'white'}}>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 h-40 text-center mt-20">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600
                             bg-clip-text text-transparent mb-4">
                  {stat.number}
                </h3>
                <p className="text-m text-gray-800">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES CAROUSEL */}
      <section className="py-24 bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Nos Services</h2>
            <p className="text-xl text-gray-600">Des solutions complètes pour vos besoins en QA</p>
          </motion.div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation
            className="mySwiper"
          >
            {engagements.map((service, index) => (
              <SwiperSlide key={index}>
                <div className={`bg-gradient-to-br ${service.color} p-8 rounded-2xl text-white
                                transform hover:scale-105 transition-transform duration-300`}>
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-100">{service.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* TEAM SECTION avec Hover Effects */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Notre Équipe d'Experts</h2>
            <p className="text-xl text-gray-300">Des professionnels passionnés par la qualité</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 
                              rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                <div className="relative bg-gray-800 p-8 rounded-2xl">
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 
                                  opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-400 mb-4">{member.title}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.expertise.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    {Object.entries(member.social).map(([platform, link], i) => (
                      <a
                        key={i}
                        href={link}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                      >
                        {platform === 'linkedin' && <FaLinkedin size={24} />}
                        {platform === 'github' && <FaGithub size={24} />}
                        {platform === 'email' && <FaEnvelope size={24} />}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SHOWCASE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Nos Réalisations</h2>
            <p className="text-xl text-gray-600">Découvrez nos projets les plus marquants</p>
          </motion.div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {projects.map((projet, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-2xl shadow-xl"
                >
                   <div className="bg-white rounded-2xl overflow-hidden shadow-lg 
                                                hover:shadow-2xl transition-all duration-300">
                                    <div className="relative overflow-hidden">
                                      <img
                                        src={projet.image}
                                        
                                        className="w-full h-48 object-cover transform group-hover:scale-110 
                                                 transition-transform duration-300"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                    <div className="p-6">
                                      <h3 className="text-xl font-semibold mb-3">{projet.name}</h3>
                                      <p className="text-gray-600 mb-4">{projet.description}</p>
                                      <Link
                                        to='#'
                                        className="inline-flex items-center text-orange-600 hover:text-orange-700 
                                                 font-medium transition-colors duration-300"
                                      >
                                        Voir Démo
                                        <FaArrowRight className="ml-2 text-sm" />
                                      </Link>
                                    </div>
                                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA SECTION avec Animation */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-300 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Prêt à Transformer Votre Approche QA ?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Rejoignez les entreprises qui font confiance à notre expertise pour garantir
            la qualité de leurs applications
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 text-lg font-semibold px-8 py-4 
                     rounded-full shadow-lg hover:shadow-2xl transform transition-all duration-300"
          >
            Commencer Maintenant
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
