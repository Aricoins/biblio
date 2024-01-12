import { sql } from "@vercel/postgres";
import json from "../libros.json"
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
      const libros = json; // Asume que `json` es un array de objetos
  
      // Itera sobre los libros e inserta cada uno en la base de datos
      for (const libro of libros) {
        const { titulo, autor, decla } = libro;
        if (!titulo || !autor || !decla) throw new Error('El libro debe tener un título, un autor y una declaración');
        await sql`INSERT INTO Books (Titulo, Autor, Decla) VALUES (${titulo}, ${autor}, ${decla});`;
      }
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  
    const libros = await sql`SELECT * FROM Books;`;
    return NextResponse.json({ libros }, { status: 200 });
}