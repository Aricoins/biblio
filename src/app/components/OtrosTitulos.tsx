import React from 'react';
import { useEffect, useState } from 'react';
import json from '../api/libros.json';
import styles from './libro.module.css'

export default function OtrosTitulos() {
 
 const [libros, setLibros] = useState<any>([]);

    useEffect(() => {
        setLibros(json);
    }, []);

    if (!libros) {
        return <div>Product not found!</div>;
    }


 
 
 
    return (

        <div className={styles.otros}>


<h1 className={styles.otrostitulos}> Todos los títulos </h1>
            

{libros.map((libro: any) => (
                <div key={libro.id}>
                    <h2 className={styles.otrotitulo}>{libro.titulo}</h2>
                    <p className={styles.otroauthor}>Autor: {libro.autor}</p>
                                   
                </div>
            ))}



</div>
    );
}