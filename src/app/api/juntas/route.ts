import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTubNOlChZrcgIlxjhA0AzloTVbTYeTeex8-CxgemKmXCAoRKaeE8xo0ZT6LQP7M0ueIfOy0DJYCAKE/pub?output=csv'
    
    const response = await fetch(sheetUrl)
    const csvData = await response.text()
    
    const rows = csvData.split('\n').slice(1) // Saltar encabezado
    const results = rows.map(row => {
      const columns = row.split(',')
      return {
        "Junta Vecinal": columns[0]?.trim() || '',
        "Ordenanza1": columns[1]?.trim() || '',
        "Ordenanza2": columns[2]?.trim() || '',
        "Ordenanza3": columns[3]?.trim() || '',
        "Ordenanza4": columns[4]?.trim() || '',
        "Ordenanza5": columns[5]?.trim() || '',
        "Link1": columns[6]?.trim() || '',
        "Link2": columns[7]?.trim() || '',
        "Link3": columns[8]?.trim() || '',
        "Link4": columns[9]?.trim() || '',
        "Link5": columns[10]?.trim() || '',
      }
    }).filter(item => item["Junta Vecinal"] !== '') // Filtrar filas vacías

    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al cargar los datos' },
      { status: 500 }
    )
  }
}