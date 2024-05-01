"use client"
import { FC, useEffect, useState } from "react";
import Libro from '../components/Libro';
import axios from 'axios';
import styles from './style.module.css';
import OtrosTitulos from "../components/OtrosTitulos";
import Aos from 'aos';
import 'aos/dist/aos.css';
import {Pagination} from 'antd';

interface Libro {
  titulo: string;
  autor: string;
  decla: string;
  imagen: string;
  resenia: string;
  id: string;
}

const Libros: FC = () => {
  const [data, setData] = useState<Libro[] | null>(null);
  const [search, setSearch] = useState('');
  let backgroundColor = "defaultColor"; 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [paginatedData, setPaginatedData] = useState<Libro[] | null>(null);
  
  useEffect(() => {
    Aos.init({duration: 3000});
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/verLibros');
        setData(response.data.libros);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

const filteredData = data?.filter(libro => libro.titulo.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (filteredData) {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = filteredData.slice(start, end);
        
        setPaginatedData(paginatedData);
    }
}, [currentPage, pageSize, filteredData]);




const handlePageChange = (page: number, size: number) => {
  setCurrentPage(page);
  setPageSize(size);
};



return (
    <>
    <div className={styles.body}>
      <section className={styles.container}>

        <input  className={styles.inputSearch} 
                type="text" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Buscar por título..." />

<div className={styles.gridContainer}>
    {filteredData && paginatedData && paginatedData.map((libro: Libro, index) => (
        <Libro data-aos="fade-up" key={index} libro={libro} />
    ))}
    
    {/* Agrega el componente de paginación */}
    {filteredData && (
        <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={pageSize}
            onChange={handlePageChange}
        />
    )}
</div>

   
        <OtrosTitulos data-aos="fade-right" /> 
 
      </section>
      </div>
    </>
  );
}

export default Libros;