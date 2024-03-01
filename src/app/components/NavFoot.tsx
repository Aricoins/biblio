"use client"
import Link from 'next/link';
import logo from "../api/assets/concejo.png"
import Image from 'next/image';
import styled from "styled-components";

const Container = styled.div`
  background-color: #fcfdfb;
  position: fixed;
  bottom: 0%;
  left: 0%;
  display: flex;
  justify-content: space-between;
  font-size: small;
  width: 100%;
  height: 10%;
`;

const NavFoot = () => {
  return (
    <Container>
      
      <ul className="flex text-6x1 items-center flex-row justify-between w-full mx-28">
      <li>
          <Link href="https://concejobariloche.gov.ar/" 
          target="_blank">
          Concejo Municipal
          </Link>
        </li>
        <li>
          <Link href="http://10.20.101.141/gbuscador/" 
          target="_blank">
           Digesto Jurídico
          </Link>
        </li>
        <li>
          <Link 
          href="https://concejobariloche.gov.ar/index.php?option=com_rsform&formId=5"
          target="_blank"
          >
           Mesa de entradas
          </Link>
        </li>
</ul>
      <Image 
      src={logo} 
      width={180}
      alt="logotipo"/>
    </Container>
  );
};

export default NavFoot;