"use client"
import Link from 'next/link';
import logo from "../api/assets/moran.png"
import Image from 'next/image';

import styles from './NavTop.module.css';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';



const NavTop = () => {
  const pathname = usePathname();
  
    return (
      
    <div className={styles.navTop}>
    <Image 
    src={logo}
    width={300} 
    height={300} 
    className={styles.navTopImage}
     alt="logotipo" priority />

    <div className={styles.navTopList}>
    <div className= {styles.item}>
        <Link  className ={styles.link} href="/" >
          Inicio
        </Link>
      </div>
      <div className={styles.item}>    
          <Link href="/archivo" className={clsx(styles.link, {
          [styles.link2]: pathname === '/archivo',
        
        })}>
          Archivo
        </Link>
      </div>

      <div className={styles.item}>
        <Link   href="/libros" className={clsx(styles.link, {
          [styles.link2]: pathname === '/libros',
        
        })}>
        Bilioteca
        </Link>
      </div>
     
      <div className={styles.item}>
   <UserButton />   </div>
      {/* <li className={styles.item}>
        <Link href="/libros/form" >
          Agregar Libro
        </Link>
      </li> */}
    </div>

  </div>
  );
};
export default NavTop;