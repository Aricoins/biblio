"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../src/app/api/assets/moran.png';
import Text from './components/text';
import imagen from '../../src/app/api/assets/concejo.png';
import './globals.css';


const Container = ' w-12/12 h-100vh bg-gradient-to-r from-blue-400 to-gray-500 via-gray-900  animated-gradient-x flex items-center justify-center';

const Subcontainer = 'w-4/5 h-4/12 flex m-1 flex-col justify-center mx-auto md:flex-row rounded-lg opacity-80 relative'; // Añadida la posición relativa

const LeftContent = 'w-full text-center h-screen my-20 md:w-1/2 md:pt-0 md:pl-10 bg-white p-8 m-1 rounded-md';

const RightContent = 'w-full text-center h-screen my-20 md:w-1/2 md:pt-0 md:pl-10 bg-white p-5 rounded-md';

const Boton = 'bg-indigo-800 w-full flex justify-center items-center absolute bottom-0 right-0 left-0 p-1 text-white rounded-md transition duration-500 hover:bg-teal-400';

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
      <div className={Container}>
      
          <div className={Subcontainer}>
            <div className={LeftContent}>
              <div className='flex justify-center mt-6'>
                <Image
                  className=' w-auto shadow-lg rounded-lg'
                  src={imagen}
                  alt='logo'
                  width={100}
                  height={100}
                  priority
                />
              </div>
              <form>
                <p className='text-[10px] m-4' >Ingrese con sus credenciales</p>
                <div className='relative mb-4 text-sm'>
                  <label htmlFor='usuario'>Usuario</label>
                  <input
                    type='text'
                    id='usuario'
                    placeholder='usuario'
                    autoComplete='current-password'
                    className='border rounded-md px-2 py-1 w-full'
                  />
                </div>
                <div className='text-sm relative mb-4'>
                  <label htmlFor='pas'>Contraseña</label>
                  <input
                    type='password'
                    id='pas'
                    placeholder='Contraseña'
                    autoComplete='current-password'
                    className='border rounded-md px-2 w-full'
                  />
                </div>
                <div className='pt-1 text-center text-sm'>
                  <button
                    className='bg-indigo-800 w-10/12 text-white rounded-md px-4 py-2 hover:bg-teal-400'
                    type='button'
                    data-te-ripple-init
                    data-te-ripple-color='light'
                  >
                    Ingresar
                  </button>
                  <div>
                  <a className='text-[10px]' href='#'>
                    ¿Olvidó su contraseña?
                  </a>
                  </div>
                </div>
                <button
                  type='button'
                  className='bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 p-1 text-[10px] w-10/12 mt-2'
                  data-te-ripple-init
                  data-te-ripple-color='light'
                >
                  Registrarse
                </button>
              </form>
            </div>
            <div className={RightContent}>
              <div className='flex justify-center'>
                <Image
                  className=' w-10/12 shadow-lg rounded-lg my-10'
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
              <div className={Boton}>
                <Link href='/archivo'>
                  <button>Ingresar
                  <p>como invitado</p></button>
                </Link>
              </div>
            </div>
          </div>
        </div>

    </>
  );
}
