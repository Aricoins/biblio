import React from 'react';  
import styles from './fondos.module.css';
import Link from 'next/link';
import Image from 'next/image';
import def from '../api/assets/imagendefault.jpg'

const FondosDocumentales = () => {
    return (<>
     <h1 className={styles.h1} data-aos="fade-left" data-aos-duration="1000"> Fondos Documentales</h1>
      
        <div className={ styles.contenedor}>
       
        <div className={styles.grid}>
        <div className={styles.block} data-aos="fade-left"  >
    
            <p className={styles.p}>Tarjeta presentacional del Fondo Documental</p>
             </div>
            <div className={styles.block} data-aos="fade-right">
            
            
            <p className={styles.p}>Tarjeta presentacional del Fondo Documental</p>
            </div>
            <div className={styles.block} data-aos="fade-left">
            <p className={styles.p}>Tarjeta presentacional del Fondo Documental</p>
            </div>
            <div className={styles.block} data-aos="fade-right">
            <p className={styles.p}>Tarjeta presentacional del Fondo Documental</p>
                        </div>
            <div className={styles.block}  data-aos="fade-left" >
             <p className={styles.p}>Tarjeta presentacional del Fondo Documental</p>
            
            </div>

            <div className={styles.block} data-aos="fade-right">
             <p className={styles.p}>Tarjeta presentacional del Fondo Documental</p>
            </div>
            <div className={styles.block} data-aos="fade-right">
             <p className={styles.p}>Tarjeta presentacional del Fondo Documental</p>
            </div>
            </div>
            <div  className={styles.endevdiv}>
  <span className={styles.endev}> En desarrollo | RG-IC-AGR  <Link href="mailto:digestoconcejo@gmail.com">digestobariloche@gmail.com</Link> </span>
</div>
</div>
            </>
    );
}
export default FondosDocumentales;