"use client"
import Link from 'next/link';
import logo from "../api/assets/moran.png"
import Image from 'next/image';
import SearchBar from "./SearchBar";
import { useState } from 'react';
import styles from './NavTop.module.css';


const NavTop = () => {

  


  const endev = () => {
    return(
    alert("En desarrollo"))
  }
  return (
    <div className={styles.navTop}>
    <Image src={logo} width={200} alt="logotipo" priority />
    <ul className={styles.navTopList}>
      <li className="sm:my-0">
        <Link  className ={styles.link} href="/" >
          Inicio
        </Link>
      </li>
      <li className="my-2 sm:my-0">
        <Link  className ={styles.link} href="/libros" >
        Bilioteca
        </Link>
      </li>
      <li className="my-2 sm:my-0">
        <Link className ={styles.link} href="/archivo" >
          Archivo
        </Link>
      </li>
      <li className="my-2 sm:my-0" onClick={endev} >
        Ingresar
      </li>
      {/* <li className="my-2 sm:my-0">
        <Link href="/libros/form" >
          Agregar Libro
        </Link>
      </li> */}
    </ul>

  </div>
  );
};

export default NavTop;