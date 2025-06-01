import React, { useState } from "react";
import * as XLSX from "xlsx";
import DataTable from "./DataTable";

const ExcelReader = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Nom de la première feuille
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet); // Convertir en JSON
      setData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="mt-40 mb-40" >
      <h1>Importer un fichier Excel</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      
      <div>
  <h2>Données extraites :</h2>
  <pre>{JSON.stringify(data, null, 2)}</pre>
</div>
      
    </div>
  );
};

export default ExcelReader;
