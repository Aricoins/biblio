import { NextResponse } from 'next/server';
import Papa from 'papaparse';

export const dynamic = "force-dynamic";

// Cambiar de export default a export async function GET
export async function GET() {
  try {
    // Obtener datos del Google Sheet
    const response = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAycv4tgekAevzQpI9YTAfriCbuTPWuHhrBwbyF5rZqGMCq-8LcSGf3Av0QI2NR5VLupuLBrSMmcGS/pub?output=csv", 
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al obtener datos del archivo" },
        { status: 500 }
      );
    }

    const csvText = await response.text();
    
    // Usar PapaParse para manejar correctamente el CSV
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    });

    // Mapear los datos al formato que espera el componente
    const formattedData = parsed.data.map((row: any) => {
      return {
        "Junta Vecinal": row.Proyecto || "",
        "Ordenanza1": row.Resumen || "",
        "Link1": row.Link || "",
        // Puedes agregar más campos según necesites
      };
    });

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error processing CSV:", error);
    return NextResponse.json(
      { error: "Error procesando los datos" },
      { status: 500 }
    );
  }
}