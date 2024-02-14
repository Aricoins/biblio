import {Libros} from './definitions'
import { sql } from '@vercel/postgres';


export async function fetchDetailLibros(id:string) {
    try {
      const data = await sql<Libros>`SELECT * FROM libros WHERE id = ${id}`;
      return data.rows;
    } catch (error) {
      console.log("Database Error:", error);
      throw new Error("Error fetching product details");
    }
  }