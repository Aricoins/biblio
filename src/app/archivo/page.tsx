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
import Link from 'next/link';
//import FondosDocumentales from '../components/FondosDocumentales';
import Proyectos from '../proyectos/page'
import {Modal} from 'antd'

const Archivo = () => {
useEffect(() => {
  Aos.init({duration: 300});
}
, [])
  return (
    <>
 <NavTop />
   <div  className={styles.container}>

    <div className={styles.h3}  >
    <div data-aos="fade-up" className={styles.component}>
       <ProyectosNoSancionados />
      </div>
      <div className={styles.subcontainer}>
      <div>
      <h2  className={styles.h4}> EXPEDIENTES APROBADOS: </h2>  
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
             
        <div data-aos="fade-up" className={styles.component}>
          <PCM />
        </div> 
        </div>
        

    </div>

    </div>

  
 
    <Link href='/proyectos' className={styles.avanzada}> <h2>Búscar en proyectos</h2> </Link>
   </div>
<NavFoot />


    </>
  );
}

export default Archivo;
