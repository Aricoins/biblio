// uploadPCMData.js
import { createClient } from '@vercel/postgres';
import fs from 'fs';

// Cargar JSON
const jsonData = JSON.parse(fs.readFileSync('./datos_pcm_2.json'));

// Configurar el cliente de Postgres
const client = createClient({
  connectionString: process.env.POSTGRES_CONNECTION_STRING
});

// Función para extraer el número y el año del número de PCM
function extractNumberAndYearFromPCM(numeroPCM) {
  const match = numeroPCM.match(/^(\d+)-PCM-(\d{2})$/);
  if (match) {
    return {
      numero_proyecto: match[1],    // Número antes del primer guión
      anio_proyecto: `20${match[2]}` // Año después del último guión con prefijo '20'
    };
  }
  return { numero_proyecto: null, anio_proyecto: null };
}

(async () => {
  try {
    await client.connect();

    let successCount = 0;
    let errorCount = 0;
    let idCounter = 6002; // Inicializa el contador de IDs

    for (const [index, pcm] of jsonData.entries()) {
      try {
        const { numero_proyecto, anio_proyecto } = extractNumberAndYearFromPCM(pcm.numero_pcm);

        await client.query(
          `INSERT INTO proyectos 
          (id, numero_proyecto, anio_proyecto, titulo_proyecto, tipo_proyecto, autor, colaboradores, girado_a, acta_fecha, aprobado, tipo_norma, numero_norma, observaciones) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [
            idCounter,                       // Nuevo ID generado
            numero_proyecto,                // Número de proyecto derivado de 'numero_pcm'
            anio_proyecto,                  // Año de proyecto derivado de 'numero_pcm'
            pcm.descripcion,                // Título del proyecto
            "PCM",                          // Tipo de proyecto
            `{${pcm.autor}}`,               // Autor en formato array (cadena de texto)
            '{}',                           // Colaboradores como array vacío
            '',                             // Girado_a (vacío en este caso)
            null,                           // acta_fecha (null en este caso)
            true,                           // aprobado (por defecto true, ajustar según necesidad)
            pcm.tipo_norma,                 // Tipo de norma
            pcm.numero_norma,               // Número de norma
            pcm.enlace                       // Enlace como observaciones
          ]
        );

        idCounter++; // Incrementa el ID para el próximo registro
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
