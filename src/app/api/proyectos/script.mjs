import { createClient } from '@vercel/postgres';
import fs from 'fs';

// Cargar JSON
const jsonData = JSON.parse(fs.readFileSync('../../proyectos/proyectoshoy.json'));

// Configurar el cliente de Postgres
const client = createClient({
  connectionString:  process.env.POSTGRES_CONNECTION_STRING
});

// Función para formatear strings como literales de array de Postgres
function formatStringToArray(str) {
  if (!str) return '{}';
  return `{${str.split(',').map(item => `"${item.trim().replace(/"/g, '\\"')}"`).join(',')}}`;
}

// Función para formatear fechas al formato ISO (YYYY-MM-DD)
function formatDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
}

(async () => {
  try {
    await client.connect();

    let successCount = 0;
    let errorCount = 0;
    for (const [index, pcm] of jsonData.entries()) {
      try {
        await client.query(
          `INSERT INTO proyectos 
          (numero_proyecto, anio_proyecto, titulo_proyecto, tipo_proyecto, autor, colaboradores, girado_a, acta_fecha, aprobado, tipo_norma, numero_norma, observaciones) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            pcm.numero_proyecto,
            pcm.anio_proyecto,
            pcm.titulo_proyecto,
            pcm.tipo_proyecto,
            pcm.autor, // No convertir a array, dejar como string
            formatStringToArray(pcm.colaboradores), // Mantén esto si colaboradores es un array
            pcm.girado_a,
            formatDate(pcm.acta_fecha),
            pcm.aprobado,
            pcm.tipo_norma,
            pcm.numero_norma,
            pcm.observaciones,
          ]
        );

        successCount++;
        console.log(`Insertado PCM ${index + 1} de ${jsonData.length}`);
      } catch (insertError) {
        errorCount++;
        console.error(`Error al insertar PCM ${index + 1}:`, insertError);
      }
    }

    await client.end();
    console.log(`Datos insertados correctamente: ${successCount}`);
    console.log(`Errores al insertar: ${errorCount}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();
