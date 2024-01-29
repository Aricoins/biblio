"use client"
import Link from 'next/link';
import logo from "../../../public/assets/moran.png"
import Image from 'next/image';
import SearchBar from "./SearchBar";
import LoadBooksButton from './cargar';


const NavTop = () => {
  return (
    <div className="bg-[#fcfdfb] fixed top-0 left-0 flex justify-between w-full z-10">
     <Image src={logo} width={300} alt="logotipo" priority />
       <ul className="flex text-6x1 items-center flex-row justify-between w-full mx-28">
        <li>
          <Link href="/" >
           Inicio
          </Link>
        </li>
        <li>
          <Link href="/libros" >
           Libros
          </Link>
        </li>
        <li>
          <Link href="/login" >
           Login
          </Link>
          </li>
          <li>
          <Link href="/libros/form" >
           Agregar Libro
          </Link>
        </li>
          </ul>
     <SearchBar /> 
    </div>
  );
};

export default NavTop;