import React from 'react';  
import styles from './fondos.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';

const MySwal = withReactContent(Swal);

const showDevelopmentAlert = (text) => {
  MySwal.fire({
    icon: "info",
    html: `<strong>${text}</strong> está en desarrollo.<br> ¡Volvé pronto para más actualizaciones!`,
    showCloseButton: true,
    confirmButtonColor: "#ff5733",
    zindex: 1,
  });
};

const FondosDocumentales = () => {

  // Initialize AOS on component mount
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 120,   

    });
    AOS.refresh(); 
    }, []);

  return (
    <>
      <div 
        data-aos="fade-right" 
        data-aos-duration="300"
        style={{
          display: "flex",
          justifyContent: "right", 
          marginTop: "10%",  
          color: "black", 
          fontSize: "12px",
          fontFamily: "Roboto, sans-serif",
          opacity: 0.2,
          zIndex: 1,
        }}>
        Material de consulta
      </div> 
      
      <div className={styles.contenedor} style={{ zIndex: 1 }}>   
        <div className={styles.grid} style={{ zIndex: 1 }} >
          <Link href="/com">
            <div className={styles.block} data-aos="zoom-in"  data-aos-duration="500"> 
              <p className={styles.p}>Carta Orgánica Municipal</p>
            </div>
          </Link>
           <Link href="https://drive.google.com/drive/folders/1UUPkChUcSr3SCe6euBOWLSppAkH_arUF?usp=sharing">
            <div 
            className={styles.block}  data-aos="zoom-in"  data-aos-duration="500"
       >
            <p className={styles.p}>Defensoría del Pueblo</p>
          </div>
</Link>
    <Link href="/juntas">
          <div 
            className={styles.block} data-aos="zoom-in"  data-aos-duration="500"
            >
            <p className={styles.p}>Juntas Vecinales</p>
          </div>
        </Link>
            <div className={styles.block} data-aos="zoom-in"  data-aos-duration="500"
               onClick={() => showDevelopmentAlert('CEB')}>
                <p className={styles.p}>Cooperativa de Electricidad Bariloche</p>
            </div>
          <div 
            className={styles.block}  data-aos="zoom-in"  data-aos-duration="500"
            onClick={() => showDevelopmentAlert('Estudios TUP')}>
            <p className={styles.p}>Transporte Urbano de Pasajeros</p>
          </div>
          <div 
            className={styles.block}  data-aos="zoom-in"  data-aos-duration="500"
     
            onClick={() => showDevelopmentAlert('Fiesta de la Nieve')}>
            <p className={styles.p} style={{ zIndex: 1 }}>Fiesta Nacional de la Nieve</p>
          </div>
          <div  
            className={styles.block} data-aos="zoom-in"  data-aos-duration="500"
            onClick={() => showDevelopmentAlert('Parque Municipal Llao Llao')}>
            <p className={styles.p}>Parque Municipal Llao Llao</p>
          </div>
     
        
        </div>
      </div>
    </>
  );
};

export default FondosDocumentales;
