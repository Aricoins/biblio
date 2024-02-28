"use client"
import { FC, useEffect, useState } from "react";
import Libro from '../components/Libro';

import axios from 'axios';

interface Libro {
  titulo: string;
  autor: string;
  decla: string;
  imagen: string;
  resenia: string;
  id: string;
}

const Libros: FC = () => {
  const [data, setData] = useState<Libro[] | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/verLibros');
        setData(response.data.libros); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data?.filter(libro => libro.titulo.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="w-9/12 justify-center mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
     
        <input  className=" mt-20 px-4 py-2 rounded-full border border-gray-300 w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-200" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por título..." />
        
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center my-10'>
          {filteredData && filteredData.map((libro: Libro, index) => (
            <Libro data-aos="fade-up" key={index} libro={libro} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Libros;