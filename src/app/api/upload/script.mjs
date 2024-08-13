import fs from 'fs';
import mammoth from 'mammoth';
import axios from 'axios';
import Papa from 'papaparse';

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
        const regexNumeroNorma = /([RCD]-\d{2}-(\d+))/;
        const coincidencia = regexNumeroNorma.exec(parrafo);
        return coincidencia ? coincidencia[1] : '';
    },

    extraerNumeroNormaLimpio: function(numeroNormaConFormato) {
        // Extraer solo el número final eliminando letras y guiones
        const partes = numeroNormaConFormato.split('-');
        return partes[partes.length - 1];
    },

    determinarTipoNorma: function(numeroNormaConFormato) {
        if (numeroNormaConFormato.startsWith('R')) return 'Resolución';
        if (numeroNormaConFormato.startsWith('D')) return 'Declaración';
        if (numeroNormaConFormato.startsWith('C')) return 'Comunicación';
        return 'Tipo no reconocido';
    }
};

// Función para obtener los datos CSV desde el enlace
async function obtenerDatosCSV(url) {
    try {
        const response = await axios.get(url);
        const results = Papa.parse(response.data, { header: true });
        return results.data;
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        return [];
    }
}

// Función para obtener enlaces desde los CSV
async function obtenerEnlacesNormas() {
    const comunicacionesURL = 'https://docs.google.com/spreadsheets/d/1KoyL-x3dbhccFmeIlX3zt1R0icuzn65dbFCGiOMp5oI/pub?output=csv';
    const declaracionesURL = 'https://docs.google.com/spreadsheets/d/1twqmBDVFEhtBZU6WXMn4lbpSoAxnGnBwW4maUtTwtnc/pub?output=csv';
    const resolucionesURL = 'https://docs.google.com/spreadsheets/d/1PkJrgLmGjkbNwIKZKRGfXbFLCrrCoo-M2gx-05bAeNM/pub?output=csv';

    const comunicacionesData = await obtenerDatosCSV(comunicacionesURL);
    const declaracionesData = await obtenerDatosCSV(declaracionesURL);
    const resolucionesData = await obtenerDatosCSV(resolucionesURL);

    return { comunicacionesData, declaracionesData, resolucionesData };
}

// Función para generar datos PCM desde el archivo DOCX y agregar enlaces
async function procesarDatos(rutaArchivoDocx, rutaArchivoJson, rutaArchivoJsonConEnlaces) {
    try {
        // Extracción de datos del archivo DOCX
        const { value: textoCompleto } = await mammoth.extractRawText({ path: rutaArchivoDocx });
        const parrafos = textoCompleto.split('\n').filter(parrafo => parrafo.trim() !== '');
        const listaDatosPCM = [];
        let contadorID = 452;

        for (const parrafo of parrafos) {
            const numeroNormaConFormato = extraccionPCM.extraerNumeroNorma(parrafo);
            const numeroNormaLimpio = extraccionPCM.extraerNumeroNormaLimpio(numeroNormaConFormato);
            const tipoNorma = extraccionPCM.determinarTipoNorma(numeroNormaConFormato);


            const datosPCM = {
                id: contadorID++,
                numero_pcm: extraccionPCM.extraerNumeroPCM(parrafo),
                descripcion: extraccionPCM.extraerDescripcion(parrafo),
                autor: extraccionPCM.extraerAutor(parrafo),
                numero_norma: numeroNormaConFormato,
                numero_norma_limpio: numeroNormaLimpio,
                tipo_norma: tipoNorma
            };
            if (datosPCM.numero_pcm) {
                listaDatosPCM.push(datosPCM);
            }
        }

        // Guardar los datos PCM en formato JSON
        fs.writeFileSync(rutaArchivoJson, JSON.stringify(listaDatosPCM, null, 2));
        console.log('Los datos PCM se han guardado en formato JSON en', rutaArchivoJson);

        // Obtener enlaces desde los CSV
        const { comunicacionesData, declaracionesData, resolucionesData } = await obtenerEnlacesNormas();
        // Agregar enlaces a los datos PCM
        for (const data of listaDatosPCM) {
            let enlace = '';
            if (data.numero_norma_limpio) {
                switch (data.tipo_norma) {
                    case 'Resolución':
                        console.log(`Buscando en resoluciones: ${data.numero_norma_limpio}`);
                        const resultado = resolucionesData.find(row => row['Numero'].trim() === data.numero_norma_limpio);
                        if (resultado) {
                            console.log(`Encontrado: ${resultado['Numero']}, Enlace: ${resultado['Link']}`);
                            enlace = resultado['Link'] || 'Enlace no disponible';
                        } else {
                            console.log(`No encontrado para: ${data.numero_norma_limpio}`);
                        }
                        break;
                    
                    case 'Comunicación':
                        enlace = comunicacionesData.find(row => row['Numero'] === data.numero_norma_limpio)?.['Link'] || '';
                        break;
                    case 'Declaración':
                        enlace = declaracionesData.find(row => row['Numero'] === data.numero_norma_limpio)?.['Link'] || '';
                        break;
                    default:
                        console.log(`Tipo de norma no reconocido: ${data.tipo_norma}`);
                }
            }
            data.enlace = enlace;
        }

        // Guardar los datos PCM con enlaces en formato JSON
        fs.writeFileSync(rutaArchivoJsonConEnlaces, JSON.stringify(listaDatosPCM, null, 2));
        console.log('Los datos PCM con enlaces se han guardado en formato JSON en', rutaArchivoJsonConEnlaces);

    } catch (error) {
        console.error('Error al procesar los datos:', error);
    }
}

// Usa la función principal para procesar datos
const rutaArchivoDocx = './PCM2.docx'; // Ajusta la ruta al archivo DOCX si es necesario
const rutaArchivoJson = './datos_pcm333.json'; // Nombre del archivo JSON de salida
const rutaArchivoJsonConEnlaces = './datos_pcm_333json'; // Nombre del archivo JSON de salida con enlaces

procesarDatos(rutaArchivoDocx, rutaArchivoJson, rutaArchivoJsonConEnlaces);
