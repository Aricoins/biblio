import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

function ONGs() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQTz1q8kLsZ3F_PRF0Y-2_Wde3vF7b9WVZVHhX34nbST6RYveyxMOAP_IPe0eIBUxPf4nrORlC8Pjwl/pub?output=csv')
      .then(response => {
        const results = Papa.parse(response.data, { header: true });
        setData(results.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const filteredData = data.filter(row => row.Resumen.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar en Resumen..." />
      <table>
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Resumen</th>
            <th>Tipo Norma</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.Proyecto}</td>
              <td>{row.Resumen}</td>
              <td>{row['Tipo Norma']}</td>
              <td>{row['Link']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ONGs;