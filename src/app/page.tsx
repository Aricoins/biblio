"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../src/app/api/assets/moran.png';
import Text from './components/text';
import imagen from '../../src/app/api/assets/concejo.png';
import './globals.css';
import { Typography } from "antd";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useAuth } from "@clerk/nextjs";


const Container = ' w-12/12 h-100vh bg-gradient-to-b animated-gradient-x flex items-center justify-center';

const Subcontainer = 'w-4/5 h-4/12 flex m-1 flex-col justify-center mx-auto md:flex-row rounded-lg opacity-80 relative'; // Añadida la posición relativa

const LeftContent = 'w-full text-center h-screen my-20 md:w-1/2 md:pt-0 md:pl-10 bg-white p-8 m-1 rounded-md';

const RightContent = 'w-full text-center h-screen my-20 md:w-1/2 md:pt-0 md:pl-10 bg-white p-5 rounded-md';

const Boton = 'bg-gray-800 w-full flex justify-center items-center relative text-white rounded-md transition duration-500 hover:bg-gray-200 hover:border-gray-900 hover:text-gray-900';

export default function Libros() {
  const [complete, setComplete] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(true);
    }, 1000);
  }, [complete]);

  return (
    <>
      <div className={Container}>
   
          <div className={Subcontainer}>
            <div className={LeftContent}>
            <div className='flex justify-center mt-6'>
        <Image
          className=' w-auto "filter drop-shadow-md rounded-lg'
          src={imagen}
          alt='logo'
          width={100}
          height={100}
          priority
        />
      </div>
      <div>
          
      </div>
              
      <div className="flex justify-center flex-col items-center min-h-screen">
    <br /> <SignInButton /> <br /><div> <UserButton /></div>
    </div>
 
    {userId ? (   <div >
                <Link href='/archivo'>
                <div className={Boton}>
            Ingresar</div>
                </Link>
              </div>) : null}
    
         </div>
         </div>
            <div className={RightContent}>
              <div className='flex justify-center'>
                <Image
                  className=' w-10/12 "filter drop-shadow-md rounded-lg my-10'
                  src={logo}
                  alt='logo'
                  width={300}
                  height={300}
                  priority
                />
           
              </div>
              <div>
                <div >
                  <Text setComplete={setComplete} />
                </div>
                {showWelcome && (
                  <p
                    className={` my-4 text-base font-semibold ${
                      complete ? 'opacity-100 transition-opacity transition-color color-red duration-100' : 'opacity-0'
                    }`}
                  >
                    ¡Bienvenidos!
                  </p>
                )}
              </div>
            
            </div>
          </div>


    </>
  );
}
