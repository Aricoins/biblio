import React from 'react';
import { useEffect, useState } from 'react';
import json from '../api/libros.json';
import styles from './libro.module.css';
let backgroundColor = "defaultColor"; 


export default function OtrosTitulos() {
 
 const [libros, setLibros] = useState<any>([]);

    useEffect(() => {
        setLibros(json);
    }, []);


 
 
    return (

        <div className={styles.otros}>


<h1 className={styles.otrostitulos}> Todos los títulos </h1>
            

{libros.map((libro: any) => (
                <div key={libro.id}  className= {libro.decla? styles.otrosdecla : styles.default}>
                    <h2 className={styles.otrotitulo}>{libro.titulo}</h2>
                    <p className={styles.otroauthor}>Autor: {libro.autor}</p>     
                   {libro.decla ? <p style={{backgroundColor: "indigo" }}> De interés ({libro.decla} )</p> : null}                             
                </div>
            ))}



</div>
    );
}