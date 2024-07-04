// uploadData.js
import { createClient } from '@vercel/postgres';
import fs from 'fs';

// Cargar JSON
const jsonData = JSON.parse(fs.readFileSync('../../proyectos/proyectoshoy.json'));

// Configurar el cliente de Postgres
const client = createClient({
  connectionString: "postgres://default:tYLE1GkmV9lB@ep-aged-leaf-79142791.us-west-2.aws.neon.tech:5432/verceldb?sslmode=require"
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
    for (const [index, proyecto] of jsonData.entries()) {
      try {
        // Convertir colaboradores a formato de array literal de Postgres
        const colaboradoresArray = formatStringToArray(proyecto.colaboradores);

        await client.query(
          `INSERT INTO proyectos 
          (numero_proyecto, anio_proyecto, titulo_proyecto, tipo_proyecto, autor, colaboradores, girado_a, acta_fecha, aprobado, tipo_norma, numero_norma, observaciones) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            proyecto.numero_proyecto,
            proyecto.anio_proyecto,
            proyecto.titulo_proyecto,
            proyecto.tipo_proyecto,
            formatStringToArray(proyecto.autor.join(',')), // Convertir autor a array de Postgres si es necesario
            colaboradoresArray,
            proyecto.girado_a,
            formatDate(proyecto.acta_fecha), // Convertir fecha al formato correcto
            proyecto.aprobado,
            proyecto.tipo_norma,
            proyecto.numero_norma,
            proyecto.observaciones,
          ]
        );

        successCount++;
        console.log(`Insertado proyecto ${index + 1} de ${jsonData.length}`);
      } catch (insertError) {
        errorCount++;
        console.error(`Error al insertar proyecto ${index + 1}:`, insertError);
      }
    }

    await client.end();
    console.log(`Datos insertados correctamente: ${successCount}`);
    console.log(`Errores al insertar: ${errorCount}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();
