import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import diacritics from 'diacritics';
import Link from 'next/link';
import styles from './style.module.css';

function PCM() {
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
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVE-Kl6UMQgVck3WUQ6FSm6vJF-LLQInvnapo-zuk_zMszIN1PP3BCsSBN_-aRWllb1Y3S_i3_bAB0/pub?output=csv'
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
        diacritics
          .remove(row['Resumen'].toLowerCase())
          .includes(diacritics.remove(search.toLowerCase())) &&
        row['Numero'].toLowerCase().includes(projectSearch.toLowerCase())
      );
    } else if (search) {
      return diacritics
        .remove(row['Resumen'].toLowerCase())
        .includes(diacritics.remove(search.toLowerCase()));
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

  const handleAll = () => {
    setVisibleRows(15000);
  };

  const handleShowLess = () => {
    if (visibleRows > 1) {
      setVisibleRows((prevRows) => prevRows - 10);
      setShowLessButton(!visibleRows ? false : true);
    }
  };

  const sortData = (data, order) => {
    return data.sort((a, b) => {
      const [numeroA, cmA, yearA] = a['Numero'].split('-');
      const [numeroB, cmB, yearB] = b['Numero'].split('-');

      if (order === 'asc') {
        return yearA !== yearB ? parseInt(yearA, 10) - parseInt(yearB, 10) : parseInt(numeroA, 10) - parseInt(numeroB, 10);
      } else {
        return yearB !== yearA ? parseInt(yearB, 10) - parseInt(yearA, 10) : parseInt(numeroB, 10) - parseInt(numeroA, 10);
      }
    });
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
        Resoluciones PCM | 1988 - actualidad
      </h2>
      {isComponentVisible && (
      <div
        className={`p-0 mt-10 mb-0 border ${isComponentVisible ? styles.block : styles.hidden}`}
      >
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
          placeholder="Buscar en Resumen..."
          className={`${styles.input} ${styles.projectSearchInput}`}
        />
        
          <table className={`${styles.table} ${styles.fullWidth} ${styles.textWhite} ${styles.borderCollapse} ${styles.border}`}>
          <thead>
            <tr>
              <th className={`${styles.tableHeader1} `} onClick={handleSort}>
                Número {sortOrder === 'asc' ? '▼' : '▲'}
              </th>
              <th className={styles.tableHeader2}>Resumen</th>
              <th className={styles.tableHeader3}>Año</th>
            </tr>
          </thead>
          <tbody>
            {visibleRowsData.map((row, index) => (
              <tr key={index}>
                {row['Link'] ? (
                  <td className={`${styles.border} ${styles.p6} ${styles.w32} ${styles.bgGray200} ${styles.justifyCenter} ${styles.textCenter}`}>
                    <Link
                      href={row['Link']}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.hoverUnderline} ${styles.hoverBgGray100} ${styles.hoverP1} ${styles.roundedLg} ${styles.borderSlate800} ${styles.visitedOpacity20}`}
                      passHref
                    >
                      {row['Numero']}
                    </Link>
                  </td>
               
) :(
  <td className={`${styles.tableCell} ${styles.border} ${styles.padding}`}>{row['Numero']}</td>
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
className={`${styles.mt4} ${styles.bgBlue500} ${styles.textWhite} ${styles.px4} ${styles.py2} ${styles.roundedMd} ${styles.hoverBgGray}`}
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

export default PCM;
