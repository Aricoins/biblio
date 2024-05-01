"use client";
import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Typography, Table, Spin } from 'antd';
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

// Importar los datos del archivo JSON
import data from './proyectos3.json';

function Proyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [busquedaNumero, setBusquedaNumero] = useState('');
    const [busquedaPalabra, setBusquedaPalabra] = useState('');
    const [busquedaAutor, setBusquedaAutor] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroAprobado, setFiltroAprobado] = useState(false);
    const [resultados, setResultados] = useState<Proyecto[]>([]);
    const [ver, setVer] = useState(false);
    const [haRealizadoBusqueda, setHaRealizadoBusqueda] = useState(false);
    const [datosCargados, setDatosCargados] = useState(false);
    
    useEffect(() => {
        if (ver && !datosCargados) {
            // Cargar los datos del JSON y establecer el estado de los datos cargados
            setProyectos(data);
            setResultados(data);
            setDatosCargados(true);
            Aos.init({ duration: 3000 });
        }
    }, [ver, datosCargados]);

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

            return   (!numero || numeroExacto) && (!palabra || palabraMatch) && (!autor || autorMatch) && (!tipo || tipoMatch) && (!aprobado || aprobadoMatch);
        });

        // Ordenar por año del proyecto (más nuevo a más viejo)
        filteredProyectos = filteredProyectos.sort((a, b) => {
            const yearA = parseInt(a.anio_proyecto, 10);
            const yearB = parseInt(b.anio_proyecto, 10);
            return yearB - yearA; // Orden descendente (más nuevo a más viejo)
        });

        setResultados(filteredProyectos.slice(0, 5));
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        window.scrollTo({
            top: 50,
            behavior: 'smooth',
        });
    };

    const columns = [
        { title: 'N°', dataIndex: 'numero_proyecto', key: 'numero_proyecto', className: styles.numero},
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
                    if (tipoNorma === 'resolución') {tipoNorma = 'resoluciones';}
                    if (tipoNorma === 'declaración') {tipoNorma = 'declaraciones';}
                    if (tipoNorma === 'comunicacion') {tipoNorma = 'comunicaciones';}
                    if (tipoNorma === 'ordenanza') {tipoNorma = 'ordenanzas';}

                    const filePath = `normas/${tipoNorma}/${añoNorma}/${numeroNorma}.doc`;

                    return (
                        <Link href={filePath} target="_blank" rel="noopener noreferrer">
                            {numeroNorma}
                        </Link>
                    );
                } else {
                    return '';
                }
            }, className: styles.norma
        },
        {
            title: 'Observaciones',
            dataIndex: 'observaciones',
            key: 'observaciones',
            render: (observaciones: string, record: Proyecto) => {
                // Declarar añoNorma aquí
                let añoNorma = null;
                
                // Obtener el número de la norma
                const numeroNorma = record.numero_norma;
        
                // Comprobar si hay un número de norma
                if (numeroNorma) {
                    const partesNorma = numeroNorma.split('-');
                    
                    // Comprobar si hay una parte con el año
                    if (partesNorma.length > 1) {
                        const digitos = partesNorma[1];
                        añoNorma = `20${digitos}`;
                    }
                }
                if (observaciones === "sin sanción" ) {
                    // Mostrar "en tratamiento" si se cumplen ambas condiciones
                    return <button onClick={handleClick}>Buscar entre los expedientes no sancionados</button>;
                } else {
                    // Si no se cumplen las condiciones, mostrar observaciones normales
                    return observaciones;
                }
            },
            className: styles.observaciones
        }
        
   ];

    return (
        <div className={styles.container} data-aos="fade-up">
            <>
                <div onClick={() => setVer(!ver)}>
                    <h2 className={styles.hdos}>
                        Buscador General 🔍 | 2003-2024
                    </h2>
                </div>

                {(ver) && (
                    <div style={{ margin: "auto", width: "100%" }}>
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
                               
                                    <Table
                                        dataSource={resultados}
                                        columns={columns}
                                        pagination={true}
                                        rowKey="id"
                                        className={styles.table}
                                    
                                    />
                                )
                            
                                : (
                                    // Mostrar Spinner si los datos no se han cargado
                                    <div className={styles.spinContainer} >
                                    <Spin  size="large" className="h-16 w-16 text-gray-900/50" > 
                                    <p className={styles.spinText} > ...esperando su búsqueda </p>
                                    </Spin>
                                    </div>
                                )
                            }

                        
                    </div>

                )}
            </>
        </div>
    );
}

export default Proyectos;
