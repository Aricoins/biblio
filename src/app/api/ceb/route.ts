import axios from 'axios';
import Papa from 'papaparse';
import { NextResponse } from "next/server";

export async function GET() {
  try {

    
    const response = await axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQbAXgW-aGQXFqfeHaYnXGiBlp6wtV6cu8Q-0Fvc4W3v1HT9mvJkRt96rqJjF7vbseklspjRoUk_YPA/pub?output=csv');
    const parsedData = Papa.parse(response.data, {
      header: true,
      skipEmptyLines: true
    });
    
    return new Response(JSON.stringify({ data: parsedData.data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}