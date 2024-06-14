"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../src/app/api/assets/moran.png';
import Text from './components/text';
import imagen from '../../src/app/api/assets/concejo.png';
import './globals.css';
import { Typography } from "antd";
import { ClerkProvider, SignInButton,  SignOutButton, SignedIn, SignedOut, UserButton, SignIn, UserProfile, SignUp,  } from '@clerk/nextjs'
import { useAuth } from "@clerk/nextjs";


const Container = ' w-12/12 bg-gradient-to-b animated-gradient-x flex items-center justify-center';

const Subcontainer = 'w-12/12 h-auto flex m-auto flex-col justify-center mx-0 md:flex-row rounded-lg opacity-80 relative'; // Añadida la posición

const LeftContent = ' my-20 ml-10 w-200px md:w-1/2 md:pt-0 md:pl-10 bg-white p-5 rounded-md';

const RightContent = ' my-20 mx-10 md:w-1/2 md:pt-0 md:pl-10 bg-white p-5 rounded-md';

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
                            <SignedOut>
                            <SignUp routing="hash" />
                            
                        </SignedOut>
                        <SignedIn>
                            <SignIn routing="hash" />
                         
                            </SignedIn>
</div>
   <div className={RightContent}>
    <Image
      className='w-10/12 "filter drop-shadow-md rounded-lg my-10'
      src={logo}
      alt='logo'
      width={300}
      height={300}
      priority
                />
     <div>
                <div>
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
  
          </div>
          <div className='flex justify-center items-center'>
<Link href='/archivo'>
<button className={Boton}>Entrar como invitado</button>
</Link>
</div>
    </>
  );
}