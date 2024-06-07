import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
  try {
      const { form } = await req.json();
      const { rows: [newBook] } = await sql`
      INSERT INTO products (titulo, autor, imagen, decla, resenia)
      VALUES (${form.titulo}, ${form.autor}, ${form.imagen}, ${form.decla}, ${form.resenia})
      RETURNING id`;

      console.log('Libro agregado exitosamente');
      return NextResponse.json({ message: "Libro agregado", result: true, id: newBook.id });
  } catch (error) {
      console.log('error al agregar el libro', error);
      return NextResponse.json({ message: "Error al agregar libro", result: false }, { status: 500 });
  }
}