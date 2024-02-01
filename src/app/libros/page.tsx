
"use client"
import { FC } from "react";
import { useEffect, useState } from "react";
import Libro  from '../components/Libro';
import librosJSON from '../api/libros.json';
import NavTop from "../components/NavTop";
import NavFoot from "../components/NavFoot";

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
    async function fetchData() {
     const res = await fetch('/api/verLibros', {
        method: 'GET',
      }); 

      const data = await res.json(); // Obtiene los libros
      setData(data.libros); // Actualiza el estado con los libros obtenidos
    }
    fetchData();
  }, []);

  console.log(data)
  return ( <>
<NavTop/>

    <h2 className="mt-40 flex justify-center text-4xl font-bold " >Libros declarados de interés municipal</h2>
    <div   className="grid grid-cols-4 gap-1 mt-16 
    md:gird-cols-4 mt-20 mx-40">
      {data && data.map((libro: any, index) => (     
              <Libro  data-aos="fade-up" key={index} libro={libro} />
            ))}

      </div>
<NavFoot/>
    </> )
}

    export default Libros;
