"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../src/app/api/assets/moran.png';
import Text from './components/text';
import imagen from '../../src/app/api/assets/concejo.png';
import './globals.css';
import { Spin, Typography } from "antd";
import { ClerkProvider, SignInButton,  SignOutButton, SignedIn, SignedOut, UserButton, SignIn, UserProfile, SignUp,  } from '@clerk/nextjs'
import { useAuth } from "@clerk/nextjs";


const Container = ' w-12/12 mx-auto bg-gradient-to-b  animated-gradient-x flex items-center justify-center flex-col md:flex-row';

const Subcontainer = 'w-12/12 h-auto flex flex-row justify-center mx-0 md:flex-col rounded-lg opacity-80 relative'; 

const LeftContent = 'md:w-2/3 md:pt-0 md:pl-10 bg-white p-8 mx-auto rounded-lg';

const RightContent = ' m-auto w-12/12 mt-20 p-10 md:w-1/2 text-center md:pt-10 md:pl-10  p-5 rounded-md mx-20 ';

const Boton = 'bg-black  w-full flex p-4 justify-center items-center relative text-white rounded-md transition duration-500 hover:bg-gray-200 hover:border-gray-900 hover:text-gray-900';

export default function Libros() {
  const [complete, setComplete] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(true);
  
    
    }, 1000);
  }, [complete]);

  return (
    <> { showWelcome ? (
      <div className={Container}>
 
 
          <div className={Subcontainer}>
            <div className={LeftContent}>
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
               {complete && <div>
                <p style={{margin: "30%", fontWeight: "600"}}>¡Bienvenidos!</p>
              </div>}
              </div>
              </div>
                               
</div>
   <div className={RightContent}>
   <SignedOut> 
              <SignIn routing='hash'/>
              </SignedOut>
              <SignedIn>
                        <SignUp routing='hash' />
              </SignedIn> <p style={{justifySelf: "center", color: "white"}}>o</p>
              <div className='flex justify-center items-center'>
<Link href='/archivo'>
<button className={Boton}>Ingresar como invitado</button>
</Link>
</div>

          </div>
          </div> ) : <div style={{marginTop: "15%", marginLeft: "45%", width: "100vh", height: "65vh"}}>  <Spin size="large" /> </div>}
    
 
    </>
  );
}
