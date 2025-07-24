import { NextRequest, NextResponse } from 'next/server';
import { LibroSchema } from '../../lib/validation/schemas';
import { withAuthAndValidation, handleError } from '../../lib/validation/middleware';
import { dbService } from '../../lib/db/db.service';

// Marcamos la ruta como dinámica para evitar problemas de caché
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  return withAuthAndValidation(LibroSchema)(request, async (req, data, userId) => {
    try {
      // Usar Prisma en lugar de SQL directo para prevenir inyección SQL
      const nuevoLibro = await dbService.createLibro({
        titulo: data.titulo,
        autor: data.autor,
        descripcion: data.decla || null,
        imagen: data.imagen || null,
        creadoPor: userId,
        fechaCreacion: new Date()
      });

      return NextResponse.json(
        { 
          success: true, 
          libro: nuevoLibro,
          message: 'Libro creado exitosamente' 
        },
        { status: 201 }
      );
    } catch (error) {
      return handleError(error, 'AgregarLibro');
    }
  });
}

// Endpoint para obtener libros (con paginación)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 20;
    
    const libros = await dbService.getLibros({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { fechaCreacion: 'desc' }
    });

    const total = await dbService.countLibros();

    return NextResponse.json({
      libros,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    return handleError(error, 'GetLibros');
  }
}