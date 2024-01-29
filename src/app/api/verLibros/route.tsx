import {sql} from '@vercel/postgres';
import {NextResponse} from 'next/server';

export async function GET() {
    try {
      const result = await sql`
        SELECT * FROM libros
      `;
      return NextResponse.json(result.rows);
    } catch (error) {
      console.error('Error al llamar los libros:', error);
      return NextResponse.json({message: 'Error al llamar los libros'}, {status: 500});
    }
  }