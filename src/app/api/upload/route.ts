import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import mammoth from 'mammoth';
import * as formidable from 'formidable';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

const extraccion = {
    extraerPCM: function (parrafo: string) {
        const regexPCM = /Resolución (\d+-PCM-\d{2}):/;
        const coincidencia = regexPCM.exec(parrafo);
        return coincidencia ? coincidencia[1] : '';
    },

    extraerDescripcion: function (parrafo: string) {
        const regexDescripcion = /Resolución \d+-PCM-\d{2}:\s*“([^“”]+)”/;
        const coincidencia = regexDescripcion.exec(parrafo);
        return coincidencia ? coincidencia[1] : '';
    },

    extraerAutor: function (parrafo: string) {
        const regexAutor = /(?:Autor|Autora):\s*([^.;]+)/;
        const coincidencia = regexAutor.exec(parrafo);
        return coincidencia ? coincidencia[1] : '';
    },

    extraerNumeroNorma: function (parrafo: string) {
        const regexNumeroNorma = /\b(R-\d+-\d+)\b/;
        const coincidencia = regexNumeroNorma.exec(parrafo);
        return coincidencia ? coincidencia[1] : '';
    },
};

async function generarDatosProyecto(rutaArchivoDocx: string) {
    try {
        const { value: textoCompleto } = await mammoth.extractRawText({ path: rutaArchivoDocx });
        const parrafos = textoCompleto.split('\n').filter(parrafo => parrafo.trim() !== '');
        const listaDatosProyecto: { pcm: string; descripcion: string; autor: string; numero_norma: string; }[] = [];

        parrafos.forEach(parrafo => {
            const datosProyecto = {
                pcm: extraccion.extraerPCM(parrafo),
                descripcion: extraccion.extraerDescripcion(parrafo),
                autor: extraccion.extraerAutor(parrafo),
                numero_norma: extraccion.extraerNumeroNorma(parrafo),
            };

            if (datosProyecto.pcm) {
                listaDatosProyecto.push(datosProyecto);
            }
        });

        return listaDatosProyecto;
    } catch (error) {
        console.error('Error al generar los datos del proyecto:', error);
        return null;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(process.cwd(), '/uploads');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: 'Error al subir el archivo' });
            return;
        }

        const file = files.file as formidable.File;
        const filePath = file.filepath;

        try {
            const datos = await generarDatosProyecto(filePath);
            
            if (datos) {
                const jsonFilePath = path.join(uploadDir, 'proyectoshoy.json');
                fs.writeFileSync(jsonFilePath, JSON.stringify(datos, null, 2));
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', 'attachment; filename=proyectoshoy.json');
                res.send(datos);
            } else {
                res.status(500).json({ error: 'Error al procesar el archivo' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al procesar el archivo' });
        } finally {
            fs.unlinkSync(filePath);
        }
    });
}
