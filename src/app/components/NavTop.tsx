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
    <div className={ styles.navTop}>
    <Image src={logo} width={200} alt="logotipo" priority />
    <ul className="flex sm:flex-row text-sm items-start sm:items-center justify-around w-full mx-4 sm:mx-28">
      <li className="sm:my-0">
        <Link href="/" >
          Inicio
        </Link>
      </li>
      <li className="my-2 sm:my-0">
        <Link href="/libros" >
        Bilioteca
        </Link>
      </li>
      <li className="my-2 sm:my-0">
        <Link href="/archivo" >
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