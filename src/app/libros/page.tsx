"use client"
import { FC, useEffect, useState } from "react";
import Libro from '../components/Libro';
import axios from 'axios';
import styles from './style.module.css';
import OtrosTitulos from "../components/OtrosTitulos";


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

  useEffect(() => {
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

  



 return (
    <>
      <div className={styles.container}>

        <input  className={styles.inputSearch} type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por título..." />

        <div className={styles.gridContainer}>
       
          {filteredData && filteredData.map((libro: Libro, index) => (
            <Libro data-aos="fade-up" key={index} libro={libro} />
          ))
          
          
          }
    
        </div>
   
        <OtrosTitulos  /> 
 
      </div>
    </>
  );
}

export default Libros;