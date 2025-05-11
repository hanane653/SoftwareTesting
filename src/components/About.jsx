import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaInfoCircle } from 'react-icons/fa';
import image2 from '../assets/bk-footer.png';
import team1 from '../assets/team1.jfif';
import team2 from '../assets/team1.jfif';
import team3 from '../assets/team1.jfif';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '23rem',
    width: '90%',
    borderRadius: '1rem',
    padding: '2rem',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

Modal.setAppElement('#root');

const About = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedEngagement, setSelectedEngagement] = useState(null);

  const openModal = (engagement) => {
    setSelectedEngagement(engagement);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const engagements = [
    {
      title: 'Transparence',
      description: 'Nous communiquons ouvertement sur nos processus et résultats.',
    },
    {
      title: 'Responsabilité',
      description: 'Nous assumons pleinement la qualité de notre travail.',
    },
    {
      title: 'Innovation',
      description: 'Nous adoptons les dernières technologies pour des tests efficaces.',
    },
    {
      title: 'Collaboration',
      description: 'Nous travaillons main dans la main avec vos équipes.',
    },
    {
      title: 'Éthique',
      description: 'Nous respectons les normes les plus strictes en matière de confidentialité.',
    },
  ];

  const teamMembers = [
    { name: 'Sarah L.', title: 'Ingénieure QA Senior', img: team1 },
    { name: 'Yassine B.', title: 'Testeur Automatisé', img: team2 },
    { name: 'Amira K.', title: 'Responsable Qualité', img: team3 },
  ];

  return (
    <div className="font-sans">
      {/* HERO */}
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image2})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">À propos du Software Testing</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Garantir la qualité, la sécurité et la performance de vos applications grâce à des tests logiciels efficaces.
            </p>
          </div>
        </div>
      </section>

      {/* NOTRE MISSION */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Notre Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Fournir des solutions de test logiciel robustes et évolutives afin de renforcer la fiabilité des systèmes numériques. Nous nous spécialisons dans les tests fonctionnels, d'intégration, de performance et d'accessibilité.
          </p>
        </div>
      </section>

      {/* NOS ENGAGEMENTS */}
      <section className="py-16 bg-bg_light_primary" id="engagements">
        <div className="md:container px-5 py-14">
          <h2 className="title">Nos Engagements</h2>
          <h4 className="subtitle">Ce qui nous distingue</h4>
          <br />
          <div className="flex flex-wrap gap-4 justify-center">
            {engagements.map((engagement, i) => (
              <div
                key={i}
                className="bg-white sm:cursor-pointer relative group w-full flex items-center gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200"
                onClick={() => openModal(engagement)}
              >
                <div>
                  <FaInfoCircle className="w-10 group-hover:scale-125 duration-200" />
                </div>
                <div>
                  <h6>{engagement.title}</h6>
                  <p className="italic text-gray-600">{engagement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <h2 className="text-xl font-semibold">{selectedEngagement?.title}</h2>
        <p className="text-gray-700 mt-4">{selectedEngagement?.description}</p>
        <div className="flex justify-end mt-6">
          <button onClick={closeModal} className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
            Fermer
          </button>
        </div>
      </Modal>

      {/* ÉQUIPE */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Rencontrez notre équipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-100 rounded-xl shadow-md p-6 text-center">
                <img src={member.img} alt={member.name} className="w-32 h-32 mx-auto rounded-full mb-4 object-cover" />
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-500">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Besoin de notre expertise ?</h2>
          <p className="mb-6 text-lg">
            Contactez-nous pour collaborer sur vos projets logiciels et assurer leur succès grâce à des tests performants.
          </p>
          <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
            Nous contacter
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
