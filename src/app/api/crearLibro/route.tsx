import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

interface Resenia {
    [key: string]: any; 
}

interface Form {
  titulo: string;
  autor: string;
  imagen: string;
  decla: string;
  resenia: Resenia;
}


export async function POST(req: NextRequest , form: Form) {
  try {
    const {form}= await req.json();
const { titulo, autor, decla, imagen } = form;
console.log(form, "form")
    if (titulo && autor && decla && imagen) {
      await sql`INSERT INTO libritos ( Titulo, Autor, Imagen, Descripcion) VALUES ( ${titulo}, ${autor},  ${imagen}, ${decla}) RETURNING *`;
    }

    console.log('Libro agregado exitosamente')
    return NextResponse.json({ message: 'Libros agregados exitosamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "" }, { status: 500 });
  }
}