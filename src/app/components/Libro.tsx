import { FC } from "react";
import Image from 'next/image';
import Link from 'next/link';
import defaultImage from "../api/assets/imagendefault.jpg";
import styles from './libro.module.css';

interface LibroProps {
  libro: {
    titulo: string;
    autor: string;
    decla: string;
    imagen: string;
    resenia: string;
    id: string;
  };
}

const Libro: FC<LibroProps> = ({ libro }) => {

  return (
   <>
    <Link href={`/libros/${libro.id}`}>
      <div className={styles.container} >
        <div className={styles.imageContainer}>  
          <Image
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            src={libro.imagen ? libro.imagen : defaultImage}
            alt={libro.titulo}
            width={300}
            height={300}
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.title}>{libro.titulo}</div>
          <h5 className={styles.author}>{libro.autor}</h5>
          {libro.decla ? (
            <Link href="#">
           
            </Link>
          ) : null}
        </div>
      </div>
    </Link>
    </>
  );
};

export default Libro;
