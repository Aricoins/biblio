import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';
import styles from './style.module.css';
import Swal from 'sweetalert2';
import { MdExpandMore, MdExpandLess } from "react-icons/md";

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
  const [numProjectsWithLink, setNumProjectsWithLink] = useState(0);
  const [numSearchResults, setNumSearchResults] = useState(0);
  const [numVisibleResults, setNumVisibleResults] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSAycv4tgekAevzQpI9YTAfriCbuTPWuHhrBwbyF5rZqGMCq-8LcSGf3Av0QI2NR5VLupuLBrSMmcGS/pub?output=csv');
        const results = Papa.parse(response.data, { header: true });
        const sortedData = sortData(results.data, 'desc');
        setData(sortedData);
        const numProjectsWithLink = sortedData.filter(row => row['Link']).length;
        setNumProjectsWithLink(numProjectsWithLink);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const numSearchResults = data.filter((row) => {
      const numeroProyecto = row['Proyecto'].split('-')[0].replace(/^0+/, ''); // Remove leading zeros
      const searchTerm = diacritics.remove(search.toLowerCase());
      return (
        diacritics.remove(row['Resumen'].toLowerCase()).includes(searchTerm) &&
        (projectSearch === '' || numeroProyecto === projectSearch.replace(/^0+/, '')) // Remove leading zeros
      );
    }).length;
    setNumSearchResults(numSearchResults);
  }, [data, search, projectSearch]);

  useEffect(() => {
    setNumVisibleResults(visibleRows);
  }, [visibleRows]);

  const handleShowMore = () => {
    setVisibleRows((prevRows) => {
      const newVisibleRows = prevRows + 10;
      return newVisibleRows > data.length ? data.length : newVisibleRows;
    });
    setShowLessButton(true);
  };

  const handleShowLess = () => {
    setVisibleRows((prevRows) => {
      const newVisibleRows = prevRows - 10;
      return newVisibleRows < 10 ? 1 : newVisibleRows;
    });
    if (visibleRows >= 1 || data > 1) {
      setShowLessButton(true);
    }
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleProjectSearchEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const searchNumber = projectSearch.replace(/^0+/, ''); // Remove leading zeros
      const matchingProjects = data.filter(
        (row) => row['Proyecto'].split('-')[0].replace(/^0+/, '') === searchNumber
      );

      if (matchingProjects.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'Atención',
          text: `El Proyecto ${projectSearch} no se encuentra entre los No Sancionados.`,
          footer: 'Ingrese otro número o busque entre los Expedientes Sancionados.',
          customClass: {
            title: `${styles.alert}`,
            content: `${styles.content}`,
          },
          background: "#a7a6a8",
          color: "white",
          borderRadius: "50%",
        }).then(() => {
          setProjectSearch('');
        });
      }
    }
  };

  const filteredData = data.filter((row) => {
    const numeroProyecto = row['Proyecto'].split('-')[0].replace(/^0+/, ''); // Remove leading zeros
    const searchTerm = diacritics.remove(search.toLowerCase());
    return (
      diacritics.remove(row['Resumen'].toLowerCase()).includes(searchTerm) &&
      (projectSearch === '' || numeroProyecto === projectSearch.replace(/^0+/, '')) // Remove leading zeros
    );
  });

  const sortedFilteredData = sortData(filteredData, sortOrder);
  const visibleRowsData = sortedFilteredData.slice(0, visibleRows);

  return (
    <>
      <h2
        className={styles.h2}
        onClick={() => {
          setIsComponentVisible((prevVisibility) => !prevVisibility);
        }}
      >
        Expedientes Sin Sanción | 2011 - 2023
      </h2>

      {isComponentVisible && (
        <div className={styles.block}>
          <div className={styles.inputsydata}>
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
              placeholder='Descripción Sintética... '
              className={`${styles.input} ${styles.projectSearchInput}`}
            />
            <p className={styles.escaneados}>Expedientes escaneados: {numProjectsWithLink - 1} de {data.length - 1}</p>
          </div>
          <table
            data-aos="fade-up"
            data-aos-duration="300"
            className={`${styles.table} ${styles.fullWidth} ${styles.textWhite} ${styles.borderCollapse} ${styles.border}`}
          >
            <thead>
              <tr>
                <th className={styles.tableHeader1} onClick={handleSort}>
                  Número {sortOrder === 'asc' ? '▼' : '▲'}
                </th>
                <th className={`${styles.tableHeader2} ${styles.border2}`}>Descripción Sintética</th>
                <th className={`${styles.tableHeader3} ${styles.border3}`}>Tipo de Norma</th>
              </tr>
            </thead>
            <tbody>
              {visibleRowsData.map((row, index) => (
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
                    <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`} style={{textAlign: "center"}}>
                      {row['Proyecto']}
                    </td>
                  )}
                  <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`}>{row['Resumen']}</td>
                  <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`}>{row['Tipo Norma']}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.buttonsContainer}>
            {visibleRowsData.length > 0 && (
              <div className={styles.buttons}>
                {visibleRowsData.length > 10 && showLessButton && (
                  <button
                    className={styles.showMore}
                    onClick={handleShowLess}
                    disabled={visibleRows === 1}
                  >
                    <MdExpandLess size={24} /> Mostrar menos
                  </button>
                )}
                {visibleRowsData.length < data.length && (
                  <button
                    className={styles.showMore}
                    onClick={handleShowMore}
                    disabled={visibleRows >= data.length}
                  >
                    <MdExpandMore size={24} /> Mostrar más
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProyectosNoSancionados;
