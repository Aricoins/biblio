import fetch from 'node-fetch';
import csvParser from 'csv-parser';
import 

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET requests are allowed' });
  }

  try {

    const csvUrl =
      'https://docs.google.com/spreadsheets/d/1172Z7ehFpr5V9JJe-3sn41_DifkD_-dCuMMVWQ3rynw/export?format=csv';

    // Descargamos el CSV
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const data = [];
    const stream = response.body;

    // Procesamos el CSV
    await new Promise((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (row) => data.push(row))
        .on('end', resolve)
        .on('error', reject);
    });

    // Respondemos con los datos
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching or processing CSV:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
