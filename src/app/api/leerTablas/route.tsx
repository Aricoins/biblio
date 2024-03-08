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
}