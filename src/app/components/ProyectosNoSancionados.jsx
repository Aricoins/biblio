import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';
import styles from './style.module.css';
import Swal from 'sweetalert2';
import logo from '../api/assets/moran.png';

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
      .get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSAycv4tgekAevzQpI9YTAfriCbuTPWuHhrBwbyF5rZqGMCq-8LcSGf3Av0QI2NR5VLupuLBrSMmcGS/pub?output=csv')
      .then((response) => {
        const results = Papa.parse(response.data, { header: true });
        const sortedData = sortData(results.data, 'desc');
        setData(sortedData);
        setVisibleRows(1);
        setShowLessButton(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const filteredData = data.filter((row) => {
    const numeroProyecto = row['Proyecto'].split('-')[0];
    const searchTerm = diacritics.remove(search.toLowerCase());
    const proyectoLowerCase = numeroProyecto.toLowerCase();

    return (
      diacritics.remove(row['Resumen'].toLowerCase()).includes(searchTerm) &&
      (projectSearch === '' || numeroProyecto === projectSearch)
    );
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

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setVisibleRows(visibleRows);
    setShowLessButton(true);
  };

  const sortedData = sortData(visibleRowsData, sortOrder);

  const handleProjectSearchEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of the Enter key
  
      // Check if the event is already handled
      if (!e.handled) {
        e.handled = true;
  
        const matchingProjects = filteredData.filter(
          (row) => row['Proyecto'].split('-')[0] === projectSearch
        );
  
        if (matchingProjects.length === 0) {
          Swal.fire({
            icon:  'info',
            title: 'Atención',
            text: `El Proyecto ${projectSearch} no se encuentra entre los No Sancionados.`,
            footer: 'Ingrese otro número o busque entre los Expedientes Sancionados.',
            customClass: {
              title: `${styles.alert}`, 
              content: `${styles.content}`, 
            },
            background: "#032138",
            color: "white",
            borderRadius: "50%",
          }).then(() => {
            setProjectSearch('');
          });
        }
      }
    }
  };
  

  return (
    <>
      <h2
        className={styles.h2}
        onClick={() => setIsComponentVisible((prevVisibility) => !prevVisibility)}
      >
        Proyectos No Sancionados | 2015 - 2020
      </h2>
      {isComponentVisible && (
        <div className={`${styles.block}`}>
         <input
            type="text"
            value={projectSearch}
            onChange={(e) => setProjectSearch(e.target.value)}
            onKeyDown={handleProjectSearchEnter}
            placeholder="Número..."
            className={`${styles.input} ${styles.searchInput}`}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder=" Descripción Sintética..."
            className={`${styles.input} ${styles.projectSearchInput}`}
          />
          <table
            data-aos="fade-up"
            data-aos-duration="300"
            className={`${styles.table} ${styles.fullWidth} ${styles.textWhite} ${styles.borderCollapse} ${styles.border}`}
          >
            <thead>
              <tr>
                <th className={`${styles.tableHeader1} ${styles.border} ${styles.cursorPointer}`} onClick={handleSort}>
                  Número {sortOrder === 'asc' ? '▼' : '▲'}
                </th>
                <th className={`${styles.tableHeader2} ${styles.border2}`}>Descripción Sintética</th>
                <th className={`${styles.tableHeader2} ${styles.border3}`}>Tipo de Norma</th>
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
              <div className={styles.botones}>
                <button onClick={handleShowMore} className={styles.verMas}>
                  Ver más...
                </button>
                {showLessButton ? (
                  <button onClick={handleShowLess} className={styles.verMenos}>
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