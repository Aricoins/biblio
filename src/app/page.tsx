"use client"
import Image from 'next/image';
import libros from "../app/api/libros.json";
import Libro from '../app/components/Libro'; // Importa el componente Card de tu biblioteca de componentes

export default function Libros() {
  
  // Selecciona solo los primeros 8 libros
  const librosToShow = libros
    .filter(libro => libro.decla)
    .sort((a, b) => {
      const numA = Number(a.decla.substring(0, 4));
      const numB = Number(b.decla.substring(0, 4));
      return numA - numB;
    });
  return (
    <div className="mt-20 flex min-h-screen flex-col items-center justify-between p-24">
           <div className="lg:grid grid-cols-3 gap-4 w-4/5 mx-auto md: flex flex-col">
        {librosToShow.map((libro: any, index) => (
          <Libro key={index} libro={libro} />
        ))}
      </div>
    </div>
  );
}