import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';


async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM libros`;
    return NextResponse.json({ rows });
  } catch (error) {
    console.error('Error reading table libros:', error);
    return NextResponse.json({ message: 'Error reading table libros' }, { status: 500 });
  }
}