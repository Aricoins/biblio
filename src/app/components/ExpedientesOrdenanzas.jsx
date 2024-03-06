import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';

function ExpedientesOrdenanzas() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [visibleRows, setVisibleRows] = useState(1);
  const [showLessButton, setShowLessButton] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vRG6dLsp3OS5Yh7KafIfj989OB-kQXxXJdlZ_loCJ1aKk8cBdXddrwCMpnHdtIqtnQidWIjyPsoLynv/pub?output=csv'
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

  // Filtrar solo las filas visibles según el estado
  const visibleRowsData = filteredData.slice(0, visibleRows);

  const handleHeaderClick = () => {
    setIsComponentVisible((prevVisibility) => !prevVisibility);
  };

  const handleShowMore = () => {
    setVisibleRows((prevRows) => prevRows + 10);
    setShowLessButton(true);
  };

  const handleShowLess = () => {
    if (visibleRows > 1) {
      setVisibleRows((prevRows) => prevRows - 10);
      setShowLessButton(visibleRows - 10 > 0);
    }
  };

  return (
    <>
      <h2
        className="text-xl w-12/12 h-4/4 bg-black text-white font-semibold text-center cursor-pointer"
        onClick={handleHeaderClick}
      >
        Expedientes Ordenanzas
      </h2>
      <div className={`p-0 mt-0 mb-0 border ${isComponentVisible ? 'block' : 'hidden'}`}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Resumen..."
          className="w-8/12 mt-4 ml-4 border placeholder-black border-black p-2 rounded"
        />
        <input
          type="text"
          value={projectSearch}
          onChange={(e) => setProjectSearch(e.target.value)}
          placeholder="Número"
          className="w-2/12 mx-10 border placeholder-black border-black p-2 rounded"
        />
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border">Número</th>
              <th className="border">Resumen</th>
            </tr>
          </thead>
          <tbody>
            {visibleRowsData.map((row, index) => (
              <tr key={index}>
                {row['Link'] ? (
                  <td className="border p-1 bg-gray-200 justify-center text-center text-7x1">
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
              </tr>
                          ))}
                          </tbody>
                        </table>
                
                        {visibleRows < filteredData.length && (
                          <>
                          <div className='flex justify-end '>
                            <button
                              onClick={handleShowMore}
                              className="my-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                              Ver más...
                            </button>
                            </div>
                            {showLessButton && (
                              <div className='flex justify-end'>
                              <button
                                onClick={handleShowLess}
                                className="mt-2  ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                              >
                                Ver menos...
                              </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  );
                }
                
                export default ExpedientesOrdenanzas;
                
