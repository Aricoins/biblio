import fs from "fs";
import mammoth from "mammoth";

// Funciones de extracción agrupadas en un objeto para facilitar su manejo
const extraccion = {
  extraerNumeroProyecto: function (parrafo) {
    const regexNumeroProyecto =
      /\bProyecto de (?:Ordenanza|Resolución)\s+(\d+)\//i;
    const coincidencia = regexNumeroProyecto.exec(parrafo);
    return coincidencia ? parseInt(coincidencia[1], 10).toString() : "";
  },

  extraerAnioProyecto: function (parrafo) {
    const regexAnioProyecto =
      /\bProyecto de (?:Ordenanza|Resolución) \d+\/(\d{2})/i;
    const coincidencia = regexAnioProyecto.exec(parrafo);
    return coincidencia ? `19${coincidencia[1]}` : "";
  },

  extraerTipoProyecto: function (parrafo) {
    const regexTipoNorma = /(Ordenanza|Resolución)/i;
    const coincidencia = regexTipoNorma.exec(parrafo);
    return coincidencia ? coincidencia[1].toLowerCase() : "";
  },

  extraerAutor: function (parrafo) {
    const regexAutor = /Autor(?:a|es)?:\s*([^.;\n]+)/i;
    const coincidencia = regexAutor.exec(parrafo);
    return coincidencia ? coincidencia[1].split(",").map((a) => a.trim()) : [];
  },

  extraerColaboradores: function (parrafo) {
    const regexColaboradores = /Colaborador(?:es)?:\s*([^.;\n]+)/i;
    const coincidencia = regexColaboradores.exec(parrafo);
    return coincidencia ? coincidencia[1] : null;
  },

  extraerNumeroNorma: function (parrafo) {
    // Regex to capture three-digit number following "O-" and preceding "-c-"
    const regexNumeroNorma = /\(O-(\d{3})-c-\d{2}\)/i;
    const match = regexNumeroNorma.exec(parrafo);

    // Return only the three-digit number if a match is found
    return match ? match[1] : "";
  },

  extraerTituloProyecto: function(parrafo) {
    // Expresión regular para capturar el texto después de "Proyecto de (Ordenanza|Resolución) {número}/{año}:" hasta el siguiente punto o el final de la línea.
    const regexTituloProyecto = /:\s*([^:.]+)\.?/i;
    const match = regexTituloProyecto.exec(parrafo);
  
    // Devolver el texto capturado como título si se encuentra
    return match ? match[1].trim() : "";
  },
  
  extraerGiradoA: function (parrafo) {
    const regexGiradoA = /\bA\s([^.]*)\./i;
    const coincidencia = regexGiradoA.exec(parrafo);
    return coincidencia ? coincidencia[1].trim() : "";
  },

  extraerActaFecha: function (parrafo) {
    const regexActaFecha = /Acta\s+(\d+\/\d+)/;
    const coincidencia = regexActaFecha.exec(parrafo);
    return coincidencia ? coincidencia[1] : null;
  },

  extraerAprobado: function (parrafo) {
    return /\bAPROBADO\b/i.test(parrafo);
  },

  extraerObservaciones: function (parrafo) {
    return this.extraerAprobado(parrafo) ? "" : "en tratamiento";
  },

  // Extraer tipo de norma del párrafo
  extraerTipoNorma: function (parrafo) {
    // Cambié la expresión regular para capturar solo la primera letra antes de los guiones
    const regexTipoNorma = /(O|C|D|R)-\d{2,4}-/;
    const coincidencia = regexTipoNorma.exec(parrafo);

    if (coincidencia) {
      // Mapeo de prefijo a tipo de norma
      const tipoNormaMap = {
        O: "ordenanza",
        C: "comunicacion",
        D: "declaracion",
        R: "resolucion",
      };
      return tipoNormaMap[coincidencia[1]];
    }
    return "";
  },

  extraerColaboradores: function (texto) {
    // Expresión regular para extraer colaboradores desde la palabra "Colaborador(es)"
    // hasta el primer punto que no está precedido por una abreviatura común (Sr., Lic., Dr., Mg., etc.).
    // Usa un lookbehind para verificar que el punto no es parte de una abreviatura.
    const patronColaboradores =
      /(?:Colaborador(?:es)?|Colaboradores?):\s*([\w\s,]+)(?<!\b(?:Sr)\.)(?=\.\s*(?:A\s|APROBADO|RETIRADO|\n|$))/i;

    // Buscar coincidencia en el texto
    const coincidencia = texto.match(patronColaboradores);

    if (coincidencia) {
      // Extraer colaboradores (grupo de captura)
      const colaboradores = coincidencia[1].trim();
      return colaboradores;
    }
    return null;
  },
  extraerGiradoA: function (parrafo) {
    const regexGiradoA = /\bA\s([^.]*)\./;
    const coincidencia = regexGiradoA.exec(parrafo);
    return coincidencia ? coincidencia[1].trim() : "";
  },

  extraerActaFecha: function (parrafo) {
    const regexActaFecha = /Acta\s+(\d+\/\d+)/;
    const coincidencia = regexActaFecha.exec(parrafo);
    return coincidencia ? coincidencia[1] : null;
  },

  extraerTipoNorma: function (parrafo) {
    const regexTipoNorma = /(O|C|D|R)-\d+-/;
    const coincidencia = regexTipoNorma.exec(parrafo);
    const tipoNormaMap = {
      O: "ordenanza",
      C: "comunicacion",
      D: "declaracion",
      R: "resolucion",
    };
    return coincidencia ? tipoNormaMap[coincidencia[1]] : "";
  },

  extraerNumeroNorma: function (parrafo) {
    // Improved regex to capture three-digit number followed by "-C" or "-c"
    const regexNumeroNorma = /(\d{3})-(?:C|c)/;
    const match = regexNumeroNorma.exec(parrafo);

    // Debugging logs
    console.log("Processing paragraph:", parrafo);
    console.log("Regex match result:", match);

    // Return the three-digit number if a match is found
    return match ? match[1] : "";
  },

  extraerAprobado: function (parrafo) {
    // Expresión regular para detectar la palabra "aprobado"
    // Verifica que la palabra "aprobado" está en un contexto relevante
    const regexAprobado = /\baprobado\b/i;

    // Usar la función extraerNumeroNorma para comprobar si hay un número de norma presente
    const numeroNorma = this.extraerNumeroNorma(parrafo);

    // Considerar un proyecto aprobado si tiene la palabra "aprobado" o un número de norma válido
    const coincidenciaAprobado = regexAprobado.test(parrafo);
    return coincidenciaAprobado || numeroNorma !== "";
  },

  extraerObservaciones: function (parrafo) {
    // Usar extraerAprobado para verificar si el proyecto está aprobado
    const aprobado = this.extraerAprobado(parrafo);
    if (aprobado === true) {
      return "";
    } else return "sin sanción";
  },
};

