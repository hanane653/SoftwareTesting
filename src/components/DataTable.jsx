const DataTable = ({ data }) => {
    if (!data || data.length === 0) return <p>Aucune donnée à afficher.</p>;
  
    const headers = Object.keys(data[0],data[1]);

  
    return (
      <table border="2">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
export default DataTable;  