import { NextResponse, NextRequest } from "next/server";
import librosData from "../verLibros/interes.json";
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing id parameter" }, { status: 400 });
    }

    const libro = librosData.find((l) => String(l.id) === id);

    if (!libro) {
      return NextResponse.json({ message: "Libro no encontrado" }, { status: 404 });
    }

    return NextResponse.json(libro);
  } catch (error) {
    console.error("Error fetching libro:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
