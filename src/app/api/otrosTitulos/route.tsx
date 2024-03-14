
import { NextApiRequest, NextApiResponse } from 'next';
import json from "../libros.json";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Simplemente devolvemos el JSON de los libros como respuesta
    
    res.status(200).json(json);
  } catch (error) {
    console.error('Error al llamar los libros:', error);
    res.status(500).json({ message: 'Error al llamar los libros' });
  }
}