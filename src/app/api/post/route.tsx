// pages/api/libros.ts
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function Post(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const nuevoLibro = req.body;

    // Lee el archivo JSON
    const librosPath = path.join(process.cwd(), 'libros.json');
    let libros = JSON.parse(fs.readFileSync(librosPath, 'utf8'));

    // Agrega el nuevo libro
    libros.push(nuevoLibro);

    // Escribe el array actualizado de nuevo al archivo JSON
    fs.writeFileSync(librosPath, JSON.stringify(libros, null, 2));

    // Envía una respuesta
    res.status(200).json({ message: 'Libro agregado' });
  } else {
    // Maneja cualquier otro método HTTP
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}