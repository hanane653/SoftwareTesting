//chartExcel
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Upload } from 'lucide-react';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

const ExcelCharts = () => {
  const [sheets, setSheets] = useState({});
  const [activeSheet, setActiveSheet] = useState('');
  const [chartType, setChartType] = useState('line');

  // Couleurs Attijari
  const colors = {
    primary: "#FF6B00",    // Orange Attijari
    secondary: "#000000",  // Noir Attijari
    accent: "#FFD700",     // Jaune Attijari
    hover: "#E65100",      // Orange foncé
  };

  const CHART_COLORS = [
    colors.primary,
    colors.secondary,
    colors.accent,
    colors.hover,
    '#4B5563',
    '#1D4ED8',
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetsData = {};

        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          sheetsData[sheetName] = jsonData;
        });

        setSheets(sheetsData);
        setActiveSheet(workbook.SheetNames[0]);
      } catch (error) {
        console.error("Erreur lors de la lecture du fichier Excel:", error);
        alert("Erreur lors de la lecture du fichier. Vérifiez que c'est un fichier Excel valide.");
      }
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const prepareChartData = (data) => {
    if (!data || data.length === 0) return [];
    
    // Prend les clés du premier objet comme colonnes
    const columns = Object.keys(data[0]);
    
    // Exclut la première colonne comme axe X
    const xAxis = columns[0];
    const metrics = columns.slice(1);

    return data.map(row => ({
      name: row[xAxis],
      ...metrics.reduce((acc, metric) => ({
        ...acc,
        [metric]: parseFloat(row[metric]) || 0
      }), {})
    }));
  };

  const renderChart = (data) => {
    if (!data || data.length === 0) return null;

    const chartData = prepareChartData(data);
    const metrics = Object.keys(chartData[0]).filter(key => key !== 'name');

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart type="line" data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {metrics.map((metric, index) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {metrics.map((metric, index) => (
                <Bar
                  key={metric}
                  dataKey={metric}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey={metrics[0]}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Section Upload */}
          <div className="mb-8">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="excel-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                style={{ borderColor: colors.primary }}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload 
                    size={48} 
                    className="mb-3"
                    style={{ color: colors.primary }}
                  />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                  </p>
                  <p className="text-xs text-gray-500">Fichier Excel (XLSX, XLS)</p>
                </div>
                <input
                  id="excel-upload"
                  type="file"
                  className="hidden"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>

          {/* Sélection des feuilles et type de graphique */}
          {Object.keys(sheets).length > 0 && (
            <div className="flex flex-wrap gap-4 mb-6">
              <select
                value={activeSheet}
                onChange={(e) => setActiveSheet(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {Object.keys(sheets).map((sheetName) => (
                  <option key={sheetName} value={sheetName}>
                    {sheetName}
                  </option>
                ))}
              </select>

              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="line">Graphique linéaire</option>
                <option value="bar">Graphique à barres</option>
                <option value="pie">Graphique circulaire</option>
              </select>
            </div>
          )}

          {/* Affichage des graphiques */}
          {activeSheet && sheets[activeSheet] && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                Visualisation des données : {activeSheet}
              </h3>
              {renderChart(sheets[activeSheet])}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelCharts;