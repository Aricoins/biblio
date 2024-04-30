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
    const [loading, setLoading] = useState(true);
    const [ver, setVer] = useState(false);
    const [haRealizadoBusqueda, setHaRealizadoBusqueda] = useState(false);

    useEffect(() => {
        // Inicializar los datos del estado con los datos del JSON
        setProyectos(data);
        setResultados(data);
        setLoading(true);
        Aos.init({ duration: 3000 });
    }, []);

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

        setResultados(filteredProyectos.slice(0, 10));
    };

    const columns = [
        { title: 'Número', dataIndex: 'numero_proyecto', key: 'numero_proyecto' },
        { title: 'Año', dataIndex: 'anio_proyecto', key: 'anio_proyecto' },
        { title: 'Descripción sintética', dataIndex: 'titulo_proyecto', key: 'titulo_proyecto' },
        { title: 'Autores', dataIndex: 'autor', key: 'autor' },
        {
            title: 'Número norma',
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

                    if (record.tipo_norma === 'ordenanza') {
                        record.tipo_norma = "ordenanzas";
                    }
                    if (record.tipo_norma === 'declaración') {
                        record.tipo_norma = "declaraciones";
                    }
                    if (record.tipo_norma === 'comunicación') {
                        record.tipo_norma = "comunicaciones";
                    }
                    if (record.tipo_norma === 'resolución') {
                        record.tipo_norma = "resoluciones";
                    }

                    const tipoNorma = record.tipo_norma.toLowerCase();
                    const filePath = `normas/${tipoNorma}/${añoNorma}/${numeroNorma}.doc`;

                    return (
                        <Link href={filePath} target="_blank" rel="noopener noreferrer">
                            {numeroNorma}
                        </Link>
                    );
                } else {
                    return '';
                }
            }
        },
        { title: 'Observaciones', dataIndex: 'observaciones', key: 'observaciones', render: (observaciones: string) => observaciones },
    ];

    return (
        (!loading) ? <Spin style={{ margin: "auto", marginTop: "40%" }} /> :
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
                                    placeholder="Buscar por autor..."
                                    value={busquedaAutor}
                                    onChange={handleBusquedaAutorChange}
                                    style={{ width: 200, marginRight: '16px', marginBottom: '8px' }}
                                />
                                <select onChange={handleFiltroTipoChange} className={styles.sele}>
                                    <option value="">Filtrar por tipo</option>
                                    <option value="Ordenanza">Ordenanzas</option>
                                    <option value="Declaración">Declaraciones</option>
                                    <option value="Comunicación">Comunicaciones</option>
                                    <option value="Resolución">Resoluciones</option>
                                </select>
                                <div className={styles.checkbox}>
                                    <Checkbox
                                        onChange={(event) => handleFiltroAprobadoChange(event.target.checked)}
                                    >
                                        Aprobado
                                    </Checkbox>
                                </div>
                            </div>
                            {(resultados.length === 0 && haRealizadoBusqueda) ? (
                                <h4 className={styles.hcuatro}>
                                    Sin resultados.
                                </h4>
                            ) : (
                                <Table
                                    dataSource={resultados}
                                    columns={columns}
                                    pagination={false}
                                    style={{ width: '100%', margin: 'auto', marginBottom: '10%' }}
                                    rowKey="id"
                                />
                            )}
                        </div>
                    )}
                </>
            </div>
    );
}

export default Proyectos;
