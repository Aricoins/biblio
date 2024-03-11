import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';
import styles from "./style.module.css"

function ProyectosNoSancionados() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [visibleRows, setVisibleRows] = useState(1);
  const [showLessButton, setShowLessButton] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    axios
      .get(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSAycv4tgekAevzQpI9YTAfriCbuTPWuHhrBwbyF5rZqGMCq-8LcSGf3Av0QI2NR5VLupuLBrSMmcGS/pub?output=csv'
      )
      .then((response) => {
        const results = Papa.parse(response.data, { header: true });
        const sortedData = sortData(results.data, 'desc'); // Ordena los datos inicialmente
        setData(sortedData);
        setVisibleRows(1);
        setShowLessButton(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const sortData = (data, order) => {
    return data.sort((a, b) => {
      const projectA = parseInt(a['Proyecto'].split('-')[0], 10);
      const yearA = parseInt(a['Proyecto'].split('-')[1], 10);

      const projectB = parseInt(b['Proyecto'].split('-')[0], 10);
      const yearB = parseInt(b['Proyecto'].split('-')[1], 10);

      if (order === 'asc') {
        return yearA !== yearB ? yearA - yearB : projectA - projectB;
      } else {
        return yearB !== yearA ? yearB - yearA : projectB - projectA;
      }
    });
  };

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
    setVisibleRows((prevRows) => Math.min(prevRows + 9, filteredData.length));
    setShowLessButton(true);
  };

  const handleShowLess = () => {
    setVisibleRows(1);
    setShowLessButton(false);
  };

const handleSort = () => {
  setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  setVisibleRows(visibleRows); // Mostrar todas las filas al cambiar el orden
  setShowLessButton(true); // Mostrar el botón "Ver menos"
};

  const sortedData = sortData(visibleRowsData, sortOrder);
  return (
    <>
      <h2
        className={styles.h2}
        onClick={() => setIsComponentVisible((prevVisibility) => !prevVisibility)}
      >
        Proyectos No Sancionados
      </h2>
      {isComponentVisible && (
      <div className={`  ? 'block' : 'hidden'}`}>
       
        <input
          type="text"
          value={projectSearch}
          onChange={(e) => setProjectSearch(e.target.value)}
          placeholder="Número..."
          className="w-2/12 my-1 border placeholder-black border-black p-1 rounded"
        />
         <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar en Resumen..."
          className="w-8/12 my-1 border placeholder-black border-black p-1 rounded"
        />
     <table className="w-full text-white bg-gray-500 border-collapse border">
        <thead>
          <tr>
            <th className="border w-2/12 cursor-pointer" onClick={handleSort}>
              Numero {sortOrder === 'asc' ? '▼' : '▲'}
            </th>
            <th className="border w-8/12">Resumen</th>
            <th className="border w-4/12">Tipo Norma</th>
          </tr>
        </thead>

          <tbody>
            {visibleRowsData.map((row, index) => (
              <tr key={index}>
                {row['Link'] ? (
                  <td className="border w-2/12 p-1 bg-gray-800 justify-center text-center">
                    <Link
                      href={row['Link']}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:bg-gray-100 hover:p-1 hover:text-black rounded-lg border-slate-800 visited:opacity-20"
                      passHref
                    >
                      {row['Proyecto']}
                    </Link>
                  </td>
                ) : (
                  <td className="border p-1">{row['Proyecto']}</td>
                )}
                <td className="border p-1">{row['Resumen']}</td>
                <td className="border p-1">{row['Tipo Norma']}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleRows  < filteredData.length && (
          <>
          <div className="flex flex-row justify-end mr-0">
            <button
              onClick={handleShowMore}
              className="m-1  bg-gray-800 text-white p-1 rounded-md hover:bg-gray-600"
            >
                           Ver más...
            </button>
        { showLessButton ? (    <button
              onClick={handleShowLess}
              className="m-1 relative bg-slate-600 text-white p-1 rounded-md hover:bg-gray-600"
            >
              Ver menos...
            </button>): null}
            </div>
          </>
        )}
      </div>) }
    </>
  );
}

export default ProyectosNoSancionados;

