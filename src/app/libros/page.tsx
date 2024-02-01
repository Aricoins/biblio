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

  console.log(data);

  return (
    <>
      <NavTop />
      <h2 className="mt-40 flex justify-center text-4xl font-bold">Libros declarados de interés municipal</h2>
      <div className="grid grid-cols-4 gap-1 mt-16 md:gird-cols-4 mt-20 mx-40">
        {data && data.map((libro: Libro, index) => (
          <Libro data-aos="fade-up" key={index} libro={libro} />
        ))}
      </div>
      <NavFoot />
    </>
  );
}

export default Libros;
