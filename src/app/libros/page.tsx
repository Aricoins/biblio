
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
      let res = await fetch('/api/verLibros', {
        method: 'GET',
      }); 
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      let dataFromDb = await res.json();
      let combinedData = [...dataFromDb, ...librosJSON]; // Combina los datos de la base de datos y el archivo JSON
      setData(combinedData); // Actualiza el estado con los libros obtenidos
    }
    fetchData();
  }, []);

  console.log(data)
  return ( <>
<NavTop/>

    <h1>Libros</h1>

    <div className="grid grid-cols-3 gap-4 mt-16">
      {data && data.map((libro: any, index) => (     
              <Libro key={index} libro={libro} />
            ))}

      </div>
<NavFoot/>
    </> )
}

    export default Libros;
