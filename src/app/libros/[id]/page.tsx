'use client'
import { fetchDetailLibros } from "../../lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./style.module.css"
import {Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

interface Detail{
  id: string;
  titulo: string;
  autor: string;
  decla: any;
  imagen: string;
  contratapa: string;
  resenia: string;
  }



export default function Detail({ params }: { params: { id: string } }) {
  const [librosDetail, setLibrosDetail] = useState<any>() 
  const [currentImage, setCurrentImage] = useState<string>('');
  const [video, setVideo] = useState<boolean>(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(()=>{
    const fetchDetail = async () =>{
      try {
        const response = await fetch(`/api/detail?id=${params.id}`);
        if (response.ok) {
          const libros = await response.json();
          setLibrosDetail(libros.libros[0]);
setLoading(false)
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
 

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };


  return (
    <>
    {loading ?  <Spin 
    style={{fontSize: "", 
      color: "orangered", 
      display: "flex",
      justifyContent: "center", 
    marginTop: "20%"}} /> : 
    <div className={styles.container}>
     <div className={styles.imagen}>
     <div className="container" onClick={handleClick}>
      <div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="front">
        <Image src={librosDetail.imagen}
      alt={librosDetail.titulo} 
      width={500} 
      height={600} 
      className=""/>
        </div>
        {/* <div className="back">
        <Image src={librosDetail.contratapa}
      alt={librosDetail.titulo} 
      width={500} 
      height={600} 
      className=""/>  </div> */}
      </div>
    </div>
     
            </div>
      <div className={styles.texto}>
      <h1 className="p-5 text-4xl font-bold" >{librosDetail.titulo}</h1>
      <h2 className="p-5 text-2xl font-semibold" > de {librosDetail.autor}</h2>
       <div className={styles.resenia}>
  {librosDetail.resenia.split('. ').map((paragraph: any, index: any) => (
    <p  key={index}>{paragraph}</p>
  ))}
   <p className="m-1 font-light" >Declaración {librosDetail.decla} del Concejo Municipal de San Carlos de Bariloche</p>
 </div>
 </div>
 </div>}
  </> 
     );
  
}