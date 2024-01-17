import { NextApiRequest, NextApiResponse } from 'next';
import pgPromise from 'pg-promise';
import libros from '../libros.json';

const pgp = pgPromise();

const dbUrl = process.env.POSTGRES_URL;
if (!dbUrl) {
  throw new Error('POSTGRES_URL is not defined');
}

const db = pgp(dbUrl);

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  for (const libro of libros) {
    await db.none('INSERT INTO books (titulo, autor, imagen, decla) VALUES ($1, $2, $3, $4)', [libro.titulo, libro.autor, libro.imagen, libro.decla]);
  }
  res.status(200).json({ message: 'Libros cargados correctamente' });
}