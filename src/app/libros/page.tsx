"use client"
import { FC, useEffect, useState } from "react";
import Libro from '../components/Libro';
import NavTop from "../components/NavTop";
import NavFoot from "../components/NavFoot";
import axios from 'axios';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  imagen: string;
  decla: string;
  resenia: string | null;
  createdAt: string;
  updatedAt: string;
}

const Libros: FC = () => {
  const [data, setData] = useState<Libro[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/verLibros');
        setData(response.data.libros); // Accede al campo 'data' para obtener la respuesta JSON
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(data, "data");

  return (
    <>
      <NavTop />
      <div className="w-9/12 justify-center mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <h2 className='text-justify text-xl mt-10'>
    Libros declarados de interés municipal
  </h2>
  <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center my-10'>
    {data && data.map((libro: Libro, index) => (
      <Libro data-aos="fade-up" key={index} libro={libro} />
    ))}
  </div>
</div>
      <NavFoot />
    </>
  );
}

export default Libros;
