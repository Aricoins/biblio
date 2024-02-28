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
          <Link href="https://concejobariloche.gov.ar/" >
          Concejo Municipal
          </Link>
        </li>
        <li>
          <Link href="http://10.20.101.141/gbuscador/" >
           Digesto Jurídico
          </Link>
        </li>
        <li>
          <Link href="https://concejobariloche.gov.ar/index.php?option=com_rsform&formId=5" >
           Mesa de entradas
          </Link>
        </li>
</ul>
      <Image src={logo} className="w-80 " alt="logotipo"/>
    </Container>
  );
};

export default NavFoot;