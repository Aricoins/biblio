import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';

function ExpedientesComunicaciones() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [visibleRows, setVisibleRows] = useState(1); 
  const [showLessButton, setShowLessButton] = useState(false); 
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQehN_KoR_FWj8pHcksQjGXLoi_kZeOxQWldM9a-vIGafQiirhDNH8nhdn5qGjEaGrDxSIfcAWVDprP/pub?output=csv'
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
    <>
         <h2
        className="text-xl h-2/4 w-12/12 bg-black text-white my-2 font-semibold text-center cursor-pointer"
        onClick={() => setIsComponentVisible((prevVisibility) => !prevVisibility)}
      >


      Expedientes Comunicaciones
      </h2>

      <div className={`p-0 mt-10 mb-0 border ${isComponentVisible ? 'block' : 'hidden'}`}>
    
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar en Resumen..."
        className="w-8/12 mt-4 ml-4 border placeholder-black border-black p-2 rounded"
      />
      <input
        type="text"
        value={projectSearch}
        onChange={(e) => setProjectSearch(e.target.value)}
        placeholder="Buscar por número..."
        className="w-2/12 mx-10 border placeholder-black border-black p-2 rounded"
      />
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border border-black">Número</th>
            <th className="border">Resumen</th>
            <th className="border">Año</th>
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
                  <button
              onClick={handleShowLess}
              className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Ver menos...
            </button>
               </>
          )}
     
        </div>
        </>
  );
}

export default ExpedientesComunicaciones;
