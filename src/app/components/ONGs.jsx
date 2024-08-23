import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

function ONGs() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSAycv4tgekAevzQpI9YTAfriCbuTPWuHhrBwbyF5rZqGMCq-8LcSGf3Av0QI2NR5VLupuLBrSMmcGS/pubhtml')
      .then(response => {
        const results = Papa.parse(response.data, { header: true });
        setData(results.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const filteredData = data.filter(row => row.Resumen().includes(search.toLowerCase()));

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