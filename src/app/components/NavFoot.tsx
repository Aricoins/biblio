"use client"
import Link from 'next/link';
import logo from "../api/assets/concejo.png"
import Image from 'next/image';
import styles from './NavFoot.module.css';

const NavFoot = () => {
  return (
    <div className={styles.navFoot}>
      
      <ul className={styles.navFootList}>
      <li className={styles.item}>
          <Link className={styles.link  } href="https://concejobariloche.gov.ar/" 
          target="_blank">
          Concejo Municipal
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link } href="http://10.20.101.141/gbuscador/" 
          target="_blank">Digesto Jurídico</Link>
        </li>
        <li className={styles.item}>
          <Link  className={styles.link}
          href="https://concejobariloche.gov.ar/index.php?option=com_rsform&formId=5"
          target="_blank"
          >Mesa de Entradas</Link>
        </li>
        <li className={styles.item}>
          <Link  className={styles.link}
          href="https://www.bariloche.gov.ar/resoluciones/"
          target="_blank"
          >Resoluciones Intendencia</Link>

        </li>
        <li className={styles.item}>
          <Link  className={styles.link}
          href="https://www.bariloche.gov.ar/buscador_boletin/"
          target="_blank"
          >Boletín Oficial</Link>
        </li>
</ul>
      <Image 
      src={logo} 
      width={200}
      height={200}
      alt="logotipo"
      className={styles.navFootImage}/>
    </div>
  );
};

export default NavFoot;