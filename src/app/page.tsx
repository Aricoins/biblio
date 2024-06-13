"use client"

import Image from 'next/image';
import Link from 'next/link';
import imagen from './imagen.jpg';
const Container = ' w-12/12 h-100vh bg-gradient-to-r from-blue-400 to-gray-500 via-gray-900  animated-gradient-x flex items-center justify-center';


export default function Libros() {
  

  return (
    <>

<Link href="http://www.dibiase.net"> 

      <div className={Container}>
      
       <Image
       src={imagen}
       width={500}
       height={500}
       alt="dibiase bg"
       style={{width: "100%", height: "100%", objectFit: "cover"}}
       />
        

        </div>
        </Link>
    </>
  );
}
