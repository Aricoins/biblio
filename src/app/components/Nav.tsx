"use client"
import Link from 'next/link';
import logo from "../../../public/assets/moran.png"
import Image from 'next/image';
import styled from "styled-components";

const Container = styled.div`
  background-color: #fcfdfb;
  position: fixed;
  top: 0%;
  left: 0%;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledLink = styled.a`
  color: #062358;
  margin-left: 2rem;
`;

const Navbar = () => {
  return (
    <Container>
      <Image src={logo} width={300} alt="logotipo"/>
      <ul className="flex">
        <li>
          <Link href="/" passHref>
            <StyledLink>Inicio</StyledLink>
          </Link>
        </li>
        <li>
          <Link href="/" passHref>
            <StyledLink>Libros</StyledLink>
          </Link>
        </li>
        <li>
          <Link href="/login" passHref>
            <StyledLink>Login</StyledLink>
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default Navbar;