import {sql} from '@vercel/postgres';
import {NextResponse, NextRequest} from 'next/server';

export async function GET( req: NextRequest, res: NextResponse) {
    try {

      const data = await sql`SELECT * FROM libros ORDER BY titulo DESC;`;
const libros = data.rows;
     
console.log(data.rows)
      return NextResponse.json({ libros}, { status: 200 });
     
    } catch (error) {
      console.error('Error al llamar los libros:', error);
      return NextResponse.json({message: 'Error al llamar los libros'}, {status: 500});
    }
  }