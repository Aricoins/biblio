import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';



async function GET() {
    try {
        const { rows: books } = await sql`
      SELECT * FROM libros Where disable = false`;
        console.log(books);
        return NextResponse.json({ books });
    }
    catch (error) {
        console.error('Error fetching libros:', error);
        return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }
}