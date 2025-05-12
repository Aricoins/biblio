import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma } from '../../lib/db/prisma';

// Marcar como dinámica para evitar generación estática
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Evitar acceso a BD durante compilación
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json([]);
    }

    try {
      // Intentar obtener proyectos de la base de datos
      const proyectos = await prisma.proyectos.findMany();
      return NextResponse.json(proyectos);
    } catch (dbError: any) {
      console.error("Error de base de datos:", dbError);
      
      // Si la tabla no existe, usar datos de respaldo
      if (dbError.code === '42P01') { // Código de error para "relation does not exist"
        // Cargar datos desde un archivo JSON local como alternativa
        try {
          const proyectosData = require('../../../proyectos/proyectos3.json');
          return NextResponse.json(proyectosData);
        } catch (jsonError) {
          console.error("Error cargando datos de respaldo:", jsonError);
          return NextResponse.json([], { status: 200 });
        }
      }
      
      // Para otros errores de DB, devolver array vacío
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Error general:", error);
    return NextResponse.json([], { status: 500 });
  }
}