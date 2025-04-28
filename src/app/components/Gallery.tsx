'use client';

import { useEffect, useState } from 'react';

const imagenes = [
  { id: 1, src: 'https://res.cloudinary.com/dx0htqhaq/image/upload/v1745857379/tw7i2g7osiixkdmduvpa.jpg', alt: 'Image 1' },
  { id: 2, src: 'https://res.cloudinary.com/dx0htqhaq/image/upload/v1745857379/zdiwehgaawqwhnb2zxui.jpg', alt: 'Image 2' },
  { id: 3, src: 'https://res.cloudinary.com/dx0htqhaq/image/upload/v1745857378/b5pfrtkmryqlxfsiybiv.jpg', alt: 'Image 3' },
];

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Iniciar transición: fundir a blanco
      setIsTransitioning(true);
      
      // Después de un breve tiempo, cambiar la imagen y volver a mostrar
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
        setIsTransitioning(false);
      }, 200); // Duración del fundido a blanco
      
    }, 3000); // Tiempo total entre cambios (incluyendo la transición)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Capa de fondo con la imagen actual */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${imagenes[currentIndex].src})`,
          opacity: isTransitioning ? 0 : 1,
        }}
      />
      
      {/* Capa blanca para el efecto de transición */}
      <div
        className="absolute inset-0 bg-white transition-opacity duration-500"
        style={{
          opacity: isTransitioning ? 1 : 0,
        }}
      />
    </div>
  );
}

export default Gallery;