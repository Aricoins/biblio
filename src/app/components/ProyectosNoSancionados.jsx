import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';
import styles from "./style.module.css"

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


  const sortedFilteredData = sortData(filteredData, sortOrder);

  const visibleRowsData = sortedFilteredData.slice(0, visibleRows);

  // const handleShowMore = () => {
  //   setVisibleRows((prevRows) => Math.min(prevRows + 9, filteredData.length));
  //   setShowLessButton(true);
  // };
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

const handleSort = () => {
  setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  setVisibleRows(visibleRows); // Mostrar todas las filas al cambiar el orden
  setShowLessButton(true); // Mostrar el botón "Ver menos"
};

  const sortedData = sortData(visibleRowsData, sortOrder);
  return (
<>
  <h2
    className={`${styles.h2} ${styles.h2Background}`}
    onClick={() => setIsComponentVisible((prevVisibility) => !prevVisibility)}
  >
    Proyectos No Sancionados
  </h2>
  {isComponentVisible && (
    <div className={`${styles.block}`}>
      <input
        type="text"
        value={projectSearch}
        onChange={(e) => setProjectSearch(e.target.value)}
        placeholder="Número..."
        className={`${styles.input} ${styles.searchInput}`}
      />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder=" Resumen..."
        className={`${styles.input} ${styles.projectSearchInput}`}
      />
      <table className={`${styles.table} ${styles.fullWidth} ${styles.textWhite} ${styles.borderCollapse} ${styles.border}`}>
        <thead>
          <tr>
            <th className={`${styles.tableHeader1} ${styles.border} ${styles.cursorPointer}`} onClick={handleSort}>
              Número {sortOrder === 'asc' ? '▼' : '▲'}
            </th>
            <th className={`${styles.tableHeader2} ${styles.border2}`}>Resumen</th>
            <th className={`${styles.tableHeader2} ${styles.border3}`}>Tipo Norma</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              {row['Link'] ? (
                <td className={`${styles.tableCell} ${styles.linkCell}`}>
                  <Link
                    href={row['Link']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.link} ${styles.hoverUnderline} ${styles.hoverBg} ${styles.hoverP} ${styles.hoverText} ${styles.rounded} ${styles.borderSlate} ${styles.visitedOpacity}`}
                  >
                    {row['Proyecto']}
                  </Link>
                </td>
              ) : (
                <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`}>
                  {row['Proyecto']}
                </td>
              )}
              <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`}>{row['Resumen']}</td>
              <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`}>{row['Tipo Norma']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleRows < filteredData.length && (
        <>
          <div className={`${styles.table} ${styles.flex} ${styles.justifyEnd} ${styles.mr0}`}>
            <button
              onClick={handleShowMore}
              className={`${styles.mt4} ${styles.ml4} ${styles.bgRed500} ${styles.textWhite} ${styles.px4} ${styles.py2} ${styles.roundedMd} ${styles.hoverBgRed600}`}
            >
              Ver más...
            </button>
            {showLessButton ? (
              <button
                onClick={handleShowLess}
                className={`${styles.mt4} ${styles.ml4} ${styles.bgRed500} ${styles.textWhite} ${styles.px4} ${styles.py2} ${styles.roundedMd} ${styles.hoverBgRed600}`}
              >
                Ver menos...
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  )}
</>

  );
}

export default ProyectosNoSancionados;

