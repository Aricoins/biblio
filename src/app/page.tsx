"use client"
import Image from 'next/image';
import Link from 'next/link';
import styled, {keyframes} from 'styled-components';
import { useEffect, useState } from 'react';
import logo from "../../src/app/api/assets/moran.png"
import Text from './components/text';
import imagen from "../../src/app/api/assets/concejo.png"
import "./globals.css";

const gradientAnimation = keyframes`
  0% {
    background-position: 100% 0%;
  }
  60% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 100% 0%;
  }
`;

const Container = styled.div`
  height: 140vh;
  background: linear-gradient(45deg, #6bceff, #556270, #FF6B6B);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
  transition: background 1s ease;
`


const Subcontainer = styled.div`
  width: 60%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;

  border-radius: 20px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftContent = styled.div`
  width: 100%;
  text-align: center;
  margin: 150% 0 0 0;
  padding: 5%;
  border-radius: 20px;
  background-color: white;
  height: max-content;

  

  @media (min-width: 768px) {
    width: 50%;
    margin-top:10%
  }
`;

const RightContent = styled.div`
  width: 100%;
  text-align: center;
  margin: 10% 1% 0 1%;
  border-radius: 20px;
  background-color: white;
  padding: 5%;
  height: max-content;

  @media (min-width: 768px) {
    width: 50%;
    padding-top: 0;
    padding-left: 20px;
  }
`;

const Boton = styled.div`
  background-color: #1b0478;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border-radius: 10px;
  padding: 10px;
  color: white;
position: relative;
bottom: 0;
 

  :hover {
    background-color: #13bfd9;
    cursor: pointer;
    transition: 1s;
    border: #045d78 1% solid;
  }
`;

export default function Libros() {
  const [complete, setComplete] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

useEffect(() => {
  setTimeout(() => {
    setShowWelcome(true);
  }, 1000);
}, [complete]);

return (<>
<div> 
<Container>
  <Subcontainer>
    <LeftContent>
      <div className='flex justify-center'>
    <Image
    className="mt-0 w-auto shadow-lg rounded-lg "
    src={imagen}
    alt="logo"
    width={200}
    height={200}
    priority


  />
  </div>
  <form>
  <p className="mb-8 mt-4 text-sm">Ingrese con sus credenciales</p>
  <div className="relative mb-4 text-sm">
  <label
      htmlFor="usuario"
      className=""
    >
      Usuario
    </label>

  <input type="text"  id="usuario" placeholder="usuario" autoComplete="current-password"/>

   
  </div>

  {/* <!--Password input--> */}
  <div className="text-sm relative mb-4">
  
  <label
      htmlFor="pas"
      className=""
    >
      Contraseña
    </label>
    <input type="password"  id="pas" placeholder="Contraseña" autoComplete="current-password"/>

  
  </div>

  {/* <!--Submit button--> */}
  <div className="mb-12 pb-1 pt-1 text-center">
    <button
      className="custom-button"
      type="button"
      data-te-ripple-init
      data-te-ripple-color="light"
    >
      Ingresar
    </button>

    {/* <!--Forgot password link--> */}
    <a className='text-sm' href="#!">¿Olvidó su contraseña?</a>
  </div>

  <button
    type="button"
    className="custom-button-secondary"
    data-te-ripple-init
    data-te-ripple-color="light"
  >
    Registrarse
  </button>
</form>

</LeftContent>


<RightContent>
<div className='flex justify-center'>
  <Image
    className="mt-6 w-10/12 shadow-lg rounded-lg"
    src={logo}
    alt="logo"
    width={200}
    height={200}
    priority
  />
</div>

<div>
  <div >
    <Text setComplete={setComplete} />
  </div>
  {showWelcome && (
    <p className={`mb-6 mt-5 text-xl font-semibold ${complete ? 'opacity-100 transition-opacity transition-color color-red duration-100' : 'opacity-0'}`}>
      ¡Bienvenidos!
    </p>
  )}
</div>

{/* Botón para ingresar como invitado */}
<Boton>
  <Link  href="/libros">
    <button >Ingresar</button>
    <p >como invitado</p>
  </Link>
</Boton>
</RightContent>
</Subcontainer>
</Container>
</div>

</> );
}
