
import fs from 'fs';
import mammoth from 'mammoth';

// Funciones de extracción agrupadas en un objeto para facilitar su manejo
const extraccion = {
    extraerNumeroProyecto: function(parrafo) {
        const regexNumeroProyecto = /(\b\d{1,4}\b)(?=\/)/;  // Captura números de 1 a 4 dígitos
        const coincidencia = regexNumeroProyecto.exec(parrafo);
        if (coincidencia) {
            // Convierte la coincidencia a un número entero para eliminar los ceros a la izquierda
            const numeroProyecto = parseInt(coincidencia[1], 10);
            return numeroProyecto.toString();
        }
        return '';
    }
,    

    extraerAnioProyecto: function(parrafo) {
        const regexAnioProyecto = /\/(\d{2})/;
        const coincidencia = regexAnioProyecto.exec(parrafo);
        if (coincidencia) {
            return `20${coincidencia[1]}`;
        }
        return '';
    },

    extraerTituloProyecto: function(parrafo) {
        const regexTituloProyecto = /\d+\/\d+:\s*“([^“”]+)”/;

        const coincidencia = regexTituloProyecto.exec(parrafo);
        return coincidencia ? coincidencia[1] : '';
    },
    

    extraerTipoProyecto: function(parrafo) {
        const regexTipoNorma = /(O|C|D|R)-\d{2,4}-/;
        const coincidencia = regexTipoNorma.exec(parrafo);
        
        if (coincidencia) {
            // Mapeo de prefijo a tipo de norma
            const tipoNormaMap = {
                'O': 'ordenanza',
                'C': 'comunicación',
                'D': 'declaración',
                'R': 'resolución'
            };
            return tipoNormaMap[coincidencia[1]];
        }
        return '';
    }
    ,
    extraerAutor: function (parrafo) {
        // Expresión regular para capturar los nombres de los autores
        const regex = /(?:Autor(?:a|es)?:)\s*([^.;\n]+)(?:\s*(?:\.|;|\n|Colaboradores|Aprobado|Retirado|Se gira|A las|Iniciativa|A la|A Asesoría))/gi;

        // Ejecuta la expresión regular y almacena las coincidencias
        const matches = parrafo.match(regex);
    
        // Inicializa un array vacío para almacenar los autores
        const autores = [];
    
        // Si hay coincidencias, procesa cada una
        if (matches) {
            for (const match of matches) {
                // Extrae el nombre del autor eliminando el prefijo "Autor(es):" y otros caracteres no deseados
                const autor = match.replace(/(?:Autor(?:a|es)?:\s*)/, '').trim();
                
                // Agrega el nombre del autor al array
                autores.push(autor);
            }
        }
    
        // Devuelve el array con los nombres de los autores
        return autores;
    }
    
    

    ,
    


    // Extraer tipo de norma del párrafo
    extraerTipoNorma: function(parrafo) {
        // Cambié la expresión regular para capturar solo la primera letra antes de los guiones
        const regexTipoNorma = /(O|C|D|R)-\d{2,4}-/;
        const coincidencia = regexTipoNorma.exec(parrafo);
        
        if (coincidencia) {
            // Mapeo de prefijo a tipo de norma
            const tipoNormaMap = {
                'O': 'ordenanza',
                'C': 'comunicación',
                'D': 'declaración',
                'R': 'resolución'
            };
            return tipoNormaMap[coincidencia[1]];
        }
        return '';
    },

    extraerColaboradores: function (texto) {
        // Expresión regular para extraer colaboradores desde la palabra "Colaborador(es)"
        // hasta el primer punto que no está precedido por una abreviatura común (Sr., Lic., Dr., Mg., etc.).
        // Usa un lookbehind para verificar que el punto no es parte de una abreviatura.
        const patronColaboradores = /(?:Colaborador(?:es)?|Colaboradores?):\s*([\w\s,]+)(?<!\b(?:Sr)\.)(?=\.\s*(?:A\s|APROBADO|RETIRADO|\n|$))/i;
        
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
            // Mejorar la expresión regular para extraer varios formatos de número de norma
            const regexNumeroNorma = /\b(O|R|C|D)-\d{2,4}-\d{2,4}\b/;
            const coincidencia = regexNumeroNorma.exec(parrafo);
            return coincidencia ? coincidencia[0] : '';
        },
    
        extraerAprobado: function(parrafo) {
            // Expresión regular para detectar la palabra "aprobado"
            // Verifica que la palabra "aprobado" está en un contexto relevante
            const regexAprobado = /\baprobado\b/i;
            
            // Usar la función extraerNumeroNorma para comprobar si hay un número de norma presente
            const numeroNorma = this.extraerNumeroNorma(parrafo);
            
            // Considerar un proyecto aprobado si tiene la palabra "aprobado" o un número de norma válido
            const coincidenciaAprobado = regexAprobado.test(parrafo);
            return coincidenciaAprobado || numeroNorma !== '';
        }
,        
    
        extraerObservaciones: function(parrafo) {
            // Usar extraerAprobado para verificar si el proyecto está aprobado
            const aprobado = this.extraerAprobado(parrafo);
            if (aprobado === true) {return '';}
            else return "sin sanción"
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
        let contadorID = 5190;
        // Itera sobre cada párrafo y extrae los datos
        parrafos.forEach(parrafo => {
            const datosProyecto = {
                id: contadorID++, 
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
const rutaArchivoDocx = './proyectos2.docx';
const rutaArchivoJson = './proyectos4.json';

guardarDatosEnJSON(rutaArchivoDocx, rutaArchivoJson);
