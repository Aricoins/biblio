import { NextResponse } from 'next/server';
import Papa from 'papaparse';

// Marcar como dinámica para evitar caché
export const dynamic = 'force-dynamic';
export const revalidate = 0; // No caché

export async function GET() {
  try {
    // URL de Google Sheets con parámetro para evitar caché
    const timestamp = new Date().getTime();
    const sheetUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTubNOlChZrcgIlxjhA0AzloTVbTYeTeex8-CxgemKmXCAoRKaeE8xo0ZT6LQP7M0ueIfOy0DJYCAKE/pub?output=csv`;
    
    const response = await fetch(sheetUrl, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      cache: 'no-store' // No caché a nivel de fetch
    });
    
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.status}`);
    }
    
    const csvData = await response.text();
    
    // Usar PapaParse para procesar CSV correctamente
    const parsed = Papa.parse(csvData, {
      header: false, // No tenemos encabezados
      skipEmptyLines: true
    });
    
    // Eliminar fila de encabezados
    const rows = parsed.data.slice(1);
    
    // Mapear a la estructura esperada
    const results = rows.map((columns: unknown) => {
      const cols = columns as string[];
      return {
        "Junta Vecinal": cols[0] || '',
        "Ordenanza1": cols[1] || '',
        "Ordenanza2": cols[2] || '',
        "Ordenanza3": cols[3] || '',
        "Ordenanza4": cols[4] || '',
        "Ordenanza5": cols[5] || '',
        "Link1": cols[6] || '',
        "Link2": cols[7] || '',
        "Link3": cols[8] || '',
        "Link4": cols[9] || '',
        "Link5": cols[10] || '',
      };
    }).filter(item => item["Junta Vecinal"] !== ''); // Filtrar filas vacías

    // Devolvemos solo los datos sin envolverlos en otro objeto
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error procesando datos de juntas:', error);
    return NextResponse.json(
      { error: 'Error al cargar los datos de juntas vecinales' },
      { status: 500 }
    );
  }
}