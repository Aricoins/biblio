import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';
interface Proyecto {
  id: number;
  numero_proyecto: string;
  anio_proyecto: string;
  titulo_proyecto: string;
  tipo_proyecto: string;
  autor: string[];
  colaboradores: string | null;
  girado_a: string;
  acta_fecha: string | null;
  aprobado: boolean;
  tipo_norma: string;
  numero_norma: string;
  observaciones: string;
}

export async function GET(req: NextRequest) {
  try {
    const { rows: proyectos } = await sql`
      SELECT 
        id, 
        numero_proyecto, 
        anio_proyecto, 
        titulo_proyecto, 
        tipo_proyecto, 
        autor, 
        colaboradores, 
        girado_a, 
        acta_fecha, 
        aprobado, 
        tipo_norma, 
        numero_norma, 
        observaciones 
      FROM 
        proyectos
    `;
    return NextResponse.json({ proyectos }, { status: 200 });
  } catch (error) {
    console.error('Error al cargar los proyectos:', error);
    return NextResponse.json({ error: 'Error al cargar los proyectos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { 
      numero_proyecto, anio_proyecto, titulo_proyecto, tipo_proyecto, 
      autor, colaboradores, girado_a, acta_fecha, aprobado, 
      tipo_norma, numero_norma, observaciones 
    } = await req.json();

    const { rows: proyecto } = await sql`
      INSERT INTO proyectos (
        numero_proyecto, anio_proyecto, titulo_proyecto, tipo_proyecto, 
        autor, colaboradores, girado_a, acta_fecha, aprobado, 
        tipo_norma, numero_norma, observaciones
      ) VALUES (
        ${numero_proyecto}, ${anio_proyecto}, ${titulo_proyecto}, ${tipo_proyecto}, 
        ${autor}, ${colaboradores}, ${girado_a}, ${acta_fecha}, ${aprobado}, 
        ${tipo_norma}, ${numero_norma}, ${observaciones}
      ) RETURNING *
    `;
    return NextResponse.json({ proyecto: proyecto[0] }, { status: 201 });
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    return NextResponse.json({ error: 'Error al crear el proyecto' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id, numero_proyecto, anio_proyecto, titulo_proyecto, tipo_proyecto,
      autor, colaboradores, girado_a, acta_fecha, aprobado, tipo_norma,
      numero_norma, observaciones
    } = body as Partial<Proyecto>;

    // Actualizar el proyecto en la base de datos
    const { rows: updatedProyecto } = await sql`
      UPDATE proyectos
      SET
        numero_proyecto = ${numero_proyecto},
        anio_proyecto = ${anio_proyecto},
        titulo_proyecto = ${titulo_proyecto},
        tipo_proyecto = ${tipo_proyecto},
        autor = ${autor},
        colaboradores = ${colaboradores},
        girado_a = ${girado_a},
        acta_fecha = ${acta_fecha},
        aprobado = ${aprobado},
        tipo_norma = ${tipo_norma},
        numero_norma = ${numero_norma},
        observaciones = ${observaciones}
      WHERE
        id = ${id}
      RETURNING *
    `;

    if (updatedProyecto.length === 0) {
      throw new Error('Proyecto no encontrado');
    }

    return NextResponse.json({ proyecto: updatedProyecto[0] }, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
    return NextResponse.json({ error: 'Error al actualizar el proyecto' }, { status: 500 });
  }
}
