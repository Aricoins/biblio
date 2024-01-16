"use client"
import Link from 'next/link';
import logo from "../../../public/assets/moran.png"
import Image from 'next/image';
import styled from "styled-components";
import SearchBar from "./SearchBar";

const Container = styled.div`
  background-color: #fcfdfb;
  position: fixed;
top: 0%  ;
  left: 0%;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;


const NavTop = () => {
  return (
    <Container>
      <Image src={logo} width={300} alt="logotipo"/>
      <ul className="flex text-6x1 items-center flex-row justify-between w-full mx-28">
        <li>
          <Link href="/inicio" >
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
                <SearchBar />
      
          </li>
      </ul>
    </Container>
  );
};

export default NavTop;