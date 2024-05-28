import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Consulta a la base de datos
    const data = await sql`SELECT autor, titulo, id, imagen, resenia FROM "libros";`;
    const libros = data.rows;

    console.log(libros, "libros api");

    // Respuesta con los libros y encabezados para evitar caché
    return new NextResponse(JSON.stringify({ libros }))
  } catch (error) {
    console.error('Error al llamar los libros:', error);
}
    };
  

