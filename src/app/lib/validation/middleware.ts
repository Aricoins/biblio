// src/lib/validation/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema, ZodError } from 'zod';
import { auth } from '@clerk/nextjs/server';

// Middleware para validación de datos
export function validateData<T>(schema: ZodSchema<T>) {
  return async (req: NextRequest, handler: (req: NextRequest, data: T) => Promise<NextResponse>) => {
    try {
      let data: any;
      
      if (req.method === 'GET') {
        const { searchParams } = new URL(req.url);
        data = Object.fromEntries(searchParams.entries());
      } else {
        const body = await req.text();
        data = body ? JSON.parse(body) : {};
      }
      
      const validatedData = schema.parse(data);
      return handler(req, validatedData);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            error: 'Datos de entrada inválidos',
            details: error.errors.map(e => ({
              path: e.path.join('.'),
              message: e.message
            }))
          },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: 'Error al procesar la solicitud' },
        { status: 500 }
      );
    }
  };
}

// Middleware para autenticación
export function requireAuth() {
  return async (req: NextRequest, handler: (req: NextRequest, userId: string) => Promise<NextResponse>) => {
    try {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json(
          { error: 'No autorizado. Se requiere autenticación.' },
          { status: 401 }
        );
      }
      
      return handler(req, userId);
    } catch (error) {
      console.error('Auth error:', error);
      return NextResponse.json(
        { error: 'Error de autenticación' },
        { status: 401 }
      );
    }
  };
}

// Middleware combinado para auth + validación
export function withAuthAndValidation<T>(schema: ZodSchema<T>) {
  return async (
    req: NextRequest, 
    handler: (req: NextRequest, data: T, userId: string) => Promise<NextResponse>
  ) => {
    return requireAuth()(req, async (req, userId) => {
      return validateData(schema)(req, async (req, data) => {
        return handler(req, data, userId);
      });
    });
  };
}

// Utilitario para manejar errores de manera consistente
export function handleError(error: unknown, context: string = 'API') {
  console.error(`${context} Error:`, error);
  
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Datos inválidos',
        details: error.errors
      },
      { status: 400 }
    );
  }
  
  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  
  return NextResponse.json(
    { error: 'Error interno del servidor' },
    { status: 500 }
  );
}