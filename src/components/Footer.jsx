//Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    services: [
      { name: 'Qualification Fonctionnelle', href: '#' },
      { name: 'Automatisation des tests', href: '#' },
      { name: 'Lancement des TNRs', href: '#' },
      { name: 'Formations en Testing', href: '#' },
      { name: 'Préparation des jeux de données', href: '#' }
    ],
    company: [
      { name: 'À propos', href: '/about' },
      { name: 'Carrières', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'Webinaires', href: '#' },
      { name: 'API', href: '#' },
    ],
    legal: [
      { name: 'Mentions légales', href: '#' },
      { name: 'Confidentialité', href: '#' },
      { name: 'CGU', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: <FaFacebookF />, href: '#' },
    { icon: <FaTwitter />, href: '#' },
    { icon: <FaInstagram />, href: '#' },
    { icon: <FaLinkedinIn />, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                Software Testing
              </h2>
              <p className="text-gray-400 mb-8 max-w-md">
                Nous fournissons des solutions de test complètes pour garantir la qualité 
                de vos applications. Notre expertise fait la différence.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center
                             text-gray-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600
                             hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-100 capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <div className="max-w-md">
            <h3 className="text-xl font-semibold mb-4">Restez informé</h3>
            <p className="text-gray-400 mb-4">
              Abonnez-vous à notre newsletter pour recevoir nos dernières actualités.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700
                         focus:outline-none focus:border-blue-500 text-gray-300"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-600
                         text-white font-medium hover:shadow-lg transition-all duration-300"
              >
                S'abonner
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400"
        >
          <p className="flex items-center justify-center gap-2">
            Made with <FaHeart className="text-red-500" /> by Software Testing Team
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Software Testing. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
