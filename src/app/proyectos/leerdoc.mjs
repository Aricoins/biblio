import mammoth from 'mammoth';

// Función para leer un archivo de Word y devolver su contenido como una cadena
export default async function leerArchivoDocx(rutaArchivo) {
    // Utiliza la biblioteca mammoth para leer el archivo de Word
    const { value } = await mammoth.extractRawText({ path: rutaArchivo });
    
    // Divide el contenido en un array de párrafos usando el salto de línea como separador
    const parrafos = value.split('\n').filter(parrafo => parrafo.trim() !== '');
    
    return parrafos;
}

// Ejemplo de uso con un archivo de Word
const rutaArchivoDocx = './proyectos.docx';
leerArchivoDocx(rutaArchivoDocx).then(parrafosPrueba => {
    console.log(parrafosPrueba);
});
