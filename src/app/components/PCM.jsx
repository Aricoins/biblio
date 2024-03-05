import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';

function ExpedientesResoluciones() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [visibleRows, setVisibleRows] = useState(1); 
  const [showLessButton, setShowLessButton] = useState(false); 

  useEffect(() => {
    axios
      .get(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVE-Kl6UMQgVck3WUQ6FSm6vJF-LLQInvnapo-zuk_zMszIN1PP3BCsSBN_-aRWllb1Y3S_i3_bAB0/pub?output=csv'
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
        row['Numero'].toLowerCase().includes(projectSearch.toLowerCase())
      );
    } else if (search) {
      return (
        diacritics.remove(row['Resumen'].toLowerCase()).includes(
          diacritics.remove(search.toLowerCase())
        )
      );
    } else if (projectSearch) {
      return row['Numero'].toLowerCase().includes(projectSearch.toLowerCase());
    }

    return true;
  });

  const visibleRowsData = filteredData.slice(0, visibleRows);

  const handleShowMore = () => {
    setVisibleRows((prevRows) => prevRows + 10);
    setShowLessButton(true);
  };

  const handleShowLess = () => {
    if (visibleRows > 10) {
      setVisibleRows((prevRows) => prevRows - 10);
    
      setShowLessButton(false);
   
    } else {
      setVisibleRows(10);
     }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 my-10 border border-black">
      <h2 className="text-2xl font-semibold text-center mt-2 p-5">Resoluciones PCM</h2>
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
        placeholder="Buscar por número..."
        className="w-full mb-4 p-2 border rounded"
      />
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Número</th>
            <th className="border p-2">Resumen</th>
            <th className="border p-2">Año</th>
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
                    {row['Numero']}
                  </Link>
                </td>
              ) : (
                <td className="border p-2">{row['Numero']}</td>
              )}
              <td className="border p-2">{row['Resumen']}</td>
              <td className="border p-2">{row['Año']}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {visibleRows < filteredData.length && (
        <>
          <button
            onClick={handleShowMore}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Ver más...
          </button>
          {showLessButton && (
            <button
              onClick={handleShowLess}
              className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Ver menos...
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ExpedientesResoluciones;
