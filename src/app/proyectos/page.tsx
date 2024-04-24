"use client";
import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Select, Typography, Table, Spin } from 'antd';
import Aos from 'aos';
import 'aos/dist/aos.css';
import styles from './styles.module.css';
import Link from 'next/link';

const { Option } = Select;
const { Title } = Typography;

interface Proyecto {
    id: number;
    numero_proyecto: string;
    anio_proyecto: string;
    titulo_proyecto: string;
    tipo_proyecto: string;
    autor: string | null;
    colaboradores: string | null;
    girado_a: string;
    acta_fecha: string | null;
    aprobado: boolean;
    tipo_norma: string;
    numero_norma: string;
    observaciones: string;
}

// Importar los datos del archivo JSON
import data from './proyectos.json';

function Proyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [busquedaNumero, setBusquedaNumero] = useState('');
    const [busquedaPalabra, setBusquedaPalabra] = useState('');
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
        filtrarProyectos(event.target.value, busquedaPalabra, filtroTipo, filtroAprobado);
        setHaRealizadoBusqueda(true);
    };

    const handleBusquedaPalabraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusquedaPalabra(event.target.value);
        filtrarProyectos(busquedaNumero, event.target.value, filtroTipo, filtroAprobado);
        setHaRealizadoBusqueda(true);
    };

    const handleFiltroTipoChange = (value: string) => {
        setFiltroTipo(value);
        filtrarProyectos(busquedaNumero, busquedaPalabra, value, filtroAprobado);
        setHaRealizadoBusqueda(true);
    };

    const handleFiltroAprobadoChange = (checked: boolean) => {
        setFiltroAprobado(checked);
        filtrarProyectos(busquedaNumero, busquedaPalabra, filtroTipo, checked);
        setHaRealizadoBusqueda(true);
    };

    const filtrarProyectos = (numero: string, palabra: string, tipo: string, aprobado: boolean) => {
      let filteredProyectos = proyectos.filter((proyecto) => {
          const titulo = proyecto.titulo_proyecto.toLowerCase();
          const numeroStr = proyecto.numero_proyecto.toString();
          const tipoLower = proyecto.tipo_proyecto.toLowerCase();
  
          const numeroExacto = numero !== '' && numeroStr === numero;
          const palabraMatch = palabra !== '' && titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
          const tipoMatch = tipo !== '' && tipoLower === tipo.toLowerCase();
          const aprobadoMatch = aprobado === proyecto.aprobado;
  
          return (!numero || numeroExacto) && (!palabra || palabraMatch) && (!tipo || tipoMatch) && (!aprobado || aprobadoMatch);
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
        { title: 'Título', dataIndex: 'titulo_proyecto', key: 'titulo_proyecto' },
        { title: 'Autor', dataIndex: 'autor', key: 'autor' },
        { title: 'Aprobado', dataIndex: 'aprobado', key: 'aprobado',
            render: (aprobado: boolean) => aprobado ? 'Sí' : 'No' },
        { title: 'Tipo norma', dataIndex: 'tipo_norma', key: 'tipo_norma' },
        {
            title: 'Número norma',
            dataIndex: 'numero_norma',
            key: 'numero_norma',
            render: (numeroNorma: string, record: Proyecto) => {
              if (numeroNorma) {
                // Extraer los dígitos entre guiones de numeroNorma
                const partesNorma = numeroNorma.split('-');
                let añoNorma = null;
            
                if (partesNorma.length > 1) {
                    // Los dos dígitos entre guiones
                    const digitos = partesNorma[1];
                    // Convertir los dos dígitos a un número y agregar el prefijo "20"
                    añoNorma = `20${digitos}`;
                }
            
                // Si añoNorma es nulo o la longitud no es válida, regresar "N/A"
                if (!añoNorma || añoNorma.length !== 4) {
                    return 'N/A';
                }
                if (record.tipo_norma === 'ordenanza') {
                  record.tipo_norma = "ordenanzas"}
                if (record.tipo_norma === 'declaración') {
                  record.tipo_norma = "declaraciones"}
                if (record.tipo_norma === 'comunicación') {
                  record.tipo_norma = "comunicaciones"}
                if (record.tipo_norma === 'resolución') {
                  record.tipo_norma = "resoluciones"}
                // Convertir el tipo de norma a minúsculas
            const tipoNorma = record.tipo_norma.toLowerCase();
                // Construir la URL basada en la ubicación de los archivos estáticos en la carpeta 'public'
                const filePath = `normas/${tipoNorma}/${añoNorma}/${numeroNorma}.doc`;
            
                // Crear el enlace al archivo
                return (
                    <Link href={filePath} target="_blank" rel="noopener noreferrer">
                        {numeroNorma}
                    </Link>
                );
            } else {
                return ''; // Retorna una cadena vacía si no hay número de norma
            }
          }
        },
        { title: 'Observaciones', dataIndex: 'observaciones', key: 'observaciones' },
    ];

    return (
        (!loading) ?  <Spin  style={{margin: "50%", marginTop: "20%"}}/> :
        <div style={{ width: '90%', margin: 'auto' }}>
        <>
            <div onClick={() => setVer(!ver)}>
                <h2 
                    data-aos="fade-left" 
                    className={styles.hdos}
                >
                    Buscar normativa | Proyectos 2003-2024
                </h2>
            </div>
            
            {(ver) && (
            <div style={{ margin: "auto" , width: "100%" }}>
              
                 <div style={{ margin: 'auto', backgroundColor: "gray", padding: "1%", borderRadius: "5px" }}>
                    <Input.Search
                        placeholder="Por número. Por ejemplo: 003 "
                        value={busquedaNumero}
                        onChange={handleBusquedaNumeroChange}
                        style={{ width: 200, marginRight: '16px', marginBottom: '8px'}}
                    />
                    <Input.Search
                        placeholder="Por palabra..."
                        value={busquedaPalabra}
                        onChange={handleBusquedaPalabraChange}
                        style={{ width: 200, marginRight: '16px', marginBottom: '8px' }}
                    />
                    <Select
                        placeholder="Por tipo de proyecto"
                        style={{ width: 200, marginRight: '16px', marginBottom: '8px' }}
                        onChange={handleFiltroTipoChange}
                    >
                        <Option value="Ordenanza">Ordenanza</Option>
                        <Option value="Declaración">Declaración</Option>
                        <Option value="Comunicación">Comunicación</Option>
                        <Option value="Resolución">Resolución</Option>
                    </Select>
                    <Checkbox onChange={(e) => handleFiltroAprobadoChange(e.target.checked)}>Proyectos aprobados</Checkbox>
                 
                </div>
               

                {haRealizadoBusqueda && (
                        <Table
                            dataSource={resultados}
                            columns={columns}
                            pagination={false}
                            style={{ width: "100%", margin: "auto", marginBottom: "10%"  }}
                            rowKey="id"
                        />
                    )}
                </div>
       
            )}
            
        </>
        </div>)
}

export default Proyectos;
