
"use client"
import React from 'react';

function LoadBooksButton() {
  const loadBooks = () => {
    fetch('/api/post', { method: 'POST' })
    .then(response => response.text())
    .then(text => text ? JSON.parse(text) : {})
    .then(data => console.log(data));
  };

  return <button onClick={loadBooks}>Cargar libros</button>;
}

export default LoadBooksButton;