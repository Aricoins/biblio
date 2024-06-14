"use client"

import Image from 'next/image';
import Link from 'next/link';
import imagen from './fondo.webp';
import Text from './components/text';
const Container = ' w-12/12 h-100vh bg-gradient-to-r from-blue-400 to-gray-500 via-gray-900  animated-gradient-x flex items-center justify-center';
import { useState, useEffect } from 'react';

export default function Libros() {
  const [complete, setComplete] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);



  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(true);
    }, 1000);
  }, [complete]);

  

  return (
    <>
        <Link href="http://www.dibiase.net"> 
            <div className={Container} style={{ position: "relative" }}>
                <div style={{ position: "absolute", 
                  color: "white",  
                  background: "rgba( 255, 255, 255, 0.6)", 
                  fontSize: "xx-large",
                  marginLeft: "5%", 
                  marginRight: "5%",
                  marginTop: "50%",
                  width: "60%", 
                  fontFamily: "Roboto, Arial",
                  textAlign: "center",
                  borderRadius: "30px" }}>
                <p style={{color: "red", fontSize: "medium", marginBottom: "1%"}}>  Nuevo dominio </p> 
                 <Text  setComplete={setComplete} />
                </div>
                <Image
                    src={imagen}
                    width={1500}
                    height={1500}
                    alt="dibiase bg"
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                />
            </div>
        </Link>
    </>
);
}
