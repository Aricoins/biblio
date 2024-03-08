// import { NextResponse } from 'next/server';
// import { gapi } from 'gapi';



// async function GET() {
//   try {
//     const { rows } = await gapi.client.sheet.values;
//     return NextResponse.json({ rows });
//   } catch (error) {
//     console.error('Error reading table libros:', error);
//     return NextResponse.json({ message: 'Error reading table libros' }, { status: 500 });
//   }
// }