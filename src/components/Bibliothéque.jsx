//Bibliotheque.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Folder, FileText, Search, Download, Eye, X } from "lucide-react";
import img from "../assets/RobotLogo.png";
import image2 from "../assets/bk-footer.png";

const Bibliothéque = () => {
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Tous");

  // Couleurs Attijari Bank
  const colors = {
    primary: "#E65100",    // Orange Attijari
    secondary: "#000000",  // Noir Attijari
    accent: "#FFD700",     // Jaune Attijari
    hover: "#E65100",      // Orange foncé pour hover
  };

  const categories = [
    { id: 1, name: "Tous", icon: <Folder size={20} /> },
    { id: 2, name: "Unit Testing", icon: <Folder size={20} /> },
    { id: 3, name: "DevOps", icon: <Folder size={20} /> },
    { id: 4, name: "Test Strategy", icon: <Folder size={20} />},
    {id: 5, name: "Réalisations", icon: <Folder size={20} /> },
    {id: 6, name: "TNRs", icon: <Folder size={20} /> }
  ];

  // Charger les documents depuis Spring Boot
  useEffect(() => {
    axios
      .get("http://localhost:8085/api/documents")
      .then((res) => setDocuments(res.data))
      .catch((err) => console.error("Erreur récupération documents:", err));
  }, []);

  const filteredDocs = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(search.toLowerCase()) &&
      (activeCategory === "Tous" || doc.category === activeCategory)
  );

  // Télécharger un fichier
  const handleDownload = (filename) => {
    window.open(`http://localhost:8085/api/documents/download/${filename}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
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
      <div className="relative z-10 flex p-6 gap-6 mt-16 max-w-[1400px] mx-auto">
        {/* Sidebar */}
        <div className="w-72 bg-white rounded-xl shadow-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center gap-2">
            <span style={{ color: colors.primary }}>Catégories</span>
          </h2>
          <ul className="space-y-3">
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200`}
                style={{
                  backgroundColor: activeCategory === category.name ? '#FFF3E0' : 'transparent',
                  color: activeCategory === category.name ? colors.primary : colors.secondary,
                }}
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2" 
                style={{ color: colors.primary }}
              />
              <input
                type="text"
                placeholder="Rechercher un document..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  focusRing: colors.primary,
                  '--tw-ring-color': colors.primary 
                }}
              />
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#FFF3E0' }}
                    >
                      <FileText style={{ color: colors.primary }} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {doc.title}
                      </h3>
                      <p className="text-sm" style={{ color: colors.primary }}>{doc.category}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <img
                      src={img}
                      alt="logo"
                      className="w-16 h-16 object-contain mx-auto mb-4"
                    />
                  </div>
                </div>
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-colors"
                      style={{ 
                        borderColor: colors.primary, 
                        color: colors.primary,
                        backgroundColor: 'white',
                        hover: { backgroundColor: '#FFF3E0' }
                      }}
                    >
                      <Eye size={18} />
                      Voir
                    </button>
                    <button
                      onClick={() => handleDownload(doc.file)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white transition-colors"
                      style={{ 
                        backgroundColor: colors.primary,
                        hover: { backgroundColor: colors.hover }
                      }}
                    >
                      <Download size={18} />
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de prévisualisation */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[80vh] relative">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-2 rounded-full bg-white shadow-lg transition-colors"
                style={{ 
                  hover: { backgroundColor: '#FFF3E0' }
                }}
              >
                <X size={24} style={{ color: colors.primary }} />
              </button>
            </div>
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                {selectedDoc.title}
              </h2>
              <p className="text-gray-500">{selectedDoc.category}</p>
            </div>
            <div className="h-[calc(100%-7rem)]">
              <iframe
                src={`http://localhost:8085/api/documents/view/${encodeURIComponent(
                  selectedDoc.file
                )}`}
                title={selectedDoc.title}
                className="w-full h-full rounded-b-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bibliothéque;
