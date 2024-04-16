import React, { useState, useEffect } from 'react';
import styles from './style.module.css';

interface Proyecto {
  id: number;
  numero_proyecto: number;
  año_proyecto: number;
  titulo_proyecto: string;
  tipo_proyecto: string;
  autor: string;
  colaboradores: string[];
  girado_a: string;
  acta_fecha: Date;
  aprobado: boolean;
  tipo_norma: string;
  numero_norma: string;
  observaciones: string;
}

function Proyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]); // Tipo explícito para proyectos
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState<Proyecto[]>([]); // Tipo explícito para resultados


    async function fetchProyectos() {
      try {
        const response = await fetch('/api/proyectos');
        const data = await response.json();
        if (data && data.proyectos) {
          setProyectos(data.proyectos);
          setResultados(data.proyectos);
        }
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    }

    fetchProyectos();

  const handleBusquedaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(event.target.value);
    filtrarProyectos(event.target.value);
  };

  const filtrarProyectos = (busqueda: string) => {
    const filteredProyectos = proyectos.filter((proyecto: Proyecto) =>
      proyecto.titulo_proyecto.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultados(filteredProyectos);
  };

  return (
    <div>

<h2 onClick={ () =>   fetchProyectos()}>
        Todos los Proyectos
      </h2>

      <h1>Proyectos</h1>
      <input
        type="text"
        placeholder="Buscar proyecto..."
        value={busqueda}
        onChange={handleBusquedaChange}
      />
      <ul>
        {resultados.map((proyecto) => (
          <li key={proyecto.id}>
            <p>Título: {proyecto.titulo_proyecto}</p>
            <p>Autor: {proyecto.autor}</p>
            <p>Girado a: {proyecto.girado_a}</p>
            <p>Acta fecha: {proyecto.acta_fecha.toLocaleDateString()}</p>
            <p>Aprobado: {proyecto.aprobado ? 'Sí' : 'No'}</p>
            <p>Tipo norma: {proyecto.tipo_norma}</p>
            <p>Número norma: {proyecto.numero_norma}</p>
            <p>Observaciones: {proyecto.observaciones}</p>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default Proyectos;
