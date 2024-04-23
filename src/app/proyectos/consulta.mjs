
import fs from 'fs';
import mammoth from 'mammoth';

// Funciones de extracción agrupadas en un objeto para facilitar su manejo
const extraccion = {
    extraerNumeroProyecto: function(parrafo) {
        const regexNumeroProyecto = /(\b\d{3,4}\b)(?=\/)/;
        const coincidencia = regexNumeroProyecto.exec(parrafo);
        return coincidencia ? coincidencia[1] : '';
    },

    extraerAnioProyecto: function(parrafo) {
        const regexAnioProyecto = /\/(\d{2})/;
        const coincidencia = regexAnioProyecto.exec(parrafo);
        if (coincidencia) {
            return `20${coincidencia[1]}`;
        }
        return '';
    },

    extraerTituloProyecto: function(parrafo) {
           const regexTituloProyecto = /\d{3,4}\/\d{2}:\s*(["“”])([^"“”]+)\1/;
            const coincidencia = regexTituloProyecto.exec(parrafo);
            return coincidencia ? coincidencia[2] : '';
        },

    extraerTipoProyecto: function(parrafo) {
        const regexTipoProyecto = /Proyecto de\s+(Ordenanza|Declaración|Comunicación|Resolución)/;
        const coincidencia = regexTipoProyecto.exec(parrafo);
        return coincidencia ? coincidencia[1].toLowerCase() : '';
    },

    extraerAutor: function(parrafo) {
        const patronAutor = /(?:Autor(?:es)?):\s*([^;]+?)(?=\s*(Colaborador|Aprobado|Retirado|A las |A la |A Aseso|\[|\n))/i;
        const coincidencia = parrafo.match(patronAutor);
        if (coincidencia) {
            // Extraer el autor (grupo de captura)
            const autor = coincidencia[1].trim();
            return autor;
        }
        return null;
    },

    extraerColaboradores: function (texto) {
        // Expresión regular para extraer colaboradores desde la palabra "Colaborador(es)"
        // hasta el primer punto que no está precedido por una abreviatura común (Sr., Lic., Dr., Mg., etc.).
        // Usa un lookbehind para verificar que el punto no es parte de una abreviatura.
        const patronColaboradores = /(?:Colaborador(?:es)?|Colaboradores?):\s*([\w\s,]+)(?<!\b(?:Sr|Lic|Dr|Mg|Ing|Prof|Ing)\.)(?=\.\s*(?:A\s|APROBADO|RETIRADO|\n|$))/i;
        
        // Buscar coincidencia en el texto
        const coincidencia = texto.match(patronColaboradores);
        
        if (coincidencia) {
            // Extraer colaboradores (grupo de captura)
            const colaboradores = coincidencia[1].trim();
            return colaboradores;
        }
        return null;
    }
   , 
    

    extraerGiradoA: function(parrafo) {
        const regexGiradoA = /\bA\s([^.]*)\./;
        const coincidencia = regexGiradoA.exec(parrafo);
        return coincidencia ? coincidencia[1].trim() : '';
    },

    extraerActaFecha: function(parrafo) {
        const regexActaFecha = /Acta\s+(\d+\/\d+)/;
        const coincidencia = regexActaFecha.exec(parrafo);
        return coincidencia ? coincidencia[1] : null;
    },

    extraerAprobado: function(parrafo) {
        const regexAprobado = /(APROBADO)/;
        const coincidencia = regexAprobado.exec(parrafo);
        return coincidencia ? true : false;
    },

    extraerTipoNorma: function(parrafo) {
        const regexTipoNorma = /(O|C|D|R)-\d+-/;
        const coincidencia = regexTipoNorma.exec(parrafo);
        const tipoNormaMap = {
            'O': 'ordenanza',
            'C': 'comunicación',
            'D': 'declaración',
            'R': 'resolución'
        };
        return coincidencia ? tipoNormaMap[coincidencia[1]] : '';
    },

    extraerNumeroNorma: function(parrafo) {
        const regexNumeroNorma = /(O|R|C|D)-\d+-\d+/;
        const coincidencia = regexNumeroNorma.exec(parrafo);
        return coincidencia ? coincidencia[0] : '';
    },

    extraerObservaciones: function(parrafo) {
        const regexObservaciones = /(RETIRADO|NO APROBADO|OBSERVACIONES|LIBRO)\s+.*\d{2}\/\d{2}\/\d{2}(?:.*|\n)?/i;
        const coincidencia = regexObservaciones.exec(parrafo);
        return coincidencia ? coincidencia[0].trim() : '';
    }
};

async function generarDatosProyecto(rutaArchivoDocx) {
    try {
        // Leer el archivo DOCX
        const { value: textoCompleto } = await mammoth.extractRawText({ path: rutaArchivoDocx });
        
        // Divide el texto completo en párrafos y filtra los vacíos
        const parrafos = textoCompleto.split('\n').filter(parrafo => parrafo.trim() !== '');

        // Lista para almacenar los datos extraídos
        const listaDatosProyecto = [];
        
        // Itera sobre cada párrafo y extrae los datos
        parrafos.forEach(parrafo => {
            const datosProyecto = {
                numero_proyecto: extraccion.extraerNumeroProyecto(parrafo),
                anio_proyecto: extraccion.extraerAnioProyecto(parrafo),
                titulo_proyecto: extraccion.extraerTituloProyecto(parrafo),
                tipo_proyecto: extraccion.extraerTipoProyecto(parrafo),
                autor: extraccion.extraerAutor(parrafo),
                colaboradores: extraccion.extraerColaboradores(parrafo),
                girado_a: extraccion.extraerGiradoA(parrafo),
                acta_fecha: extraccion.extraerActaFecha(parrafo),
                aprobado: extraccion.extraerAprobado(parrafo),
                tipo_norma: extraccion.extraerTipoNorma(parrafo),
                numero_norma: extraccion.extraerNumeroNorma(parrafo),
                observaciones: extraccion.extraerObservaciones(parrafo)
            };

            // Agrega los datos extraídos a la lista
            listaDatosProyecto.push(datosProyecto);
        });

        return listaDatosProyecto;
    } catch (error) {
        console.error('Error al generar los datos del proyecto:', error);
        return null;
    }
}

async function guardarDatosEnJSON(rutaArchivoDocx, rutaArchivoJson) {
    const datos = await generarDatosProyecto(rutaArchivoDocx);
    
    if (datos) {
        // Escribe los datos en formato JSON
        fs.writeFileSync(rutaArchivoJson, JSON.stringify(datos, null, 2));
        console.log('Los datos se han guardado en formato JSON en', rutaArchivoJson);
    }
}

// Usa las funciones para leer el archivo DOCX y guardar los datos en formato JSON
const rutaArchivoDocx = './proyectos.docx';
const rutaArchivoJson = './proyectos.json';

guardarDatosEnJSON(rutaArchivoDocx, rutaArchivoJson);
