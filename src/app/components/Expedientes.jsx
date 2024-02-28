import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics'; // Importa la biblioteca diacritics

function Expedientes() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');

  useEffect(() => {
    axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSAycv4tgekAevzQpI9YTAfriCbuTPWuHhrBwbyF5rZqGMCq-8LcSGf3Av0QI2NR5VLupuLBrSMmcGS/pub?output=csv')
      .then(response => {
        // Parse CSV string into an array of objects
        const results = Papa.parse(response.data, { header: true });
        setData(results.data);
        console.log('Data: ', results.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const filteredData = data.filter(row => {
    console.log('Search and ProjectSearch:', search, projectSearch);
  
    if (search && projectSearch) {
      // Ambos campos de búsqueda están presentes
      return (
        (row['Resumen '] && typeof row['Resumen '] === 'string' &&
          diacritics.remove(row['Resumen '].toLowerCase()).includes(diacritics.remove(search.toLowerCase()))) &&
        (row['Proyecto'] && typeof row['Proyecto'] === 'string' &&
          row['Proyecto'].toLowerCase().includes(projectSearch.toLowerCase()))
      );
    } else if (search) {
      // Solo el campo de búsqueda 'Resumen' está presente
      return (
        row['Resumen '] && typeof row['Resumen '] === 'string' &&
        diacritics.remove(row['Resumen '].toLowerCase()).includes(diacritics.remove(search.toLowerCase()))
      );
    } else if (projectSearch) {
      // Solo el campo de búsqueda 'Proyecto' está presente
      return (
        row['Proyecto'] && typeof row['Proyecto'] === 'string' &&
        row['Proyecto'].toLowerCase().includes(projectSearch.toLowerCase())
      );
    }
  
    // Ningún campo de búsqueda está presente
    return true;
  });


  return (
    <div className="max-w-3xl mx-auto p-4">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar en Resumen..."
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        value={projectSearch}
        onChange={e => setProjectSearch(e.target.value)}
        placeholder="Buscar por número de Proyecto..."
        className="w-full mb-4 p-2 border rounded"
      />
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Proyecto</th>
            <th className="border p-2">Resumen</th>
            <th className="border p-2">Tipo Norma</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{row['Proyecto']}</td>
              <td className="border p-2">{row['Resumen ']}</td>
              <td className="border p-2">{row['Tipo Norma']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Expedientes;
