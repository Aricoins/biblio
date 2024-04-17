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
      <h1>Proyectos</h1>
<h2 onClick={ () =>   fetchProyectos()}>
        Todos los Proyectos
      </h2>


      <input
        type="text"
        placeholder="Buscar proyecto..."
        value={busqueda}
        onChange={handleBusquedaChange}
      />
               <table style={{ borderCollapse: 'collapse',  marginTop: '20px' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Autor</th>
    <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Aprobado</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Observaciones</th>
    </tr>
  </thead>
    <tbody>
    {resultados.map((proyecto) => (
      <tr key={proyecto.id} style={{ borderBottom: '1px solid #ddd' }}>
        <td style={{ padding: '8px' }}>{proyecto.numero_proyecto}</td>
               <td style={{ padding: '8px' }}>{proyecto.titulo_proyecto}</td>
        <td style={{ padding: '8px' }}>{proyecto.autor}</td>
        <td style={{ padding: '8px' }}>{proyecto.girado_a}</td>
        <td style={{ padding: '8px' }}>{proyecto.acta_fecha.toLocaleDateString()}</td>
        <td style={{ padding: '8px' }}>{proyecto.aprobado ? 'Sí' : 'No'}</td>
        <td style={{ padding: '8px' }}>{proyecto.tipo_norma}</td>
        <td style={{ padding: '8px' }}>{proyecto.numero_norma}</td>
        <td style={{ padding: '8px' }}>{proyecto.observaciones}</td>
      </tr>
    ))}
  </tbody>
</table>
   
        

   
    </div>
  );
}

export default Proyectos;
