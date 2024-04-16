import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';



export async function GET(request: Request) {
    try {
        // Obtener todos los proyectos
        const proyectos = await sql`SELECT * FROM proyectos`;
        console.log(proyectos, "proyectos")
        // Retornar los proyectos como respuesta
        return NextResponse.json({ proyectos }, { status: 200 });
    }
    catch (error) {
        // Manejar errores
        console.error('Error al cargar los proyectos:', error);
        return NextResponse.json({ error: 'Error al cargar los proyectos' }, { status: 500 });
    }
}
