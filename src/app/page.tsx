"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import logo from '../../src/app/api/assets/moran.png';
import Text from './components/text';
import './globals.css';
import { Spin } from "antd";
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/nextjs';
import { useAuth } from "@clerk/nextjs";
import  Gallery  from './components/Gallery'

const Container = 'md:scale-0.1 w-50% mx-auto animated-gradient-x flex items-center justify-center flex-col md:flex-row h-100vw';

const Subcontainer = 'w-full md:w-1/2 h-full flex items-center justify-center p-4 md:p-8';

const LeftContent = 'flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg';

const RightContent = 'flex flex-col items-center justify-center  p-8 rounded-lg shadow-lg';

const Boton = 'bg-black border border-orange-500 border-2 w-full flex p-8 justify-center items-center text-white rounded-md transition duration-500 hover:bg-gray-200 hover:border-gray-900 hover:text-gray-900';

export default function Libros() {
  const [complete, setComplete] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/archivo');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(true);
    }, 1000);
  }, [complete]);

  if (loading) {
    return (
      <div 
        style={{
          marginTop: "15%", 
          marginLeft: "45%", 
          width: "100vh", 
          height: "65vh"
        }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
    <Gallery />
      {showWelcome ? (
        <div className={Container} style={{ marginTop: "5%", }}>
          <div className={Subcontainer}>
            <div className={LeftContent}>
              <Image
                className='w-10/12 filter drop-shadow-md rounded-lg my-10'
                src={logo}
                alt='logo'
                width={300}
                height={300}
                priority
              />
              <div style={{ width: "100%", height: "auto" }}>
                <div>
                  <Text setComplete={setComplete} />
                </div>
                {complete && (
                  <div>
                    <p style={{ margin: "5%", fontWeight: "600", fontSize: "small", color: "black", textAlign: "center" }}>¡Bienvenidos!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={Subcontainer} >
            <div className={RightContent} style={{ width: "100%", scale: "0.7", backgroundColor:"rgba(144, 144, 144, 0.5)" }} >
              <SignedOut >
                <SignIn routing='hash' />
              </SignedOut>
              <SignedIn>
              </SignedIn>
              </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "15%", marginLeft: "45%", width: "100vh", height: "65vh" }}>
          <Spin size="large" />
        </div>
      )}
    </>
  );
}
