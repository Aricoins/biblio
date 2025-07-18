import { NextResponse } from 'next/server';
import Papa from 'papaparse';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const timestamp = new Date().getTime();
    const sheetUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTJFmgfIWFWJVb7FV11IuOZ7OYXWs5x9Q7Ta-EHwm3aymuF6oT8uCeNNTr0Pd36FSGux-A8Hmb0iRuV/pub?gid=0&single=true&output=csv&t=${timestamp}`;
    
    const response = await fetch(sheetUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    
    const csvData = await response.text();
    
    const parsed = Papa.parse(csvData, {
      header: false,
      skipEmptyLines: true
    });
    
    const results = parsed.data
      .slice(1) // Eliminar encabezado
      .map((cols: unknown) => {
        const columns = cols as string[];
        return {
          "Junta Vecinal": columns[0]?.trim() || '',
          "Link": columns[3]?.trim() || ''
        };
      })
      .filter(item => item["Junta Vecinal"] !== '')
      .reverse(); // Invertir el orden del array aquí

    return NextResponse.json(results);
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al cargar los datos' },
      { status: 500 }
    );
  }
}