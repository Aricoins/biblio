import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';
import styles from './style.module.css';
import Swal from 'sweetalert2';
import logo from '../api/assets/moran.png';
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { match } from 'assert';

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
  const [visibleRows, setVisibleRows] = useState(0);
  const [showLessButton, setShowLessButton] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');
  const [numProjectsWithLink, setNumProjectsWIthLink] = useState(0);
  const [numSearchResults, setNumSearchResults] = useState(0);
  const [numVisibleResults, setNumVisibleResults] = useState(0);
  

const animatedCount = () =>{
    let count = 0;
    const totalProjects = data.length;

    const incrementCount = () => {
      // Increment the count by 1 every 100 milliseconds
      const interval = setInterval(() => {
        if (totalProjects >= count) count++;
        setNumProjectsWIthLink(count);
        // Once count reaches the total number of projects, clear the interval
        if (count >= totalProjects) {
          clearInterval(interval);
        }
      }, 10);
    };

    // Start incrementing the count after a delay
    const timeout = setTimeout(incrementCount, 50);

    // Clean up the timeout if the component unmounts before it completes
    return () => clearTimeout(timeout);
  };


  useEffect(() => {
     axios
      .get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSAycv4tgekAevzQpI9YTAfriCbuTPWuHhrBwbyF5rZqGMCq-8LcSGf3Av0QI2NR5VLupuLBrSMmcGS/pub?output=csv')
      .then((response) => {
        const results = Papa.parse(response.data, { header: true });
        const sortedData = sortData(results.data, 'desc');
        setData(sortedData);
        setVisibleRows(1);
        setShowLessButton(false);
        const numProjectsWithLink = sortedData.filter(row => row['Link']).length;
        setNumProjectsWIthLink(numProjectsWithLink);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
     
      console.log(data)
  }, []);

  useEffect(() => {
    // Calcular la cantidad de resultados de búsqueda
    const numSearchResults = data.filter((row) => {
      const numeroProyecto = row['Proyecto'].split('-')[0];
      const searchTerm = diacritics.remove(search.toLowerCase());
      const proyectoLowerCase = numeroProyecto.toLowerCase();

      return (
        diacritics.remove(row['Resumen'].toLowerCase()).includes(searchTerm) &&
        (projectSearch === '' || numeroProyecto === projectSearch)
      );
    }).length;
    setNumSearchResults(numSearchResults);
  }, [data, search, projectSearch]);
  useEffect(() => {
    // Calcular la cantidad de resultados visibles
    setNumVisibleResults(visibleRows);
  }, [visibleRows]);
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
            background: "#570c7a",
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
        onClick={() => {
          setIsComponentVisible((prevVisibility) => !prevVisibility);
          animatedCount();
        }}
        
      >
        Proyectos No Sancionados | 2011 - 2023
      </h2>
      {isComponentVisible && (
        <div className={styles.block}>
          <div className={styles.inputsydata
        }>         <input
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
          <p className={styles.escaneados}> Expedientes escaneados: {numProjectsWithLink -1 } de {data.length -1}</p>
          
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
                <MdExpandMore /><p className={styles.mas}> Más </p>  
                </button>

               {search ? ( <p className={styles.datos}>Mostrando {numVisibleResults} resultado(s) de  {numSearchResults}</p>): null}
                {showLessButton ? (
                    <>
                  <button onClick={handleShowLess} className={styles.verMenos}>
                   <p className={styles.mas}>Menos</p> <MdExpandLess /> 
                  </button></>
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