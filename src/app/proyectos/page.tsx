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

function Proyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [busquedaUnificada, setBusquedaUnificada] = useState('');
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
            fetchProyectos();
        }
    }, [ver, datosCargados]);

    const fetchProyectos = async () => {
        try {
            const response = await fetch('/api/proyectos');
            const data = await response.json();
            setProyectos(data.proyectos);
            setResultados(data.proyectos);
            setDatosCargados(true);
            Aos.init({ duration: 300 });
        } catch (error) {
            console.error('Error al cargar los proyectos:', error);
        }
    };

    // Función para manejar los cambios de página
    const handlePageChange = (page: number, size: number) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const handleBusquedaUnificadaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusquedaUnificada(event.target.value);
        filtrarProyectos(event.target.value, busquedaPalabra, busquedaAutor, filtroTipo, filtroAprobado, filtroRechazado);
        setHaRealizadoBusqueda(true);
    };

    const handleBusquedaPalabraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusquedaPalabra(event.target.value);
        filtrarProyectos(busquedaUnificada, event.target.value, busquedaAutor, filtroTipo, filtroAprobado, filtroRechazado);
        setHaRealizadoBusqueda(true);
    };

    const handleBusquedaAutorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusquedaAutor(event.target.value);
        filtrarProyectos(busquedaUnificada, busquedaPalabra, event.target.value, filtroTipo, filtroAprobado, filtroRechazado);
        setHaRealizadoBusqueda(true);
    };

    const handleFiltroTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setFiltroTipo(value);
        filtrarProyectos(busquedaUnificada, busquedaPalabra, busquedaAutor, value, filtroAprobado, filtroRechazado);
        setHaRealizadoBusqueda(true);
    };

    const handleFiltroAprobadoChange = (checked: boolean) => {
        setFiltroAprobado(checked);
        filtrarProyectos(busquedaUnificada, busquedaPalabra, busquedaAutor, filtroTipo, checked, filtroRechazado);
        setHaRealizadoBusqueda(true);
    };

    const handleFiltroRechazadoChange = (checked: boolean) => {
        setFiltroRechazado(checked);
        filtrarProyectos(busquedaUnificada, busquedaPalabra, busquedaAutor, filtroTipo, filtroAprobado, checked);
        setHaRealizadoBusqueda(true);
    };

    const filtrarProyectos = (numero: string, palabra: string, autor: string, tipo: string, aprobado: boolean, rechazado: boolean) => {
        let filteredProyectos = proyectos.filter((proyecto) => {
            const titulo = proyecto.titulo_proyecto.toLowerCase();
            const numeroProyecto = proyecto.numero_proyecto.replace(/^0+/, ''); // Eliminar ceros a la izquierda
            const numeroNorma = proyecto.numero_norma?.toLowerCase() || ''; // Manejar cuando no hay norma
            const tipoLower = proyecto.tipo_proyecto.toLowerCase();
            const autorStr = proyecto.autor.join(' ').toLowerCase();

            const numeroMatch =
                numero !== '' &&
                (numeroProyecto === numero.replace(/^0+/, '') || numeroNorma.includes(numero.toLowerCase())); // Coincidencia con ambos campos
            const palabraMatch = palabra !== '' && titulo.includes(palabra.toLowerCase());
            const autorMatch = autor !== '' && autorStr.includes(autor.toLowerCase());
            const tipoMatch = tipo !== '' && tipoLower === tipo.toLowerCase();

            let aprobadoMatch = true;
            if (aprobado) {
                aprobadoMatch = proyecto.aprobado === true;
            } else if (rechazado) {
                aprobadoMatch = proyecto.aprobado === false;
            }

            return (!numero || numeroMatch) && (!palabra || palabraMatch) && (!autor || autorMatch) && (!tipo || tipoMatch) && aprobadoMatch;
        });

        filteredProyectos = filteredProyectos.sort((a, b) => {
            const yearA = parseInt(a.anio_proyecto, 10);
            const yearB = parseInt(b.anio_proyecto, 10);
            return yearB - yearA;
        });

        setResultados(filteredProyectos);
        setCurrentPage(1);
    };

    const columns = [
        { title: 'N°', dataIndex: 'numero_proyecto', key: 'numero_proyecto', className: styles.numero },
        { title: 'Año', dataIndex: 'anio_proyecto', key: 'anio_proyecto', className: styles.año },
        { title: 'Descripción', dataIndex: 'titulo_proyecto', key: 'titulo_proyecto', className: styles.descripcion },
        { title: 'Autores', dataIndex: 'autor', key: 'autor', className: styles.autores },
        { title: 'Norma', dataIndex: 'numero_norma', key: 'numero_norma', className: styles.norma },
        { title: 'Observaciones', dataIndex: 'observaciones', key: 'observaciones', className: styles.observaciones }
    ];

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const datosPaginaActual = resultados.slice(startIndex, endIndex);

    return (
        <>
            <div onClick={() => setVer(!ver)}>
                <h2 className={styles.hdos}>
                    {ver ? <MdExpandLess style={{ fontSize: "x-large" }} /> : <MdExpandMore style={{ fontSize: "x-large" }} />}
                    Buscador general de expedientes | 2003-2024
                    {ver ? <MdExpandLess style={{ fontSize: "x-large" }} /> : <MdExpandMore style={{ fontSize: "x-large" }} />}
                </h2>
            </div>

            {ver && (
                <div style={{ margin: "auto", width: "100%", marginBottom: "5%" }}>
                    <p className={styles.spinText}> Busque entre los expedientes sancionados y no sancionados </p>
                    <div className={styles.inputs}>
                        <Input.Search
                            placeholder="Por n° proyecto o norma"
                            value={busquedaUnificada}
                            onChange={handleBusquedaUnificadaChange}
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
                        <select
                            value={filtroTipo}
                            onChange={handleFiltroTipoChange}
                            style={{ width: 200, marginRight: '16px', marginBottom: '8px' }}
                        >
                            <option value="">Todos los tipos</option>
                            <option value="comunicacion">Comunicación</option>
                            <option value="resolución">Resolución</option>
                            <option value="declaración">Declaración</option>
                            <option value="ordenanza">Ordenanza</option>
                        </select>
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
                            <BsDatabaseFillCheck /> | Conectado a la Base de Datos.
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Proyectos;
