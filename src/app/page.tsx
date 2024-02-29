"use client"
// 1. Importaciones
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import logo from "../../src/app/api/assets/moran.png"
import Text from './components/text';
import imagen from "../../src/app/api/assets/concejo.png"
import bgif from '../app/api/assets/bgif.webp';

const Container = styled.div`
  background-image: url(${bgif.src});
  height: 140vh; 
  background-size: cover;
  background-position: center;`;

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
  

  @media (min-width: 768px) {
    width: 50%;
    margin-top:10%
  }
`;

const RightContent = styled.div`
  width: 100%;
  text-align: center;
  margin: 10% 0 0 0;
  border-radius: 20px;
  background-color: white;
  padding: 5%;

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
  margin-bottom: 1%;
 

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
    Aos.init({ duration: 2000 });
    if (complete) {
      setTimeout(() => {
        setShowWelcome(true);
      }, 800);
    }
  }, [complete]);

return (<>

<Container>
  <Subcontainer>
    <LeftContent>
     <form>
  <p className="mb-8 mt-4 text-sm">Ingrese con sus credenciales</p>
  <div className="relative mb-4 text-sm" data-te-input-wrapper-init>
    <input
      type="text"
      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      id="exampleFormControlInput1"
      placeholder="Usuario"
    />
    <label
      htmlFor="examplehtmlFormControlInput1"
      className=" text-sm pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
    >
      Usuario
    </label>
  </div>

  {/* <!--Password input--> */}
  <div className="text-sm relative mb-4" data-te-input-wrapper-init>
    <input
      type="password"
      className="peer text-sm block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      id="examplehtmlFormControlInput11"
      placeholder="Contraseña"
    />
    <label
      htmlFor="examplehtmlFormControlInput11"
      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
    >
      Contraseña
    </label>
  </div>

  {/* <!--Submit button--> */}
  <div className="mb-12 pb-1 pt-1 text-center">
    <button
      className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
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
    className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
    data-te-ripple-init
    data-te-ripple-color="light"
  >
    Registrarse
  </button>
</form>
</LeftContent>
<RightContent>
<div>
  {/* Logo */}
  <Image
    className="mt-6 w-10/12 shadow-lg rounded-lg"
    src={logo}
    alt="logo"
    width={500}
    height={500}
  />
</div>

{/* Texto de bienvenida */}
<div>
  <span>
    <Text setComplete={setComplete} />
  </span>
  {showWelcome && (
    <p className={`mb-6 mt-5 text-xl font-semibold ${complete ? 'opacity-100 transition-opacity transition-color color-red duration-100' : 'opacity-0'}`}>
      ¡Bienvenidos!
    </p>
  )}
</div>

{/* Botón para ingresar como invitado */}
<Boton>
  <Link style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "100%", height: "100%" }} href="/libros">
    <button style={{ width: "100%", height: "100%" }}>Ingresar</button>
    <p style={{ fontSize: "14px", alignSelf: "center" }}>como invitado</p>
  </Link>
</Boton>
</RightContent>
</Subcontainer>
</Container>

</> );
}
