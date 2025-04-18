import { useState, useEffect } from "react";
import axios from "axios";
import { Folder, FileText, Search } from "lucide-react";
import img from "../assets/RobotLogo.png";

const Bibliothéque = () => {
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Charger les documents depuis Spring Boot
  useEffect(() => {
    axios
      .get("http://localhost:8085/api/documents")
      .then((res) => setDocuments(res.data))
      .catch((err) => console.error("Erreur récupération documents:", err));
  }, []);

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  // Télécharger un fichier
  const handleDownload = (filename) => {
    window.open(`http://localhost:8085/api/documents/download/${filename}`, "_blank");
  };

  return (
    <>
      <div className="flex h-screen p-4 bg-gray-100 mt-16">
        {/*Sidebar*/}
        <div className="w-1/4 p-4 bg-white rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Catégories</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-orange-700 cursor-pointer">
              <Folder /> Unit Testing
            </li>
            <li className="flex items-center gap-2 text-orange-700 cursor-pointer">
              <Folder /> DevOps
            </li>
            <li className="flex items-center gap-2 text-orange-700 cursor-pointer">
              <Folder /> Test Strategy
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher un document..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center gap-3">
                  <FileText className="text-orange-600" />
                  <div>
                    <h3 className="text-lg font-semibold">{doc.title}</h3>
                    <p className="text-sm text-gray-500">{doc.category}</p>
                    <img src={img} alt="logo" />
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => handleDownload(doc.file)}
                    className="px-4 py-2 text-white rounded-lg hover:bg-red-700"
                    style={{ backgroundColor: "#E65100" }}
                  >
                    Télécharger
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Aperçu du document */}
      {selectedDoc && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-4/5 h-4/5 relative">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-2 right-2 text-gray-700 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              Fermer
            </button>
            <iframe
              src={`http://localhost:8085/api/documents/view/${encodeURIComponent(selectedDoc.file)}`}
              title={selectedDoc.title}
              className="w-full h-full rounded-b-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Bibliothéque;
