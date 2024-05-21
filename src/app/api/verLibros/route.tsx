import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await sql`SELECT * FROM libros; `;
    const libros = data.rows;

    console.log(libros, "libros api");

    return new NextResponse(JSON.stringify({ libros }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error al llamar los libros:', error);
    return new NextResponse(JSON.stringify({ message: 'Error al llamar los libros' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}
