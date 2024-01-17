"use client"

import React, { useState, FormEvent, ChangeEvent } from 'react';
import LoadBooksButton from '../components/cargar';

interface Libro {
  titulo: string;
  autor: string;
  decla: string;
}

interface FormularioLibroProps {
  onSubmit: (libro: Libro) => void;
}

function FormularioLibro({ onSubmit }: FormularioLibroProps) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [decla, setDecla] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  
    const libro: Libro = { titulo, autor, decla };
  
    // Send a POST request to the /api/libros endpoint
    const res = await fetch('/api/libros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(libro),
    });
  
    if (res.ok) {
      // Clear the form fields
      setTitulo('');
      setAutor('');
      setDecla('');
  
      // Call the onSubmit prop
      onSubmit(libro);
    } else {
      console.error('Error:', res.status, res.statusText);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'titulo':
        setTitulo(event.target.value);
        break;
      case 'autor':
        setAutor(event.target.value);
        break;
      case 'decla':
        setDecla(event.target.value);
        break;
    }
  };

  return (
    <> 
    
       <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" name="titulo" value={titulo} onChange={handleChange} />
      </label>
      <label>
        Autor:
        <input type="text" name="autor" value={autor} onChange={handleChange} />
      </label>
      <label>
        Declaración:
        <input type="text" name="decla" value={decla} onChange={handleChange} />
      </label>
      <input type="submit" value="Enviar" />
    </form>
    </>

  );
}

export default FormularioLibro;