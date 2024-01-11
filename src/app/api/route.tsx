// import { sql } from '@vercel/postgres';

// export interface Libro {
//   id: number;
//   titulo: string;
//   autor: string;
//   editorial: string;
//   fecha: string;
//   genero: string;
//   imagen: string;
//   descripcion: string;
// }


// export async function getLibros() {
//   const libros = await sql<Libro>`SELECT * FROM libros`;
//   return libros;
// }
// export async function getLibro(id) {
//   const libro = await sql<Libro>`SELECT * FROM libros WHERE id = ${id}`;
//   return libro;
// }

// export async function getLibroByTitulo(titulo) {
//   const libro = await sql<Libro>`SELECT * FROM libros WHERE titulo = ${titulo}`;
//   return libro;
// }
// export async function getLibroByAutor(autor) {
//   const libro = await sql<Libro>`SELECT * FROM libros WHERE autor = ${autor}`;
//   return libro;
// }
