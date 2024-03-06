import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';

function ProyectosNoSancionados() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [visibleRows, setVisibleRows] = useState(1);
  const [showLessButton, setShowLessButton] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);

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

  const handleShowMore = () => {
    setVisibleRows((prevRows) => prevRows + 10);
    setShowLessButton(true);
  };

  const handleShowLess = () => {
    if (visibleRows > 10) {
      setVisibleRows((prevRows) => prevRows - 10);

      setShowLessButton(false);
    } else {
      setVisibleRows(10)
    }
  };

  return (
    <>
      <h2
        className="text-xl h-2/4 w-12/12 bg-black text-white my-2 font-semibold text-center cursor-pointer"
        onClick={() => setIsComponentVisible((prevVisibility) => !prevVisibility)}
      >
        Proyectos No Sancionados
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
          placeholder="Por número..."
          className="w-2/12 mx-10 border placeholder-black border-black p-2 rounded"
        />
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border">Proyecto</th>
              <th className="border">Resumen</th>
              <th className="border">Tipo Norma</th>
            </tr>
          </thead>
          <tbody>
            {visibleRowsData.map((row, index) => (
              <tr key={index}>
                {row['Link'] ? (
                  <td className="border p-1 bg-gray-200 justify-center text-center">
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

export default ProyectosNoSancionados;

