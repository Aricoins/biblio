import fs from 'fs';
import mammoth from 'mammoth';

// Funciones de extracción agrupadas en un objeto para facilitar su manejo
const extraccionPCM = {
    extraerNumeroPCM: function(parrafo) {
        const regexNumeroPCM = /Resolución (\d+-PCM-\d{2}):/;
        const coincidencia = regexNumeroPCM.exec(parrafo);
        return coincidencia ? coincidencia[1] : '';
    },

    extraerDescripcion: function(parrafo) {
        const regexDescripcion = /Resolución \d+-PCM-\d{2}:\s*“([^“”]+)”/;
        const coincidencia = regexDescripcion.exec(parrafo);
        return coincidencia ? coincidencia[1] : '';
    },

    extraerAutor: function(parrafo) {
        const regexAutor = /Autora?:\s*([^.;]+)/;
        const coincidencia = regexAutor.exec(parrafo);
        return coincidencia ? coincidencia[1].trim() : '';
    },

    extraerNumeroNorma: function(parrafo) {
        const regexNumeroNorma = /\b([RCD]-\d{2}-\d+)\b/;
        const coincidencia = regexNumeroNorma.exec(parrafo);
        return coincidencia ? coincidencia[1] : '';
    }
};

async function generarDatosPCM(rutaArchivoDocx) {
    try {
        const { value: textoCompleto } = await mammoth.extractRawText({ path: rutaArchivoDocx });
        const parrafos = textoCompleto.split('\n').filter(parrafo => parrafo.trim() !== '');
        const listaDatosPCM = [];
        let contadorID = 1;

        parrafos.forEach(parrafo => {
            const datosPCM = {
                id: contadorID++,
                numero_pcm: extraccionPCM.extraerNumeroPCM(parrafo),
                descripcion: extraccionPCM.extraerDescripcion(parrafo),
                autor: extraccionPCM.extraerAutor(parrafo),
                numero_norma: extraccionPCM.extraerNumeroNorma(parrafo)
            };
            if (datosPCM.numero_pcm) {
                listaDatosPCM.push(datosPCM);
            }
        });

        return listaDatosPCM;
    } catch (error) {
        console.error('Error al generar los datos PCM:', error);
        return null;
    }
}

async function guardarDatosEnJSON(rutaArchivoDocx, rutaArchivoJson) {
    const datos = await generarDatosPCM(rutaArchivoDocx);
    if (datos) {
        fs.writeFileSync(rutaArchivoJson, JSON.stringify(datos, null, 2));
        console.log('Los datos PCM se han guardado en formato JSON en', rutaArchivoJson);
    }
}

// Usa las funciones para leer el archivo DOCX y guardar los datos en formato JSON
const rutaArchivoDocx = './PCMs.docx'; // Ajusta la ruta al archivo DOCX si es necesario
const rutaArchivoJson = './datos_pcm2.json'; // Nombre del archivo JSON de salida

guardarDatosEnJSON(rutaArchivoDocx, rutaArchivoJson);
