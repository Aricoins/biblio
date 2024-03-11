<<<<<<< HEAD
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const sheets = google.sheets('v4');
const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL, 
  private_key: process.env.GOOGLE_PRIVATE_KEY};

const client = new google.auth.JWT(
  credentials.client_email,
  credentials.private_key,

);

async function GET() {
  try {
    await client.authorize();
    const request = {
      spreadsheetId: 'your-spreadsheet-id', // Reemplaza esto con tu ID de hoja de cálculo
      range: 'Sheet1', // Reemplaza esto con tu nombre de hoja
      auth: client,
    };

    const response = await sheets.spreadsheets.values.get(request);
    return NextResponse.json({ rows: response.data.values });
  } catch (error) {
    console.error('Error reading Google Sheets:', error);
    return NextResponse.json({ message: 'Error reading Google Sheets' }, { status: 500 });
  }
=======
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';



async function GET() {
    try {
        const { rows: books } = await sql`
      SELECT * FROM libros Where disable = false`;
        console.log(books);
        return NextResponse.json({ books });
    }
    catch (error) {
        console.error('Error fetching libros:', error);
        return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }
>>>>>>> 8fcc7a7c53e0418af3e42cfb49c31b207041617a
}