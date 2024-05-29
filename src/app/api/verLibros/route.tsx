import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Consulta a la base de datos
    const data = await sql`SELECT * FROM "libros";`;
    const libros = data.rows;

    console.log(libros, "libros api");

    console.error('Error al llamar los libros:', error);
}
    };
  

