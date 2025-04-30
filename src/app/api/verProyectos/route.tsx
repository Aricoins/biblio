import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';
import proyectos from "./proyectos.json"

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Consulta a la base de datos
    // const data = await sql`SELECT resenia, titulo, autor, imagen, id, decla FROM "libros";`;
    // const libros = data.rows;

    console.log(proyectos, "libros json");

    // Respuesta con los libros y encabezados para evitar caché
    return new NextResponse(JSON.stringify({ proyectos }))
  } catch (error) {
    console.error('Error al llamar los libros:', error);
}
    };
  

