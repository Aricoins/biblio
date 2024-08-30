import React from 'react';  
import styles from './fondos.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MySwal = withReactContent(Swal);

const showDevelopmentAlert = (text) => {
  MySwal.fire({
    icon: "info",
    html: `<strong>${text}</strong> está en desarrollo.<br> ¡Vuelve pronto para más actualizaciones!`,
    showCloseButton: true,
    confirmButtonColor: "#ff5733",
  });
};

const FondosDocumentales = () => {

  // Initialize AOS on component mount
  React.useEffect(() => {
    AOS.init({
      duration: 1000, // Default duration for animations
      offset: 120,    // Offset for triggering animations

    });
    AOS.refresh(); // Refresh AOS to detect new elements
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
          fontSize: "8vw",
          fontFamily: "Roboto, sans-serif",
          opacity: 0.2,
          margin: "8%"
        }}>
        Material de consulta
      </div> 
      
      <div className={styles.contenedor}>
        <div className={styles.grid}>
          <div 
            className={styles.block} 
            data-aos="fade-left" 
            onClick={() => showDevelopmentAlert('Convención Carta Orgánica')}>
            <p className={styles.p}>Convención Carta Orgánica Municipal</p>
          </div>
          <div 
            className={styles.block} 
            data-aos="fade-right" 
            onClick={() => showDevelopmentAlert('CEB')}>
            <p className={styles.p}>Cooperativa de Electricidad Bariloche</p>
          </div>
          <div 
            className={styles.block} 
            data-aos="zoom-in" 
            onClick={() => showDevelopmentAlert('Estudios TUP')}>
            <p className={styles.p}>Estudios Servicio de Transporte Urbano de Pasajeros</p>
          </div>
          <div 
            className={styles.block} 
            data-aos="zoom-in" 
            onClick={() => showDevelopmentAlert('Fiesta de la Nieve')}>
            <p className={styles.p}>Fiesta Nacional de la Nieve</p>
          </div>
          <div 
            className={styles.block} 
            data-aos="zoom-in" 
            onClick={() => showDevelopmentAlert('Parque Municipal Llao Llao')}>
            <p className={styles.p}>Parque Municipal Llao Llao</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default FondosDocumentales;
