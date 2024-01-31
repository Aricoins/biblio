"use client"
import Image from 'next/image';
import libros from "../app/api/libros.json";
import Libro from '../app/components/Libro'; // Importa el componente Card de tu biblioteca de componentes
import NavTop from './components/NavTop';
import NavFoot from './components/NavFoot';
import Link from 'next/link';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import logo from "../../src/app/api/assets/moran.png"
import Text from './components/text';
import foto from "../../src/app/api/assets/imagen.svg"


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
    background-image: linear-gradient(#090101, #023438);
    color: white;
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
        grid-area: sidebar;
        background-color: rgba(77, 237, 106, 0.74);
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
background-image: linear-gradient(#f8f0f0, #b0a8a8); 
background-position: center;
background-size: cover;
background-repeat: no-repeat;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 2%;
`

  export default function Libros() {
    const [text, setText] = useState('Hover me');
    useEffect(() => {
      Aos.init({ duration: 2000 });
    }
    , []);

    return (
      <>
<Container>
<Landing >



<Text />

</Landing>

<Link  href="/libros" >  

INGRESAR
   </Link> 


</Container>
       
   
</>
    );
  }