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
import { Modal } from 'antd';


const sortData = (data) => {
  return data.sort((a, b) => {
      // Ordenar por año de forma descendente
      const yearA = parseInt(a['Año']);
      const yearB = parseInt(b['Año']);
      if (yearA !== yearB) {
          return yearB - yearA;
      }

      // Si los años son iguales, ordenar por número de forma descendente
      const numberA = parseInt(a['Numero']);
      const numberB = parseInt(b['Numero']);
      return numberB - numberA;
  });
};

function PCM() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [visibleRows, setVisibleRows] = useState(1);
  const [showLessButton, setShowLessButton] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');
  const [numProjectsWithLink, setNumProjectsWIthLink] = useState(0);
  const [numSearchResults, setNumSearchResults] = useState(0);
  const [numVisibleResults, setNumVisibleResults] = useState(0);
  const [startYear, setStartYear] = useState('');
const [endYear, setEndYear] = useState('');
const [filtroAño, setFiltroAño] = useState(false); 


  
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
      }, 1);
    };
    const timeout = setTimeout(incrementCount, 50);

    // Clean up the timeout if the component unmounts before it completes
    return () => clearTimeout(timeout);
  };
  useEffect(() => {
    axios
        .get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSVE-Kl6UMQgVck3WUQ6FSm6vJF-LLQInvnapo-zuk_zMszIN1PP3BCsSBN_-aRWllb1Y3S_i3_bAB0/pub?output=csv')
        .then((response) => {
            const results = Papa.parse(response.data, { header: true });
            const sortedData = sortData(results.data); // Ordenar datos después de recibirlos
            setData(sortedData);
            
            // Calcular cantidad de proyectos con enlace
            const numProjectsWithLink = sortedData.filter(row => row['Link']).length;
            setNumProjectsWIthLink(numProjectsWithLink);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}, []);

useEffect(() => {
  
    // Calcular la cantidad de resultados de búsqueda
    const numSearchResults = data.filter((row) => {
      if (row['Proyecto']) {
        const numeroProyecto = row['Proyecto'].split('-')[0];
        const searchTerm = diacritics.remove(search.toLowerCase());
        const proyectoLowerCase = numeroProyecto.toLowerCase();
    
        return (
          diacritics.remove(row['Resumen'].toLowerCase()).includes(searchTerm) &&
          (projectSearch === '' || numeroProyecto === projectSearch)
        );
      } else {
        return false; // Ignorar filas sin valor en 'Proyecto'
    }
    }).length;
    
    setNumSearchResults(numSearchResults);
  }, [data, search, projectSearch]);
  useEffect(() => {
    // Calcular la cantidad de resultados visibles
    setNumVisibleResults(visibleRows);
  }, [visibleRows]);
  

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
          (row) => row['Numero'].split('-')[0] === projectSearch
        );
  
        if (matchingProjects.length === 0) {
          Swal.fire({
            icon:  'info',
            title: 'Atención',
            text: `No se encuentra PCM ${projectSearch} .`,
            footer: 'Ingrese otro número o busque entre los Expedientes Sancionados.',
            customClass: {
              title: `${styles.alert}`, 
              content: `${styles.content}`, 
            },
            background: "#a7a6a8",
            color: "white",
                   }).then(() => {
            setProjectSearch('');
          });
        }
      }
    }
  };
  
  const handleFiltroAño = (e) => {
    e.preventDefault();
    
    filtroAño === false ? setFiltroAño(true) : setFiltroAño(false);
  }

  return (
    <>
      <h2
        className={styles.h2PCM}
        onClick={() => {
          setIsComponentVisible((prevVisibility) => !prevVisibility); }}
      >
      Resoluciones de Presidecia (PCM)
  
      </h2>
      <p  data-aos="fade-left" 
                style={{ 
                    fontSize: "small",
                    fontWeight: "400",
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    marginBottom: "3%",
                    padding: "1%",
                    cursor: "pointer",
                    backgroundColor: "rgb(236, 233, 232)",
                    color: "black",
                    fontFamily: "Times New Roman",
                    borderRadius: "5px",
                    border: ".5px solid black",
                    transition: "1s",
                    marginLeft: "5%",
                    width: "40%",
                    margin: "1% 0  0  auto"
                }}> 1988 - actualidad</p>
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
            <p className={styles.escaneados}> Expedientes escaneados: {numProjectsWithLink -1 } de {data.length -1}</p>
            </div>
            <div onClick={handleFiltroAño} className={styles.filtroAño}>
  Filtrar por año
  {filtroAño && (
            <Modal
  title="Filtrar por año"
  visible={filtroAño}
  onOk={handleFiltroAño}
  onCancel={handleFiltroAño}
>
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
</Modal>)}
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
                <th  className={styles.tableHeader3}>Año</th>
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
                <MdExpandMore /><p className={styles.mas}> Más </p>  
                </button>
                {showLessButton ? (
                  <button onClick={handleShowLess} className={styles.verMenos}>
                   <p className={styles.mas}>Menos</p> <MdExpandLess /> 
                  </button>
                ) : null}
              </div>
            </>
          )}
           <p data-aos="fade-left" style={{textAlign: "center", backgroundColor: "black", color: "white", fontSize: "medium", backgroundColor: "orangered", color: "white", padding: "1%", borderRadius: "5px"}}>
            Busque <Link href="/pcm" style={{textDecoration: "none", color: "black", backgroundColor: "whjite"}}>aquí </Link>el expediente de las normas originadas por PCM <i>Ad Reférendum</i> aprobadas  por el Concejo. </p>
        </div>
      )}
             

    </>
  );
}

export default PCM;