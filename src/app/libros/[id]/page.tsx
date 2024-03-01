'use client'
import { fetchDetailLibros } from "../../lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Detail{
  id: string;
  titulo: string;
  autor: string;
  decla: any;
  imagen: string;
  resenia: string;
  }

export default function Detail({ params }: { params: { id: string } }) {
  const [librosDetail, setLibrosDetail] = useState<any>() 
  const [currentImage, setCurrentImage] = useState<string>('');
  const [video, setVideo] = useState<boolean>(true);


  
  useEffect(()=>{
    const fetchDetail = async () =>{
      try {
        const response = await fetch(`/api/detail?id=${params.id}`);
        if (response.ok) {
          const libros = await response.json();
          setLibrosDetail(libros.libros[0]);
      } 
    } catch (error) {
        console.error('No se encontró el detalle del libro', error);
      }
    };
    fetchDetail();
  }, [params.id])
  
  const handleImageChange = (newImage: string) => {
    setVideo(false)
    setCurrentImage(newImage);
  };

  if (!librosDetail) {
    return <div>Product not found!</div>;
  }

  return (
    <>
    <div className='mt-20 mx-10 flex flex-row w-12/12'>
     <div className="p-10 w-12/12">
      <Image src={librosDetail.imagen}
      alt={librosDetail.titulo} 
      width={10000} 
      height={1000} 
      className=""/>
      </div>
      <div className="p-5 mb-10">
      <h1 className="p-5 text-4xl font-bold" >{librosDetail.titulo}</h1>
      <h2 className="p-5 text-2xl font-semibold" > de {librosDetail.autor}</h2>
       <div className="p-5">
  {librosDetail.resenia.split('. ').map((paragraph: any, index: any) => (
    <p  key={index}>{paragraph}</p>
  ))}
   <p className="m-1 font-light" >Declaración {librosDetail.decla} del Concejo Municipal de San Carlos de Bariloche</p>
    
</div>
      </div>
    </div>
       </> 
     );
  
}