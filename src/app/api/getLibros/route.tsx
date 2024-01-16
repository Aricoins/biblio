import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tituloLibro = searchParams.get('titulo');
  const autorLibro = searchParams.get('autor');
  const declaLibro = searchParams.get('decla');
  try {
    if (!tituloLibro || !autorLibro || !declaLibro) throw new Error('El libro debe tener un título, un autor y una declaración');
    await sql`INSERT INTO Books (titulo, autor, decla) VALUES (${tituloLibro}, ${autorLibro}, ${declaLibro});`;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const libros = await sql`SELECT * FROM books;`;
  return NextResponse.json({ libros }, { status: 200 });
}