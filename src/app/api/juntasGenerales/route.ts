import { NextResponse } from 'next/server';
import Papa from 'papaparse';

export async function GET() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS939qInADEG4NVtteFE6zAQbQ6u-RKqW4H1ZoIZCNqDvgqo8frgD6tuHJRbV997zQYNTQgHC2hsngk/pub?gid=0&single=true&output=csv';

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching CSV: ${response.statusText}`);
    }
    
    const csvData = await response.text();
    
    // Parse CSV to JSON
    const parsedData = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: header => 
        header.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    });

    return NextResponse.json(parsedData.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to process CSV', details: error.message },
      { status: 500 }
    );
  }
}