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

const Container = 'flex items-center justify-center text-sm h-2';

const Registro = () => {

useEffect(() => {
  Aos.init({duration: 2000});
}
, [])


  return (
    <>
      <NavTop />
      <div  className={styles.container} data-aos="flip-right" >
      <div className={styles.subcontainer}>
      <div  className={styles.component}>
          <ProyectosNoSancionados  />
        </div>
       <div className={styles.component}>
          <ExpedientesOrdenanzas />
        </div>
       
        <div className={styles.component}>
          <ExpedientesComunicaciones />
</div>
   <div  className={styles.component}>
          <ExpedientesDeclaraciones />
        </div>
    <div className={styles.component}>
          <ExpedientesResoluciones />
        </div>             
           <div  className={styles.component}>
          <PCM />
        </div> 
      </div>
      </div>
      <NavFoot />
    </>
  );
}

export default Registro;
