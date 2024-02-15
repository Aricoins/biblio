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
  
  useEffect(()=>{
    fetchDetail()
    
  }, [fetchDetail])
  
  const handleImageChange = (newImage: string) => {
    setVideo(false)
    setCurrentImage(newImage);
  };

  if (!librosDetail) {
    return <div>Product not found!</div>;
  }

  return (
    <>
    <div className='mx-20'>
     <div>
      <Image src={librosDetail.imagen}
      alt={librosDetail.titulo} 
      width={1000} 
      height={1000} 
      className=""/>
      </div>
      <div className="m-10 my-5">
      <h1 className=" m-10 text-4xl font-bold" >{librosDetail.titulo}</h1>
      <h2 className=" m-10 text-2xl font-semibold" > de {librosDetail.autor}</h2>
       <div>
  {librosDetail.resenia.split('. ').map((paragraph: any, index: any) => (
    <p  key={index}> '{paragraph}'</p>
  ))}
   <p className="m-10 font-light" >Declaración {librosDetail.decla} del Concejo Municipal de San Carlos de Bariloche</p>
    
</div>
      </div>
    </div>
       </> 
     );
  
}