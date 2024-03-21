'use client'
import ONGs from '../components/ONGs'
import NavTop from '../components/NavTop'
import NavFoot from '../components/NavFoot'
import "../style.module.css"
import ProyectosNoSancionados from '../components/ProyectosNoSancionados'
import ExpedientesResoluciones from '../components/ExpedientesResoluciones'
import ExpedientesOrdenanzas from '../components/ExpedientesOrdenanzas'
import ExpedientesDeclaraciones from '../components/ExpedientesDeclaraciones'
import ExpedientesComunicaciones from '../components/ExpedientesComunicaciones'
import PCM from '../components/PCM'
import styles from "./style.module.css"
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const Registro = () => {
useEffect(() => {
  Aos.init({duration: 300});
}
, [])
  return (
    <>
      <NavTop />
      <div  className={styles.container}  >
      <p className={styles.endev}> En desarrollo | RG-IC-AGR  digestobariloche@gmail.com </p>
      <div className={styles.subcontainer}>
      <div data-aos="fade-up" className={styles.component}>
      <ProyectosNoSancionados  />
      </div>
     <div className={styles.h3}  > <h2  className={styles.h4}>
   EXPEDIENTES APROBADOS:
  </h2>  
        <div data-aos="fade-up" className={styles.component}>
          <ExpedientesOrdenanzas />
        </div>
        <div  data-aos="fade-up" className={styles.component}>
          <ExpedientesComunicaciones />
        </div>
        <div data-aos="fade-up" className={styles.component}>
          <ExpedientesDeclaraciones />
        </div>
        <div data-aos="fade-up" className={styles.component}>
          <ExpedientesResoluciones />
        </div>
        </div>             
        <div data-aos="fade-up" className={styles.component}>
          <PCM />
        </div> 
      </div>
    
      </div>
      <NavFoot />
    </>
  );
}

export default Registro;
