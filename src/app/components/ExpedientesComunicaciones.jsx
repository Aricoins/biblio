import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';

function ExpedientesComunicaciones() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [visibleRows, setVisibleRows] = useState(10); // Nuevo estado para gestionar la cantidad de filas a mostrar

  useEffect(() => {
    axios
      .get(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSAycv4tgekAevzQpI9YTAfriCbuTPWuHhrBwbyF5rZqGMCq-8LcSGf3Av0QI2NR5VLupuLBrSMmcGS/pub?output=csv'
      )
      .then((response) => {
        const results = Papa.parse(response.data, { header: true });
        setData(results.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const filteredData = data.filter((row) => {
    if (search && projectSearch) {
      return (
        diacritics.remove(row['Resumen'].toLowerCase()).includes(
          diacritics.remove(search.toLowerCase())
        ) &&
        row['Proyecto'].toLowerCase().includes(projectSearch.toLowerCase())
      );
    } else if (search) {
      return (
        diacritics.remove(row['Resumen'].toLowerCase()).includes(
          diacritics.remove(search.toLowerCase())
        )
      );
    } else if (projectSearch) {
      return row['Proyecto'].toLowerCase().includes(projectSearch.toLowerCase());
    }

    return true;
  });

  // Filtrar solo las filas visibles según el estado
  const visibleRowsData = filteredData.slice(0, visibleRows);

  return (
    <div className="max-w-3xl mx-auto p-4 my-10 border border-black">
      <h2 className="text-2xl font-semibold text-center mt-2 p-5">Expedientes Comunicaciones</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar en Resumen..."
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        value={projectSearch}
        onChange={(e) => setProjectSearch(e.target.value)}
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
          {visibleRowsData.map((row, index) => (
            <tr key={index}>
              {row['Link'] ? (
                <td className="border p-6 w-32 bg-gray-200 justify-center text-center">
                  <Link
                    href={row['Link']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:bg-gray-100 hover:p-1 rounded-lg border-slate-800 visited:opacity-20"
                    passHref
                  >
                    {row['Proyecto']}
                  </Link>
                </td>
              ) : (
                <td className="border p-2">{row['Proyecto']}</td>
              )}
              <td className="border p-2">{row['Resumen']}</td>
              <td className="border p-2">{row['Tipo Norma']}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {visibleRows < filteredData.length && (
        <button
          onClick={() => setVisibleRows((prevRows) => prevRows + 10)}
          className="mt-4 bg-blue-500 text-white px-4 py
          -2 rounded-md hover:bg-blue-600">
          Ver más...
        </button>
      )}
    </div>
  );
}

export default ExpedientesComunicaciones;
