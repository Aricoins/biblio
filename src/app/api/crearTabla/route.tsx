import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS libros (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255),
        autor VARCHAR(255),
        imagen VARCHAR(255),
        decla VARCHAR(255),
        resenia TEXT
      );
    `;
    return NextResponse.json({ message: 'Table libros created successfully' });
  } catch (error) {
    console.error('Error creating table libros:', error);
    return NextResponse.json({ message: 'Error creating table libros' }, { status: 500 });
  }
}