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

const Registro = () => {
useEffect(() => {
  Aos.init({duration: 300});
}
, [])
  return (
    <>
 
   <div  className={styles.container}>
    <div className={styles.subcontainer}>
    <div data-aos="fade-up" className={styles.component}>
    <Proyectos />
    </div>
     
     <div className={styles.h3}  > <div data-aos="fade-up" className={styles.component}>
      <ProyectosNoSancionados />
      </div><h2  className={styles.h4} style={{backgroundColor: 'rgb(246, 130, 6);', color: "white"}} >
     
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
 
  
           <div  className={styles.endevdiv}>
  <span className={styles.endev}> En desarrollo | RG-IC-AGR  <Link href="mailto:digestoconcejo@gmail.com">digestobariloche@gmail.com</Link> </span>
</div>

    </>
  );
}

export default Registro;
