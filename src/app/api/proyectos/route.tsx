// app/api/proyectos/route.ts
import { NextResponse } from 'next/server';
import proyectos from "./proyectos.json";

export async function GET() {
  try {
    return NextResponse.json({ proyectos });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Opcional: Si necesitas otros métodos HTTP
export async function POST() {
  return NextResponse.json(
    { error: "Método no permitido" },
    { status: 405 }
  );
}