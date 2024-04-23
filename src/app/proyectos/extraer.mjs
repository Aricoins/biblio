// Funciones auxiliares para extraer datos de cada campo del proyecto

function extraerNumeroProyecto(parrafo) {
    // Expresión regular que busca un número de 3 o 4 dígitos seguido de una barra '/'
    const regexNumeroProyecto = /(\b\d{3,4}\b)(?=\/)/;
    const coincidencia = regexNumeroProyecto.exec(parrafo);
    
    // Si se encuentra una coincidencia, devolver el número; de lo contrario, devolver una cadena vacía
    return coincidencia ? coincidencia[1] : '';
}

function extraerAnioProyecto(parrafo) {
    // Expresión regular que busca dos dígitos después de la barra (/)
    const regexAnioProyecto = /\/(\d{2})/;
    const coincidencia = regexAnioProyecto.exec(parrafo);
    
    // Si se encuentra una coincidencia, convertir los dos dígitos a un año completo (20XX)
    if (coincidencia) {
        const anio = coincidencia[1];
        // Convertir el año de dos dígitos a cuatro dígitos añadiendo '20' al inicio
        const anioCompleto = `20${anio}`;
        return anioCompleto;
    }
    
    // Si no se encuentra una coincidencia, devolver una cadena vacía
    return '';
}

function extraerTituloProyecto(parrafo) {
    // Expresión regular para extraer el texto entre comillas después del número/año de proyecto seguido de dos puntos
    const regexTituloProyecto = /\d{3,4}\/\d{2}:\s*"([^"]+)"/;
    const coincidencia = regexTituloProyecto.exec(parrafo);
    return coincidencia ? coincidencia[1] : '';
}


function extraerTipoProyecto(parrafo) {
    const regexTipoProyecto = /Proyecto de\s+(Ordenanza|Declaración|Comunicación|Resolución)/;
    const coincidencia = regexTipoProyecto.exec(parrafo);
    return coincidencia ? coincidencia[1].toLowerCase() : '';
}

function extraerAutor(parrafo) {
    // Expresión regular para extraer autor(es)
    const patronAutor = /(?:Autor(?:es)?):\s*([^;]+?)(?=\s*(Colaborador|Aprobado|Retirado|A las |A la |A Aseso|\[|\n))/i;

    // Buscar coincidencia en el texto
    const coincidencia = parrafo.match(patronAutor);
    if (coincidencia) {
        // Extraer el autor (grupo de captura)
        const autor = coincidencia[1].trim();
        return autor;
    }
    return null;
}
function extraerColaboradores(texto) {
    // Expresión regular para extraer colaboradores desde la palabra "Colaborador(es)" hasta el punto final de la oración.
    // La expresión es sensible a las abreviaturas (Sr., Lic., Dr., Mg.) y busca el primer punto final que no está precedido por una abreviatura.
    const patronColaboradores = /(?:Colaborador(?:es)?|Colaboradores?):\s*([^\.]+?(?<!\b(?:Sr|Lic|Dr|Mg)\.)(?=\.\s*(?:A\s|APROBADO|RETIRADO|\n|$)))/i;
    
    // Buscar coincidencia en el texto
    const coincidencia = texto.match(patronColaboradores);
    
    if (coincidencia) {
        // Extraer colaboradores (grupo de captura)
        const colaboradores = coincidencia[1].trim();
        return colaboradores;
    }
    return null;
}




function extraerGiradoA(parrafo) {
    // Expresión regular para extraer la oración que consigna el giro del proyecto
    // Busca una oración que comience con la preposición "A" y termine con un punto
    const regexGiradoA = /\bA\s([^.]*)\./;
    
    // Ejecuta la expresión regular en el párrafo
    const coincidencia = regexGiradoA.exec(parrafo);
    
    // Si se encuentra una coincidencia, devuelve el texto capturado
    if (coincidencia) {
        return coincidencia[1].trim();
    } else {
        // Si no se encuentra coincidencia, devuelve null
        return null;
    }
}

function extraerActaFecha(parrafo) {
    // Expresión regular para buscar el número de acta precedido por la palabra "Acta"
    const regexActaFecha = /Acta\s+(\d+\/\d+)/;
    
    // Ejecuta la expresión regular en el párrafo
    const coincidencia = regexActaFecha.exec(parrafo);
    
    // Si se encuentra una coincidencia, devuelve el número de acta (coincidencia[1])
    // Si no hay coincidencia, devuelve null
    return coincidencia ? coincidencia[1] : null;
}

function extraerAprobado(parrafo) {
    const regexAprobado = /(APROBADO)/;
    const coincidencia = regexAprobado.exec(parrafo);
    return coincidencia ? true : false;
}

function extraerTipoNorma(parrafo) {
    // Expresión regular para buscar la letra que representa el tipo de norma
    const regexTipoNorma = /(O|C|D|R)-\d+-/;
    const coincidencia = regexTipoNorma.exec(parrafo);

    // Mapeo entre las letras iniciales y las palabras correspondientes
    const tipoNormaMap = {
        'O': 'ordenanza',
        'C': 'comunicación',
        'D': 'declaración',
        'R': 'resolución'
    };

    // Si se encuentra una coincidencia, devolver la palabra completa del tipo de norma
    // Si no hay coincidencias, devolver una cadena vacía
    return coincidencia ? tipoNormaMap[coincidencia[1]] : '';
}

function extraerNumeroNorma(parrafo) {
    // Expresión regular para buscar el número de norma
    // Consiste en una letra inicial seguida de un guion y un número de norma
    const regexNumeroNorma = /(O|R|C|D)-\d+-\d+/;
    const coincidencia = regexNumeroNorma.exec(parrafo);

    // Si se encuentra una coincidencia, devolver toda la expresión que coincide
    // Si no hay coincidencias, devolver una cadena vacía
    return coincidencia ? coincidencia[0] : '';
}

function extraerObservaciones(parrafo) {
    // Expresión regular para buscar las observaciones
    // que podrían contener información sobre proyectos no aprobados
    const regexObservaciones = /(RETIRADO|NO APROBADO|OBSERVACIONES|LIBRO)\s+.*\d{2}\/\d{2}\/\d{2}(?:.*|\n)?/i;
    const coincidencia = regexObservaciones.exec(parrafo);
    
    // Si se encuentra una coincidencia, extrae el contenido relacionado
    return coincidencia ? coincidencia[0].trim() : '';
}




export {
    extraerNumeroProyecto,
    extraerAnioProyecto,
    extraerTituloProyecto,
    extraerTipoProyecto,
    extraerAutor,
    extraerColaboradores,
    extraerGiradoA,
    extraerActaFecha,
    extraerAprobado,
    extraerTipoNorma,
    extraerNumeroNorma,
    extraerObservaciones
    }