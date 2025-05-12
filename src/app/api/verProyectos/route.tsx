import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';
import proyectos from "./proyectos.json"

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return new NextResponse(JSON.stringify({ proyectos }))
  } catch (error) {
    console.error('Error al llamar los libros:', error);
}
    };
  

