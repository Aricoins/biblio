"use client"
import Link from 'next/link';
import logo from "../api/assets/moran.png"
import Image from 'next/image';
import SearchBar from "./SearchBar";
import { useState } from 'react';
import styles from './NavTop.module.css';
import clsx from 'clsx'
import { usePathname } from 'next/navigation';

const NavTop = () => {
  const pathname = usePathname();
 
  


  const endev = () => {
    return
    alert("En desarrollo")
  }
  return (
    <div className={styles.navTop}>
    <Image src={logo} width={200} className={styles.navTopImage} alt="logotipo" priority />
    <ul className={styles.navTopList}>
    <li className= {styles.item}>
        <Link  className ={styles.link} href="/" >
          Inicio
        </Link>
      </li>
      <li className={styles.item}>        <Link href="/archivo" className={clsx(styles.link, {
          [styles.link2]: pathname === '/archivo',
        
        })}>
          Archivo
        </Link>
      </li>

      <li className={styles.item}>
        <Link   href="/libros" className={clsx(styles.link, {
          [styles.link2]: pathname === '/libros',
        
        })}>
        Bilioteca
        </Link>
      </li>
     
      <li className={styles.item} onClick={endev} >
        Ingresar
      </li>
      {/* <li className={styles.item}>
        <Link href="/libros/form" >
          Agregar Libro
        </Link>
      </li> */}
    </ul>

  </div>
  );
};

export default NavTop;