// Función principal para extraer datos y generar consulta INSERT
import { extraerNumeroProyecto, extraerAnioProyecto,  extraerTituloProyecto, extraerTipoProyecto, extraerAutor, extraerColaboradores, extraerGiradoA, extraerActaFecha, extraerAprobado, extraerTipoNorma, extraerNumeroNorma, extraerObservaciones } from './extraer.mjs';



export default function generarConsultaInsert(parrafo) {
    // Extraer datos del proyecto
    const datosProyecto = {
        numero_proyecto: extraerNumeroProyecto(parrafo),
        anio_proyecto: extraerAnioProyecto(parrafo),
        titulo_proyecto: extraerTituloProyecto(parrafo),
        tipo_proyecto: extraerTipoProyecto(parrafo),
        autor: extraerAutor(parrafo),
        colaboradores: extraerColaboradores(parrafo),
        girado_a: extraerGiradoA(parrafo),
        acta_fecha: extraerActaFecha(parrafo),
        aprobado: extraerAprobado(parrafo),
        tipo_norma: extraerTipoNorma(parrafo),
        numero_norma: extraerNumeroNorma(parrafo),
        observaciones: extraerObservaciones(parrafo)
    };

    // Generar consulta INSERT
    const consultaInsert = `
        INSERT INTO proyectos (
            numero_proyecto,
            anio_proyecto,
            titulo_proyecto,
            tipo_proyecto,
            autor,
            colaboradores,
            girado_a,
            acta_fecha,
            aprobado,
            tipo_norma,
            numero_norma,
            observaciones
        )
        VALUES (
            '${datosProyecto.numero_proyecto}',
            '${datosProyecto.anio_proyecto}',
            '${datosProyecto.titulo_proyecto}',
            '${datosProyecto.tipo_proyecto}',
            '${datosProyecto.autor}',
            '{${datosProyecto.colaboradores}}',
            '${datosProyecto.girado_a}',
            '${datosProyecto.acta_fecha}',
            ${datosProyecto.aprobado},
            '${datosProyecto.tipo_norma}',
            '${datosProyecto.numero_norma}',
            '${datosProyecto.observaciones}'
        );
    `;
    
    return consultaInsert;
}
