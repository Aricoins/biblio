import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';
import libros from "./interes.json"

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Consulta a la base de datos
    // const data = await sql`SELECT resenia, titulo, autor, imagen, id, decla FROM "libros";`;
    // const libros = data.rows;

    console.log(libros, "libros json");
const librosAlverre = libros.reverse()
    // Respuesta con los libros y encabezados para evitar caché
    return new NextResponse(JSON.stringify({ librosAlverre }))
  } catch (error) {
    console.error('Error al llamar los libros:', error);
}
    };
  

