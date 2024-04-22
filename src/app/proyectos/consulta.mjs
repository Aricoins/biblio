import generarConsultaInsert from './tabla.mjs';

function generarConsultasDeParrafos(parrafos) {
    const consultas = [];
    for (const parrafo of parrafos) {
        const consulta = generarConsultaInsert(parrafo);
        consultas.push(consulta);
    }
    return consultas;
}

const parrafosPrueba = [
    `001.- Proyecto de Ordenanza 001/03: "Aprobar contrato de comodato suscripto con fecha 24/11/2003 entre la Coordinación de Organismos en Liquidación y la Municipalidad de San Carlos de Bariloche". Autor: Intendente Municipal, Sr. Alberto Icare. Colaborador: Secretario de Gobierno, Sr. Adolfo Foures. A Asesoría Letrada y a las Comisiones de Economía y de Gobierno y Legales. APROBADO 12/02/04 – Acta 822/04 (O-04-1358)`,
    
'002.- Proyecto de Ordenanza 002/03: "Modificar artículo 50° de la Ordenanza 679-CM-96 y sus modificatorias”. Autor: Intendente Municipal, Sr. Alberto Icare. Colaborador: Secretario de Gobierno, Sr. Adolfo Foures. A Asesoría Letrada y a las Comisiones de Economía y de Gobierno y Legales. APROBADO 13/05/04 – Acta 827/04 (O-04-1391)',

'003.- Proyecto de Ordenanza 003/03: "Prorrogar la Declaración de Emergencia y Ordenamiento Económico, Financiero, Administrativo de la Municipalidad de San Carlos de Bariloche”. Autor: Intendente Municipal, Sr. Alberto Icare. Colaborador: Secretario de Gobierno, Sr. Adolfo Foures. A Asesoría Letrada y a las Comisiones de Economía y de Gobierno y Legales. APROBADO 22/12/03 – Acta 820/03 (O-03-1351)',

'004.- Proyecto de Ordenanza 004/03: "Reconocimiento de jurisdicción y otorgamiento de personería jurídica municipal de la Junta Vecinal Barrio Vivero Municipal”. Autor: Intendente Municipal, Sr. Alberto Icare. Colaborador: Secretario de Gobierno, Sr. Adolfo Foures. A Asesoría Letrada y a la Comisión de Gobierno y Legales. APROBADO 22/12/03 – Acta 820/03 (O-03-1352).',

'005.- Proyecto de Ordenanza 005/03: “Registro de deudores alimentarios”. Autor: Intendente Municipal, Sr. Alberto Icare. A la Comisión de Gobierno y Legales. RETIRADO 18/11/04 – Acta 837/04.	LIBRO 35',

'006.- Proyecto de Ordenanza 006/03: “Designación nombres calles Junta Vecinal Barrio 2 de Abril”. Autor: Intendente Municipal, Sr. Alberto Icare. A la Comisión de Gobierno y Legales. APROBADO 26/02/04 – Acta 823/04 (O-04-1367).',

'007.- Proyecto de Ordenanza 007/03: "Modificación Ordenanza Tarifaria 678-CM-96 y Fiscal 679-CM-96". Autor: Intendente Municipal, Sr. Alberto Icare. A las Comisiones de Economía y de Gobierno y Legales. RETIRADO 21/10/04 – Acta 836/04.	LIBRO 35',

'008.- Proyecto de Ordenanza 008/03: “Ampliación denominación y asignación nombre calle Junta Vecinal Barrio Parque Playa Serena”. Autor: Intendente Municipal, Sr. Alberto Icare. A las Comisiones de Obras y Planeamiento y de Gobierno y Legales. APROBADO 12/02/04 – Acta 822/04 (O-04-1359).',

'009.- Proyecto de Ordenanza 009/03: "Modificación Ordenanza 678-CM-96 y Fiscal 679-CM-96". Autor: Intendente Municipal, Sr. Alberto Icare. A la Comisión de Economía. APROBADO 13/05/04 – Acta 827/04 (O-04-1390)',

'010.- Proyecto de Ordenanza 010/03: "Modificación Ordenanza Tarifaria N° 678-CM-96 y Fiscal N° 679-CM-96". Autor: Intendente Municipal, Sr. Alberto Icare. A la Comisión de Economía. RETIRADO 21/10/04 – Acta 836/04.	LIBRO 35'

];

const consultas = generarConsultasDeParrafos(parrafosPrueba);
console.log(consultas);