async function generarDatosProyecto(rutaArchivoDocx) {
  try {
    // Leer el archivo DOCX
    const { value: textoCompleto } = await mammoth.extractRawText({
      path: rutaArchivoDocx,
    });

    // Divide el texto completo en párrafos y filtra los vacíos
    const parrafos = textoCompleto
      .split("\n")
      .filter((parrafo) => parrafo.trim() !== "");

    // Lista para almacenar los datos extraídos
    const listaDatosProyecto = [];
    let contadorID = 36468;
    // Itera sobre cada párrafo y extrae los datos
    parrafos.forEach((parrafo) => {
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
        observaciones: extraccion.extraerObservaciones(parrafo),
      };

      // Agrega los datos extraídos a la lista
      listaDatosProyecto.push(datosProyecto);
    });

    return listaDatosProyecto;
  } catch (error) {
    console.error("Error al generar los datos del proyecto:", error);
    return null;
  }
}

async function guardarDatosEnJSON(rutaArchivoDocx, rutaArchivoJson) {
  const datos = await generarDatosProyecto(rutaArchivoDocx);

  if (datos) {
    // Escribe los datos en formato JSON
    fs.writeFileSync(rutaArchivoJson, JSON.stringify(datos, null, 2));
    console.log(
      "Los datos se han guardado en formato JSON en",
      rutaArchivoJson
    );
  }
}

// Usa las funciones para leer el archivo DOCX y guardar los datos en formato JSON
const rutaArchivoDocx = "./99.docx";
const rutaArchivoJson = "./99.json";

guardarDatosEnJSON(rutaArchivoDocx, rutaArchivoJson);
