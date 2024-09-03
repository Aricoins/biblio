import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(
        'https://docs.google.com/spreadsheets/d/1hTD2zMrwlh48ljI1yVi4e0yeFgFLHuZGQ4ZcoA2rt5A/pub?output=csv'    );

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV data: ${response.statusText}`);
    }

    const csvData = await response.text();

    const parsedData = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    return NextResponse.json(parsedData.data, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching or parsing CSV data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
