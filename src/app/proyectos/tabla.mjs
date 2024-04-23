// Función principal para extraer datos y devolver datos en formato JSON
import { extraerNumeroProyecto, extraerAnioProyecto, extraerTituloProyecto, extraerTipoProyecto, extraerAutor, extraerColaboradores, extraerGiradoA, extraerActaFecha, extraerAprobado, extraerTipoNorma, extraerNumeroNorma, extraerObservaciones } from './extraer.mjs';

export default function generarDatosProyecto(parrafo) {
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

    // Devuelve los datos en formato JSON
    console.log(datosProyecto)
    return datosProyecto;
}
