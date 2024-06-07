import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';
import styles from './style.module.css';
import Swal from 'sweetalert2';
import logo from '../api/assets/moran.png';
import { MdExpandMore, MdSportsRugby } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import {Modal} from 'antd';

const sortData = (data, order, isSearch) => {
  return data.sort((a, b) => {
    const yearA = parseInt(a['Año']);
    const yearB = parseInt(b['Año']);
    const projectA = parseInt(a['Numero']);
    const projectB = parseInt(b['Numero']);

    if (yearA !== yearB) {
      // Si los años son diferentes, ordenamos por año.
      return order === 'desc' ? yearB - yearA : yearA - yearB;
    } else {
      // Si los años son iguales, comparamos los números de proyecto.
      return order === 'desc' ? projectB - projectA : projectA - projectB;
    }
  });
};


function ExpedientesResoluciones() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [visibleRows, setVisibleRows] = useState(1);
  const [showLessButton, setShowLessButton] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // Cambiado a 'asc'
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
 const [filtroAño, setFiltroAño] = useState(false); 
  
 useEffect(() => {
    axios
      .get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQYYsJNNXkfrt90nDsIaR3ceaDZqBo6Vwd0fxecHNC4zfgUrwLFl8E9_a-i5HCQ7el0CxlKYugzXAkM/pub?output=csv')
      .then((response) => {
        const results = Papa.parse(response.data, { header: true });
        const sortedData = sortData(results.data);
        setData(sortedData);
        setVisibleRows(1);
        setShowLessButton(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  const filteredData = data.filter((row) => {
    const year = parseInt(row['Año']);
    const isWithinYearRange = (startYear === '' || year >= parseInt(startYear)) &&
                              (endYear === '' || year <= parseInt(endYear));
    const searchTerm = diacritics.remove(search.toLowerCase());
    return (
      isWithinYearRange &&
      diacritics.remove(row['Resumen'].toLowerCase()).includes(searchTerm) &&
      (projectSearch === '' || row['Numero'] === projectSearch)
    );
  });
  



  const sortedFilteredData = sortData(filteredData, sortOrder);
  const visibleRowsData = sortedFilteredData.slice(0, visibleRows);

  const handleShowMore = () => {
    setSortOrder('desc');
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
          (row) => row['Numero'].split('\t')[1] === projectSearch
        );
  
        if (filteredData.length === 0) {
          Swal.fire({
            icon: "info",
          html: `
    No encontramos Resoluciones del Concejo con "<b> ${projectSearch ? projectSearch : search} </b>."
    <br> Pruebe con otra búsqueda
  `,
  showCloseButton: true,
  confirmButtonColor: "#ff5733",
  
          }).then(() => {
            setProjectSearch('');
          });
        }
      }
    }
  };

  let handleNumero = (e) => {
    e.preventDefault();
    setSortOrder('desc');
  setProjectSearch(e.target.value)
  }
   let handleLista = (e) => {
    e.preventDefault();
    setSortOrder('desc');
    setSearch(e.target.value)}


    const handleFiltroAño = (e) => {
      e.preventDefault();
      
      filtroAño === false ? setFiltroAño(true) : setFiltroAño(false);
    }


  return (
    <>
      <h2
        className={styles.h2}
        onClick={() => setIsComponentVisible((prevVisibility) => !prevVisibility)}
      >
       Resoluciones |  actualidad - 1988 
      </h2>
      {isComponentVisible && (
        <div className={`${styles.block}`}>
         <input
            type="text"
            value={projectSearch}
            onChange={handleNumero}
            onKeyDown={handleProjectSearchEnter}
            placeholder="Número..."
            className={`${styles.input} ${styles.searchInput}`}
          />
    
          <input
            type="text"
            value={search}
            onChange={handleLista}
            onKeyDown={handleProjectSearchEnter}
            placeholder='Descripción Sintética... '
            className={`${styles.input} ${styles.projectSearchInput}`}
          />
        <div onClick={handleFiltroAño} className={styles.filtroAño}>
  Filtrar por año
  {filtroAño && (
    <Modal title="Filtrar por año" visible={filtroAño} contentBg="red" onOk={handleFiltroAño} onCancel={handleFiltroAño}>
      <input
        type="number"
        value={startYear}
        onChange={(e) => setStartYear(e.target.value)}
        placeholder="Año inicial"
        className={`${styles.input} ${styles.yearInput}`}
        onClick={(e) => e.stopPropagation()}
      />
      <input
        type="number"
        value={endYear}
        onChange={(e) => setEndYear(e.target.value)}
        placeholder="Año final"
        className={`${styles.input} ${styles.yearInput}`}
        onClick={(e) => e.stopPropagation()}
      />
    </Modal >
  )}
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
                <th className={`${styles.tableHeader2} ${styles.border2}`}>Año</th>
               
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
                        {row['Numero']}
                      </Link>
                    </td>
                  ) : (
                    <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`}>
                      {row['Numero']}
                    </td>
                  )}
                  <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`}>{row['Resumen']}</td>
                  <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`}>{row['Año']}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {visibleRows < filteredData.length && (
            <>
              <div className={styles.botones}>
                <button onClick={handleShowMore} className={styles.verMas}>
                <MdExpandMore /><p className={styles.mas}> </p>  
                </button>
                {showLessButton ? (
                  <button onClick={handleShowLess} className={styles.verMenos}>
                   <p className={styles.mas}></p> <MdExpandLess /> 
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

export default ExpedientesResoluciones;
