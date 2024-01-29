
"use client"
import { FC } from "react";
import { useEffect, useState } from "react";
import Libro from '../components/Libro';

interface Libro {
    titulo: string;
    autor: string;
    imagen: string;
    decla: string;
    resenia: string;
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
        let data = await res.json();
        setData(data); // Actualiza el estado con los libros obtenidos
      }
      fetchData();
    }, []);
    
    console.log(data)
    return ( <>
      <h1>Libros</h1>
      <div className="grid grid-cols-3 gap-4 mt-16">
        {data && data.map((libro: any, index) => (
            <Libro key={index} libro={libro} />
            ))}

      </div>
    </> )
}

    export default Libros;
