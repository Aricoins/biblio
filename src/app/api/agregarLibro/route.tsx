import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const titulo = searchParams.get('titulo');
  const autor = searchParams.get('autor');
  const decla = searchParams.get('decla');
  const imagen = searchParams.get('imagen');
 
  try {
    if (!titulo || !autor || !decla || !imagen) throw new Error('Pet and owner names required');
    await sql`INSERT INTO libros (titulo, autor, decla, imagen ) VALUES (${titulo}, ${autor}, ${decla}, ${imagen});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const libros = await sql`SELECT * FROM libros;`;
  return NextResponse.json({ libros }, { status: 200 });
}