
import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    try {
      
      const { rows: books } = await sql`
      SELECT * FROM libros Where disable = false`;
console.log(books)
      return NextResponse.json({ books});
    } catch (error) {
      console.error('Error fetching libros:', error);
      return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }}

export async function POST(req: Request) {
    try {
        const {form}= await req.json();
      
      await sql`INSERT INTO products (titulo, autor, imagen, decla, resenia)
      VALUES (${form.titulo}, ${form.autor}, ${form.imagen}, ${form.decla}, ${form.resenia})   `,
      console.log('Libro agregado exitosamente')
      return NextResponse.json({ message: "Libro agregado", result: true });
      } catch (error) {
        console.log('error al agregar el libro',error)
        return NextResponse.json({ message: "Error al agregar libro", result: false });
      }
    }



    // export async function PUT(req: Request) {
    //   const { id, disable } = await req.json();
    
    //   try {
    //     const { rowCount } = await sql`
    //       UPDATE products
    //       SET disable = ${disable}
    //       WHERE id = ${id}
    //     `;
    
    //     if (rowCount > 0) {
    //       return NextResponse.json({ message: "Quantity Updated", result: true });
    //     } else {
    //       return NextResponse.json({ message: "Failed to update quantity", result: false });
    //     }
    //   } catch (e) {
    //     return NextResponse.json({ message: "Failed to update quantity", result: false });
    //   }
    // }