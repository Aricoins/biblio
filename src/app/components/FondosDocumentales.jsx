import React from 'react';  
import styles from './fondos.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
    return (
      <>
        <h1 className={styles.h1} data-aos="fade-left" data-aos-duration="1000">
          Material de consulta
        </h1>
      
        <div className={styles.contenedor}>
          <div className={styles.grid}>
    

            <div className={styles.block} data-aos="fade-left" onClick={() => showDevelopmentAlert('Convención Carta Orgánica')}>
              <p className={styles.p}>Convención Carta Orgánica</p>
            </div>

            <div className={styles.block} data-aos="fade-right" onClick={() => showDevelopmentAlert('CEB')}>
              <p className={styles.p}>CEB</p>
            </div>

            <div className={styles.block} data-aos="fade-left" onClick={() => showDevelopmentAlert('Estudios TUP')}>
              <p className={styles.p}>Estudios TUP</p>
            </div>

            <div className={styles.block} data-aos="fade-right" onClick={() => showDevelopmentAlert('Fiesta de la Nieve')}>
              <p className={styles.p}>Fiesta de la Nieve</p>
            </div>

            <div className={styles.block} data-aos="fade-right" onClick={() => showDevelopmentAlert('Parque Municipal Llao Llao')}>
              <p className={styles.p}>Parque Municipal Llao Llao</p>
            </div>
          </div>
        </div>
      </>
    );
};

export default FondosDocumentales;
