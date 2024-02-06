"use client"
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import logo from "../../src/app/api/assets/moran.png"
import Text from './components/text';
import foto from "../../src/assets/fondo.avif";
import imagen from "../../src/app/api/assets/concejo.png"
import getLocalIP from './lib/ip';


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');
`
const Container  = styled.div`  
    box-sizing: "border-box";
    margin: "0";
    padding: "0";
    font-family: "Poppins", sans-serif;
    font-size: 1.4rem;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
background-image: url({foto});
    `
const GirdContainer = styled.div`
    box-shadow: 10px 6px 37px -13px rgba(51, 51, 51, 0.74);
    padding: 10px;
    height: 200vh;
    text-align: center;
    display: grid;
        gap: 5%;
    font-family: "Poppins", sans-serif;
    font-size: 1.4rem;
    grid-template: 
      "nav" 50px
      "header" 40px 
      "main"  50px
      "sidebar" 30px 
      "footer" 80px;
@media (min-width:768px) {
        grid-template:
            "header nav" 25%
            "header nav" 30%
            "sidebar main" auto
            "footer footer" 10%/
            50% auto 
          
            
    }
    @media (min-width:992px) {
        grid-template:
            "header header header" 100px
            "nav main sidebar" auto
            "footer footer footer" 100px/
            200px auto 200px;
            
    }
`
const Header = styled.header`
        grid-area: header;
        background-color: rgba(222, 222, 231, 0.1);
        display: flex;
        height: 90%;
        width: 90%;
        flex-direction: column;
        align-items: center;
        justify-content: center;  
        margin: 5%;
              `
 const Nav = styled.nav`
        background-color: rgba(179, 46, 241, 0.74);
        grid-area: nav;         `

 const Sidebar = styled.aside`
        background-color: rgba(77, 237, 106, 0.74);
        margin-top: 6rem;
        border-radius: 20%;
        position: fixed;
        `

 const Main = styled.main`
        grid-area: main;
        background-color: #c51a1a;
            `
const Footer = styled.footer`
        background-color: rgba(1, 0, 0, 0.74);
        grid-area: footer;       
        align-self: bottom;
        margin: 5%;
                `
const Landing = styled.div`
height: 100vh;
width: 100%;

background-position: center;
background-size: cover;
background-repeat: no-repeat;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0%;
`

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
 
  margin-top: 1%;
position: static;
  :hover {
    background-color: #13bfd9;
    cursor: pointer;
    transition: 1s;
    border: #045d78 1% solid;
  }
`;

export default function Libros() {
    const [text, setText] = useState('Ingresar');
    useEffect(() => {
      Aos.init({ duration: 2000 });


    }
    , []);
    
return (
      <>
<Container>

{/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->  */}
<section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
  <div className="container h-full p-10">
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
      <div className="w-full">
        <div
          className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="g-0 lg:flex lg:flex-wrap">
            {/* <!-- Left column container--> */}
            <div className="px-4 md:px-0 lg:w-6/12">
              <div className="md:mx-6 md:p-12">
                {/* Logo */}
                <div className="text-center">
                  <Image
                    className="m-auto p-4 shadow-lg rounded-lg"
                    src={logo}
                    alt="logo"
                    width={600}
                    height={600}
                     />
                  <div className=" mt-1 mb-8 text-m    ">
               <h1>¡Bienvenidos!</h1> 
                  </div>
                </div>

                <form>
                  <p className="mb-8 mt-4 text-sm">Ingrese con sus credenciales</p>
              
                  <div className="relative mb-4 text-sm" data-te-input-wrapper-init>
                    <input
                      type="text"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput1"
                      placeholder="Usuario" />
                    <label
                      htmlFor="examplehtmlFormControlInput1"
                      className=" text-sm pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >Usuario
                    </label>
                  </div>

                  {/* <!--Password input--> */}
                  <div className=" text-sm relative mb-4" data-te-input-wrapper-init>
                    <input
                      type="password"
                      className="peer text-sm block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="examplehtmlFormControlInput11"
                      placeholder="Contraseña" />
                    <label
                      htmlFor="examplehtmlFormControlInput11"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >Contraseña
                    </label>
                  </div>

                  {/* <!--Submit button--> */}
                  <div className="mb-12 pb-1 pt-1 text-center">
                    <button
                      className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                      type="button"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                     >
                 Ingresar
                    </button>

                    {/* <!--Forgot password link--> */}
                    <a className='text-sm' href="#!">¿Olvidó su contraseña?</a>
                  </div>

                  {/* <!--Register button--> */}
                  <div className="flex items-center justify-between pb-6">
                    <p className="mb-0 mr-2">Crear cuenta</p>
                    <button
                      type="button"
                      className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                      data-te-ripple-init
                      data-te-ripple-color="light">
                      Registrarse
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* <!-- Right column container with background and description--> */}
            <div
  className=" flex relative bg-cover bg-center flex items-center m-auto p-24 flex-col rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
  
>
  <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-1200 opacity-90"></div>

             <Image
                className="object-cover w-6/12  rounded-r-lg rounded-bl-none"
                src={imagen}
                alt="logo"
                width={200}
                height={200}
                 />
              <div className="px-4 py-6 text-black md:mx-6 md:p-12">
         <h4 className="mb-6 text-xl font-semibold">
             <Text  /> 
        </h4>
              </div>
            </div>
            <Boton>
  <Link style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "100%", height: "100%" }} href="/libros">
    <button style={{ width: "100%", height: "100%" }}>Ingresar</button>
    <p style={{ fontSize: "14px", alignSelf: "center" }}>como invitado</p>
  </Link>
</Boton>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


</Container>
       
   
</>
    );
  }