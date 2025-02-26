"use client"
import Link from 'next/link';
import logo from "../api/assets/concejo.png"
import Image from 'next/image';
import styles from './NavFoot.module.css';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

const NavFoot = () => {
  const [isHidden, setIsHidden] = useState(false);

  
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={clsx(styles.navFoot, { [styles.hidden]: isHidden })}>
      
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
        {/* <li className={styles.item}>
          <Link  className={styles.link}
          href="https://concejobariloche.gov.ar/index.php?option=com_rsform&formId=5"
          target="_blank"
          >Mesa de Entradas</Link>
        </li> */}
        {/* <li className={styles.item}>
          <Link  className={styles.link}
          href="https://www.bariloche.gov.ar/resoluciones/"
          target="_blank"
          >Resoluciones Intendencia</Link>

        </li> */}
        {/* <li className={styles.item}>
          <Link  className={styles.link}
          href="https://www.bariloche.gov.ar/buscador_boletin/"
          target="_blank"
          >Boletín Oficial</Link>
        </li> */}
</ul>
      <Image 
      src={logo} 
      width={150}
      height={100}
      alt="logotipo"
      className={styles.navFootImage}
      priority/>
    </div>
  );
};

export default NavFoot;