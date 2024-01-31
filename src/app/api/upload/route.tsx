import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const rawData = await new Response(req.body).text();
    const libros = JSON.parse(rawData);

    if (libros) {
      const expectedProperties = ['titulo', 'autor', 'imagen', 'decla'];

      await sql.begin(async (sql: any) => {
        await Promise.all(libros.map(async (libro: any) => {
          if (libro.titulo && libro.autor && libro.decla) {
            await sql`INSERT INTO libros (Titulo, Autor, Imagen, Decla) VALUES (${libro.titulo}, ${libro.autor}, ${libro.imagen || null}, ${libro.decla})`;
          } else {
            const missingProperties = expectedProperties.filter(prop => !libro[prop]);
            throw new Error(`Missing properties: ${missingProperties.join(', ')}`);
          }
        }));
      });

      // Return a response indicating that all books have been inserted
      return new Response(JSON.stringify({ message: 'All books inserted successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Request body is null' }), { status: 400 });
    }
  } catch (error) {
    console.error('Error caught:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
  }
}
