import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import librosData from "../verLibros/interes.json";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    try {
      const libros = librosData

      return NextResponse.json({ libros });
    } catch (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }}