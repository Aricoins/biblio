import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';
import styles from './style.module.css'; // Asegúrate de importar el módulo de estilos correspondiente

const sortData = (data, order) => {
  if (!Array.isArray(data)) {
    console.error('Error: Data is not an array');
    return data;
  }

  return data.slice().sort((a, b) => {
    const [numeroA, cmA, yearA] = a['Numero'].split('-');
    const [numeroB, cmB, yearB] = b['Numero'].split('-');

    if (order === 'desc') {
      return yearB !== yearA ? parseInt(yearB, 10) - parseInt(yearA, 10) : parseInt(numeroB, 10) - parseInt(numeroA, 10);
    } else {
      return yearA !== yearB ? parseInt(yearA, 10) - parseInt(yearB, 10) : parseInt(numeroA, 10) - parseInt(numeroB, 10);
    }
  });
};

function ExpedientesComunicaciones() {
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
      return diacritics.remove(row['Resumen'].toLowerCase()).includes(
        diacritics.remove(search.toLowerCase())
      );
    } else if (projectSearch) {
      return row['Numero'].toLowerCase().includes(projectSearch.toLowerCase());
    }

    return true;
  });

  const sortedFilteredData = sortData(filteredData, sortOrder);
  
  
  const visibleRowsData = sortedFilteredData.slice(0, visibleRows);

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

  const handleHeaderClick = () => {
    setIsComponentVisible((prevVisibility) => !prevVisibility);
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setVisibleRows(visibleRows);
    setShowLessButton(true);
  };

  const sortedData = sortData(visibleRowsData, sortOrder);

  return (
    <>
      <h2
        className={`${styles.h2} ${styles.h2Background}`}
        onClick={() => setIsComponentVisible((prevVisibility) => !prevVisibility)}
      >
        Expedientes Comunicaciones | 1988 - actualidad
      </h2>
      {isComponentVisible && (
        <div className={styles.block}>
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
            placeholder="Resumen..."
            className={`${styles.input} ${styles.projectSearchInput}`}
          />
          <table  data-aos="fade-up" className={`${styles.table} ${styles.fullWidth} ${styles.textWhite} ${styles.borderCollapse} ${styles.border}`}>
            <thead>
              <tr>
                <th className={`${styles.tableHeader1} ${styles.border} ${styles.cursorPointer}`} onClick={handleSort}>
                  Número {sortOrder === 'asc' ? '▼' : '▲'}
                </th>
                <th className={`${styles.tableHeader2} ${styles.border}`}>Resumen</th>
                <th className={`${styles.tableHeader3} ${styles.border}`}>Año</th>
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
                        passHref
                      >
                        {row['Numero']}
                      </Link>
                    </td>
                  ) : (
                    <td className={`${styles.tableCell
                    } ${styles.border} ${styles.padding}`}>{row['Numero']}</td>
                    )}
                    <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`}>{row['Resumen']}</td>
                    <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`}>{row['Año']}</td>
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
  
  export default ExpedientesComunicaciones;
  