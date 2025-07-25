// prisma/seed.js
// Seed script for the 'proyectos' table using proyectos.json

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const proyectosPath = path.join(__dirname, '../src/knowledge/proyectos.json');
  const raw = fs.readFileSync(proyectosPath, 'utf8');
  const proyectos = JSON.parse(raw);

  for (const proyecto of proyectos) {
    try {
      await prisma.proyectos.upsert({
        where: {
          numero_proyecto_anio_proyecto: {
            numero_proyecto: proyecto.numero_proyecto || '',
            anio_proyecto: proyecto.anio_proyecto || '',
          }
        },
        update: {
          titulo_proyecto: proyecto.titulo_proyecto || '',
          tipo_proyecto: proyecto.tipo_proyecto || '',
          autor: proyecto.autor || [],
          colaboradores: proyecto.colaboradores || '',
          girado_a: proyecto.girado_a || '',
          acta_fecha: proyecto.acta_fecha ? new Date(proyecto.acta_fecha) : null,
          aprobado: proyecto.aprobado || false,
          tipo_norma: proyecto.tipo_norma || '',
          numero_norma: proyecto.numero_norma || '',
          observaciones: proyecto.observaciones || '',
        },
        create: {
          numero_proyecto: proyecto.numero_proyecto || '',
          anio_proyecto: proyecto.anio_proyecto || '',
          titulo_proyecto: proyecto.titulo_proyecto || '',
          tipo_proyecto: proyecto.tipo_proyecto || '',
          autor: proyecto.autor || [],
          colaboradores: proyecto.colaboradores || '',
          girado_a: proyecto.girado_a || '',
          acta_fecha: proyecto.acta_fecha ? new Date(proyecto.acta_fecha) : null,
          aprobado: proyecto.aprobado || false,
          tipo_norma: proyecto.tipo_norma || '',
          numero_norma: proyecto.numero_norma || '',
          observaciones: proyecto.observaciones || '',
        }
      });
    } catch (err) {
      console.error(`Error upserting proyecto id ${proyecto.id}:`, err.message);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
