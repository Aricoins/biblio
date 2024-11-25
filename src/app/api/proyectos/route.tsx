import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

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


function cargarDatosDesdeJson() {
  const rutaJson = path.join(
    process.cwd(),
    'src',
    'app',
    'api',
    'proyectos',
    '87.json'
  );

  try {
    const contenidoJson = fs.readFileSync(rutaJson, 'utf-8');
    const datos = JSON.parse(contenidoJson);
    return datos;
  } catch (error) {
    console.error('Error al cargar JSON:', error);
    return [];
  }
}


export async function GET(req: NextRequest) {
  try {
    // Cargar datos desde la base de datos y JSON local
    const { rows: proyectosDB } = await sql`
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
      ORDER BY 
        id DESC;
    `;
    const proyectosJson = cargarDatosDesdeJson();

    // Transformar estructura JSON a la interfaz `Proyecto`
    const proyectosAdaptados = proyectosJson.map((proyecto: any) => ({
      id: proyecto.id,
      numero_proyecto: proyecto.numero_proyecto || '',
      anio_proyecto: proyecto.anio_proyecto || '',
      titulo_proyecto: proyecto.titulo_proyecto || '',
      tipo_proyecto: proyecto.tipo_proyecto || '',
      autor: Array.isArray(proyecto.autor) ? proyecto.autor : [proyecto.autor],
      colaboradores: proyecto.colaboradores || null,
      girado_a: proyecto.girado_a || '',
      acta_fecha: proyecto.acta_fecha || null,
      aprobado: proyecto.aprobado ?? false,
      tipo_norma: proyecto.tipo_norma || '',
      numero_norma: proyecto.numero_norma || '',
      observaciones: proyecto.observaciones || ''
    }));

    const todosProyectos = [...proyectosDB, ...proyectosAdaptados];

    return NextResponse.json({ proyectos: todosProyectos }, { status: 200 });
  } catch (error) {
    console.error('Error al cargar los proyectos:', error);
    return NextResponse.json({ error: 'Error al cargar los proyectos' }, { status: 500 });
  }
}
