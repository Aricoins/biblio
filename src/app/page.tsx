"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../src/app/api/assets/moran.png';
import Text from './components/text';
import imagen from '../../src/app/api/assets/concejo.png';
import './globals.css';


const Container = ' h-screen h-4/5 bg-gradient-to-r from-blue-400 to-gray-500 via-gray-900  animated-gradient-x flex items-center justify-center';

const Subcontainer = 'w-3/5 h-10/12 flex flex-col justify-center mx-auto md:flex-row rounded-lg relative'; // Añadida la posición relativa

const LeftContent = 'w-full m-1 p-20 text-center h-2/5 my-16 md:w-1/2 md:my-10 p-5 bg-white rounded-md shadow-md';

const RightContent = 'w-full p-20 text-center h-4/5 my-10 md:w-1/2 md:pt-0 md:pl-10 bg-white p-5 rounded-md';

const Boton = 'bg-indigo-800 w-full flex justify-center items-center absolute bottom-0 right-0 left-0 p-4 text-white rounded-md transition duration-500 hover:bg-teal-400';

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
              <div className='flex justify-center'>
                <Image
                  className='mt-0 w-auto shadow-lg rounded-lg'
                  src={imagen}
                  alt='logo'
                  width={100}
                  height={100}
                  priority
                />
              </div>
              <form>
                <p className='mb-4 mt-4 text-sm'>Ingrese con sus credenciales</p>
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
                    className='border rounded-md px-2 py-1 w-full'
                  />
                </div>
                <div className='mb-12 pb-1 pt-1 text-center'>
                  <button
                    className='bg-indigo-800 text-white rounded-md px-4 py-2 hover:bg-teal-400'
                    type='button'
                    data-te-ripple-init
                    data-te-ripple-color='light'
                  >
                    Ingresar
                  </button>
                  <a className='text-sm' href='#'>
                    ¿Olvidó su contraseña?
                  </a>
                </div>
                <button
                  type='button'
                  className='bg-gray-300 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-400'
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
                  className='mt-6 w-10/12 shadow-lg rounded-lg'
                  src={logo}
                  alt='logo'
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
                  <p
                    className={`mb-6 mt-5 text-base font-semibold ${
                      complete ? 'opacity-100 transition-opacity transition-color color-red duration-100' : 'opacity-0'
                    }`}
                  >
                    ¡Bienvenidos!
                  </p>
                )}
              </div>
              <div className={Boton}>
                <Link href='/libros'>
                  <button>Ingresar</button>
                  <p>como invitado</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

    </>
  );
}
