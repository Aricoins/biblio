import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    try {
      const { rows: libros } = await sql`
        SELECT * FROM libros WHERE id = ${id}
      `;

      return NextResponse.json({ libros });
    } catch (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }}