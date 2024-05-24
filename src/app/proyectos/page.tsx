"use client";
import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Typography, Table, Spin, Pagination } from 'antd';
import Aos from 'aos';
import 'aos/dist/aos.css';
import styles from './styles.module.css';
import Link from 'next/link';

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
    const [resultados, setResultados] = useState<Proyecto[]>([]);
    const [ver, setVer] = useState(true);
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
        filtrarProyectos(event.target.value, busquedaPalabra, busquedaAutor, filtroTipo, filtroAprobado);
        setHaRealizadoBusqueda(true);
    };

    const handleBusquedaPalabraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusquedaPalabra(event.target.value);
        filtrarProyectos(busquedaNumero, event.target.value, busquedaAutor, filtroTipo, filtroAprobado);
        setHaRealizadoBusqueda(true);
    };

    const handleBusquedaAutorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusquedaAutor(event.target.value);
        filtrarProyectos(busquedaNumero, busquedaPalabra, event.target.value, filtroTipo, filtroAprobado);
        setHaRealizadoBusqueda(true);
    };

    const handleFiltroTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setFiltroTipo(value);
        filtrarProyectos(busquedaNumero, busquedaPalabra, busquedaAutor, value, filtroAprobado);
        setHaRealizadoBusqueda(true);
    };

    const handleFiltroAprobadoChange = (checked: boolean) => {
        setFiltroAprobado(checked);
        filtrarProyectos(busquedaNumero, busquedaPalabra, busquedaAutor, filtroTipo, checked);
        setHaRealizadoBusqueda(true);
    };

    const filtrarProyectos = (numero: string, palabra: string, autor: string, tipo: string, aprobado: boolean) => {
        let filteredProyectos = proyectos.filter((proyecto) => {
            const titulo = proyecto.titulo_proyecto.toLowerCase();
            const numeroStr = proyecto.numero_proyecto.toString();
            const tipoLower = proyecto.tipo_proyecto.toLowerCase();
            const autorStr = proyecto.autor.join(' ').toLowerCase(); // Convertir autores a una cadena

            const numeroExacto = numero !== '' && numeroStr === numero;
            const palabraMatch = palabra !== '' && titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
            const autorMatch = autor !== '' && autorStr.includes(autor.toLowerCase());
            const tipoMatch = tipo !== '' && tipoLower === tipo.toLowerCase();
            const aprobadoMatch = aprobado === proyecto.aprobado;

            return (!numero || numeroExacto) && (!palabra || palabraMatch) && (!autor || autorMatch) && (!tipo || tipoMatch) && (!aprobado || aprobadoMatch);
        });

        // Ordenar por año del proyecto (más nuevo a más viejo)
        filteredProyectos = filteredProyectos.sort((a, b) => {
            const yearA = parseInt(a.anio_proyecto, 10);
            const yearB = parseInt(b.anio_proyecto, 10);
            return yearB - yearA;
        });

        // Establecer los resultados para mostrar con paginación
        setResultados(filteredProyectos);
        setCurrentPage(1); // Reiniciar a la página 1 después de filtrar
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        window.scrollTo({
            top: 1000,
            behavior: 'smooth',
        });
    };
    const downloadFile = async (filePath: string) => {
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                // Si la respuesta es exitosa, abre la URL del archivo en una nueva ventana o pestaña
                window.open(filePath, '_blank');
            } else if (response.status === 404) {
                // Si el error es 404, muestra un alert
                alert('El archivo no se encuentra disponible');
            } else {
                // Maneja otros tipos de errores si es necesario
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
                    return <Link href='/archivo' className={styles.numero}>Buscar entre los expedientes no sancionados</Link>;
                } else {
                    return observaciones;
                }
            },
            className: styles.observaciones
        }
    ];

    // Calcular datos para la paginación
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const datosPaginaActual = resultados.slice(startIndex, endIndex);

    return (
      
            <>
                <div onClick={() => setVer(!ver)}>
                    <h2 className={styles.hdos}>
                        Buscar 🔍 
                    </h2>
                </div>

                {ver && (
                    <div style={{ margin: "auto", width: "100%", marginBottom: "20%" }}>
                         
                         <p className={styles.spinText}>Busque entre los proyectos que tomaron estado parlamentario desde 2003.</p>
                        <div className={styles.inputs}>
                            <Input.Search
                                placeholder="Por número..."
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

                        {/* Resultados */}
                        {haRealizadoBusqueda ? (
                            <div className={styles.table }>
                                <Table
                                    dataSource={datosPaginaActual}
                                    columns={columns}
                                    pagination={false}
                                    rowKey="id"
                                    className={styles.table}
                                />
                                {/* Paginación */}
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={resultados.length}
                                    onChange={handlePageChange}
                                    style={{ marginTop: 16 }}
                                />
                            </div>
                        ) : (
                            // Mostrar Spinner si los datos no se han cargado
                            <div className={styles.spinContainer}>
                            
                             </div>
                        )}
                    </div>
                )}
            </>

    );
}

export default Proyectos;
