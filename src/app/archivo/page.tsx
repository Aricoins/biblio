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
import Proyectos from '../proyectos/page'
import { Modal } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { MdOutgoingMail } from "react-icons/md";
import FondosDocumentales from '../components/FondosDocumentales'

const Archivo = () => {
  useEffect(() => {
    Aos.init()
}, [])

  return (
    <>
      <NavTop />
     
      <div className={styles.container}>
      <div data-aos= "fade-right"  data-aos-duration="300"
       style={{display: "flex",
        justifyContent: "right", 
        marginTop:"10%",  
        color: "black", 
        fontSize: "10vw",
        fontFamily: "Roboto, sans-serif ",
        opacity: 0.2,
        marginRight: "8%"


          }}> Archivo</div> 
          <div className={styles.h3}>
          <div data-aos="fade-up"      
          data-aos-duration="200"
          className={styles.component}>
         <Proyectos />
          </div>
          <div className={styles.subcontainer}>
            <div>
              <h2 className={styles.h4}> EXPEDIENTES APROBADOS: </h2>
            <p style={{margin: "0 0 0 20%"}}>Los expedientes anteriores a 2015 se encuentran alojados en libros. 
              Pida su escaneo a <Link href="mailto:digestoconcejo@gmail.com">
  digestoconcejo@gmail.com
</Link> </p>
              <div data-aos="fade-left"  data-aos-duration="200" className={styles.component}>
                <ExpedientesComunicaciones />
              </div>
              <div data-aos="fade-left"  data-aos-duration="200" className={styles.component}>
                <ExpedientesDeclaraciones />
              </div>
              <div data-aos="fade-left"  data-aos-duration="200"  className={styles.component}>
                <ExpedientesResoluciones />
              </div>
              <div data-aos="fade-left" data-aos-duration="200"className={styles.component}>
                <ExpedientesOrdenanzas />
              </div>
            </div>
                     </div>
        </div>
        {/* <div data-aos="fade-up"  data-aos-duration="200" className={styles.component}>
                <PCM />
              </div> */}
<div data-aos="fade-left"  data-aos-duration="200" className={styles.component}>
        <ProyectosNoSancionados />
        </div>
        <div className={styles.contactIcons}>
          <a href="https://wa.me/+5492945907975" target="_blank" rel="noopener noreferrer" className={styles.icon}>
            <FontAwesomeIcon  icon={faWhatsapp} />
          </a>
          <a 
          href="mailto:http://digestobariloche@gmail.com"
          target="_blank"
          rel='nofollow noopener noreferrer'
              className={styles.icon}
         >
             <MdOutgoingMail  />

          </a>
        </div>
      </div>
       <FondosDocumentales /> 
      <NavFoot />
    </>
  );
}

export default Archivo;
