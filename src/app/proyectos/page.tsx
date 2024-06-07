"use client";
import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Typography, Table, Spin, Pagination } from 'antd';
import Aos from 'aos';
import 'aos/dist/aos.css';
import styles from './styles.module.css';
import Link from 'next/link';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsDatabaseFillCheck } from "react-icons/bs";

const { Title } = Typography;

interface Proyecto {
    id: number;
    numero_proyecto: string;
    anio_proyecto: string;
    titulo_proyecto: string;
    tipo_proyecto: string;
    autor: string[];
    colaboradores: string | null;
    girado_a: string;
    acta_fecha: string | null;
    aprobado: boolean;
    tipo_norma: string;
    numero_norma: string;
    observaciones: string;
}

import data from './proyectos3.json';

function Proyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [busquedaNumero, setBusquedaNumero] = useState('');
    const [busquedaPalabra, setBusquedaPalabra] = useState('');
    const [busquedaAutor, setBusquedaAutor] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroAprobado, setFiltroAprobado] = useState(false);
    const [filtroRechazado, setFiltroRechazado] = useState(false);
    const [resultados, setResultados] = useState<Proyecto[]>([]);
    const [ver, setVer] = useState(false);
    const [haRealizadoBusqueda, setHaRealizadoBusqueda] = useState(false);
    const [datosCargados, setDatosCargados] = useState(false);

    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        if (ver && !datosCargados) {
            setProyectos(data);
            setResultados(data);
            setDatosCargados(true);
            Aos.init({ duration: 300 });
        }
    }, [ver, datosCargados]);

    // Función para manejar los cambios de página
    const handlePageChange = (page: number, size: number) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const handleBusquedaNumeroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusquedaNumero(event.target.value);
        filtrarProyectos(event.target.value, busquedaPalabra, busquedaAutor, filtroTipo, filtroAprobado, filtroRechazado);
        setHaRealizadoBusqueda(true);
    };

    const handleBusquedaPalabraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusquedaPalabra(event.target.value);
        filtrarProyectos(busquedaNumero, event.target.value, busquedaAutor, filtroTipo, filtroAprobado, filtroRechazado);
        setHaRealizadoBusqueda(true);
    };

    const handleBusquedaAutorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusquedaAutor(event.target.value);
        filtrarProyectos(busquedaNumero, busquedaPalabra, event.target.value, filtroTipo, filtroAprobado, filtroRechazado);
        setHaRealizadoBusqueda(true);
    };

    const handleFiltroTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setFiltroTipo(value);
        filtrarProyectos(busquedaNumero, busquedaPalabra, busquedaAutor, value, filtroAprobado, filtroRechazado);
        setHaRealizadoBusqueda(true);
    };

    const handleFiltroAprobadoChange = (checked: boolean) => {
        setFiltroAprobado(checked);
        filtrarProyectos(busquedaNumero, busquedaPalabra, busquedaAutor, filtroTipo, checked, filtroRechazado);
        setHaRealizadoBusqueda(true);
    };

    const handleFiltroRechazadoChange = (checked: boolean) => {
        setFiltroRechazado(checked);
        filtrarProyectos(busquedaNumero, busquedaPalabra, busquedaAutor, filtroTipo, filtroAprobado, checked);
        setHaRealizadoBusqueda(true);
    };

    const filtrarProyectos = (numero: string, palabra: string, autor: string, tipo: string, aprobado: boolean, rechazado: boolean) => {
        let filteredProyectos = proyectos.filter((proyecto) => {
            const titulo = proyecto.titulo_proyecto.toLowerCase();
            const numeroStr = proyecto.numero_proyecto.toString();
            const tipoLower = proyecto.tipo_proyecto.toLowerCase();
            const autorStr = proyecto.autor.join(' ').toLowerCase();

            const numeroExacto = numero !== '' && numeroStr === numero;
            const palabraMatch = palabra !== '' && titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
            const autorMatch = autor !== '' && autorStr.includes(autor.toLowerCase());
            const tipoMatch = tipo !== '' && tipoLower === tipo.toLowerCase();

            let aprobadoMatch = true;
            if (aprobado) {
                aprobadoMatch = proyecto.aprobado === true;
            } else if (rechazado) {
                aprobadoMatch = proyecto.aprobado === false;
            }

            return (!numero || numeroExacto) && (!palabra || palabraMatch) && (!autor || autorMatch) && (!tipo || tipoMatch) && aprobadoMatch;
        });

        filteredProyectos = filteredProyectos.sort((a, b) => {
            const yearA = parseInt(a.anio_proyecto, 10);
            const yearB = parseInt(b.anio_proyecto, 10);
            return yearB - yearA;
        });

        setResultados(filteredProyectos);
        setCurrentPage(1);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        window.scrollTo({
            top: 2000,
            behavior: 'smooth',
        });
    };

    const downloadFile = async (filePath: string) => {
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                window.open(filePath, '_blank');
            } else if (response.status === 404) {
                alert('El archivo no se encuentra disponible');
            } else {
                alert('Error al descargar el archivo.');
            }
        } catch (error) {
            console.error('Error en la descarga:', error);
            alert('Error al descargar el archivo.');
        }
    };

    const columns = [
        { title: 'N°', dataIndex: 'numero_proyecto', key: 'numero_proyecto', className: styles.numero },
        { title: 'Año', dataIndex: 'anio_proyecto', key: 'anio_proyecto', className: styles.año },
        { title: 'Descripción', dataIndex: 'titulo_proyecto', key: 'titulo_proyecto', className: styles.descripcion },
        { title: 'Autores', dataIndex: 'autor', key: 'autor', className: styles.autores },
        {
            title: 'Norma',
            dataIndex: 'numero_norma',
            key: 'numero_norma',
            render: (numeroNorma: string, record: Proyecto) => {
                if (numeroNorma) {
                    const partesNorma = numeroNorma.split('-');
                    let añoNorma = null;

                    if (partesNorma.length > 1) {
                        const digitos = partesNorma[1];
                        añoNorma = `20${digitos}`;
                    }
                    let tipoNorma = record.tipo_norma.toLowerCase();

                    if (tipoNorma === "comunicacion") {
                        tipoNorma = "comunicaciones";
                    } else if (tipoNorma === "resolución") {
                        tipoNorma = "resoluciones";
                    } else if (tipoNorma === "declaración") {
                        tipoNorma = "declaraciones";
                    } else if (tipoNorma === "ordenanza") {
                        tipoNorma = "ordenanzas";
                    }
                    
                    const filePath = `normas/${tipoNorma}/${añoNorma}/${numeroNorma}.doc`;

                    return (
                        <button onClick={() => downloadFile(filePath)}>
                            {numeroNorma}
                        </button>
                    );
                } else {
                    return '';
                }
            },
            className: styles.norma
        },
        {
            title: 'Observaciones',
            dataIndex: 'observaciones',
            key: 'observaciones',
            render: (observaciones: string) => {
                if (observaciones === 'sin sanción') {
                    return <button onClick={handleClick} >Buscar entre los expedientes no sancionados</button>;
                }
                if (observaciones === "https://drive.google.com/file/d/1-Hs21WcLSI99zjI1lQdNn2uEmSKWMRUS/view?usp=drive_link")
                    return <Link href="https://drive.google.com/file/d/1-Hs21WcLSI99zjI1lQdNn2uEmSKWMRUS/view?usp=drive_link">Ver dictamen</Link>;
                else {
                    return observaciones;
                }
            },
            className: styles.observaciones
        },
    ];

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const datosPaginaActual = resultados.slice(startIndex, endIndex);

    return (
        <>
            <div onClick={() => setVer(!ver)}>
                <h2 className={styles.hdos} >
                    {ver ? 
                    <MdExpandLess style= {{ fontSize: "x-large"}} /> : <MdExpandMore style={{ fontSize: "x-large"}} />}
                    Buscador general de expedientes 🔍   
                    {ver ? 
                    <MdExpandLess style={{ fontSize: "x-large"}} /> : <MdExpandMore style={{ fontSize: "x-large"}} />}
                </h2>
            </div>

            {ver && (
                <div style={{ margin: "auto", width: "100%", marginBottom: "5%" }}>
                    <p className={styles.spinText}> Busque entre los proyectos sancionados y no sancionados </p>
                    <div className={styles.inputs}>
                        <Input.Search
                            placeholder="Por n° de proyecto..."
                            value={busquedaNumero}
                            onChange={handleBusquedaNumeroChange}
                            style={{ width: 200, marginRight: '16px', marginBottom: '8px' }}
                        />
                        <Input.Search
                            placeholder="Por palabra..."
                            value={busquedaPalabra}
                            onChange={handleBusquedaPalabraChange}
                            style={{ width: 200, marginRight: '16px', marginBottom: '8px' }}
                        />
                        <Input.Search
                            placeholder="Por autor..."
                            value={busquedaAutor}
                            onChange={handleBusquedaAutorChange}
                            style={{ width: 200, marginRight: '16px', marginBottom: '8px' }}
                        />
                        <select onChange={handleFiltroTipoChange} className={styles.sele}>
                            <option value="">Por tipo</option>
                            <option value="Ordenanza">Ordenanzas</option>
                            <option value="Declaración">Declaraciones</option>
                            <option value="Comunicacion">Comunicaciones</option>
                            <option value="Resolución">Resoluciones</option>
                        </select>
                        <div className={styles.checkbox}>
                            <Checkbox
                                onChange={(event) => handleFiltroAprobadoChange(event.target.checked)}
                            >
                                Sólo aprobados
                            </Checkbox>
                           
                        </div>
                    </div>

                    {haRealizadoBusqueda ? (
                        <div className={styles.table}>
                            <Table
                                dataSource={datosPaginaActual}
                                columns={columns}
                                pagination={false}
                                rowKey="id"
                           
                            />
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={resultados.length}
                                onChange={handlePageChange}
                                style={{ marginTop: 16 }}
                            />
                        </div>
                    ) : (
                        <div className={styles.spinContainer}>
                          
                            <BsDatabaseFillCheck />
 | Conectado a la Base de Datos.
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Proyectos;
