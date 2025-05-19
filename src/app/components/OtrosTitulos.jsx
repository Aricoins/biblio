import React, { useEffect, useState } from 'react';
import json from '../api/libros.json';
import styles from './libro.module.css';
import AOS from "aos";
import "aos/dist/aos.css";



export default function OtrosTitulos() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    // Ordenar los libros por título alfabéticamente
    const librosOrdenados = json.sort((a, b) => {
      return a.titulo.localeCompare(b.titulo);
    });
    setLibros(librosOrdenados);
  }, []);

  return (
    <div data-aos="fade-left" data-aos-duration= "50000" className={styles.otros} style={{ zIndex: 2 }}>
      <h1 className={styles.otrostitulos}> Todos los títulos </h1>
      {libros.map((libro) => (
        <div key={libro.titulo} className={libro.decla ? styles.otrosdecla : styles.default}>
          <h2 className={styles.otrotitulo}>{libro.titulo}</h2>
          <p className={styles.otroauthor}> de {libro.autor}</p>
          {libro.decla ? (
            <p className={styles.pdecla}> Declaración {libro.decla}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
