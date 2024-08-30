import React from 'react';  
import styles from './fondos.module.css';
import Link from 'next/link';
import Image from 'next/image';
import def from '../api/assets/imagendefault.jpg'

const FondosDocumentales = () => {
    return (<>
     <h1 className={styles.h1} data-aos="fade-left" data-aos-duration="1000"> Material de consulta</h1>
      
        <div className={ styles.contenedor}>
       
        <div className={styles.grid}>
        <div className={styles.block} data-aos="fade-left"  >
    
            <p className={styles.p}>Registros Malvinas</p>
             </div>
            <div className={styles.block} data-aos="fade-right">
            
            
            <p className={styles.p}>Registro ONGs</p>
            </div>
            <div className={styles.block} data-aos="fade-left">
            <Link href= "\\10.20.101.141\compartido\digesto\CARTA_ORGANICA_ACTAS_CONVENCION"></Link>
            <p className={styles.p}  >Convención Carta Orgánica </p>
            </div>
            <div className={styles.block} data-aos="fade-right">
            <p className={styles.p}>CEB</p>
                        </div>
            <div className={styles.block}  data-aos="fade-left" >
             <p className={styles.p}>Estudios TUP</p>
            
            </div>

            <div className={styles.block} data-aos="fade-right">
             <p className={styles.p}>Fiesta de la Nieve</p>
            </div>
            <div className={styles.block} data-aos="fade-right">
             <p className={styles.p}>Parque Municipal Llao Llao</p>
            </div>
            </div>
           
</div>
            </>
    );
}
export default FondosDocumentales;