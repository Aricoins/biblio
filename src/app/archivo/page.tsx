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
import { faWhatsapp, } from '@fortawesome/free-brands-svg-icons'
import { MdOutgoingMail } from "react-icons/md";

const Archivo = () => {
  useEffect(() => {
    Aos.init({ duration: 300 });
  }, [])

  return (
    <>
      <NavTop />
      <div className={styles.container}>
        <div className={styles.h3}>
          <div data-aos="fade-up" className={styles.component}>
            <ProyectosNoSancionados />
          </div>
          <div className={styles.subcontainer}>
            <div>
              <h2 className={styles.h4}> EXPEDIENTES APROBADOS: </h2>
              <div data-aos="fade-up" className={styles.component}>
                <ExpedientesOrdenanzas />
              </div>
              <div data-aos="fade-up" className={styles.component}>
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

        <Link href='/proyectos' className={styles.avanzada}>
          <h2>Búscar en todos los expedientes</h2>
        </Link>

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
      <NavFoot />
    </>
  );
}

export default Archivo;
