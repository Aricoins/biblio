"use client"

import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Select, Checkbox, Typography, Skeleton, Spin, Flex, Progress } from 'antd';

const {Title} = Typography 
const { Option } = Select;

interface Proyecto {
  id: number;
  numero_proyecto: number;
  año_proyecto: number;
  titulo_proyecto: string;
  tipo_proyecto: string;
  autor: string;
  colaboradores: string[];
  girado_a: string;
  acta_fecha: Date;
  aprobado: boolean;
  tipo_norma: string;
  numero_norma: string;
  observaciones: string;
}

function Proyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [busquedaNumero, setBusquedaNumero] = useState('');
  const [busquedaPalabra, setBusquedaPalabra] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroAprobado, setFiltroAprobado] = useState(false);
  const [resultados, setResultados] = useState<Proyecto[]>([]);
const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchProyectos();
  }, []);

  async function fetchProyectos() {
    try {
      const response = await fetch('/api/proyectos');
      const data = await response.json();
      if (data && data.proyectos && Array.isArray(data.proyectos.rows)) {
        setProyectos(data.proyectos.rows);
        setResultados(data.proyectos.rows);
        setLoading(true)
      }
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    }
  }

  const handleBusquedaNumeroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusquedaNumero(event.target.value);
    filtrarProyectos(busquedaPalabra, event.target.value, filtroTipo, filtroAprobado);
  };

  const handleBusquedaPalabraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusquedaPalabra(event.target.value);
    filtrarProyectos(event.target.value, busquedaNumero, filtroTipo, filtroAprobado);
  };

  const handleFiltroTipoChange = (value: string) => {
    setFiltroTipo(value);
    filtrarProyectos(busquedaPalabra, busquedaNumero, value, filtroAprobado);
  };

  const handleFiltroAprobadoChange = (checked: boolean) => {
    setFiltroAprobado(checked);
    filtrarProyectos(busquedaPalabra, busquedaNumero, filtroTipo, checked);
  };
  

  const filtrarProyectos = (palabra: string, numero: string, tipo: string, aprobado: boolean) => {
    const filteredProyectos = proyectos.filter((proyecto: Proyecto) => {
      const titulo = proyecto.titulo_proyecto.toLowerCase();
      const numeroStr = proyecto.numero_proyecto.toString();
      const tipoLower = proyecto.tipo_proyecto.toLowerCase();

      // Filtrar por número exacto
      const numeroExacto = numero !== '' && numeroStr === numero;

      // Filtrar por palabra insensible a mayúsculas, acentos o errores de tipeo
      const palabraMatch = palabra !== '' && titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());

      // Filtrar por tipo de proyecto
      const tipoMatch = tipo !== '' && tipoLower === tipo.toLowerCase();

      // Filtrar por aprobado
      const aprobadoMatch = aprobado === proyecto.aprobado;

      return numeroExacto && palabraMatch && tipoMatch && aprobadoMatch;
    });
    setResultados(filteredProyectos);
  };

  const columns = [
    { title: 'Número', dataIndex: 'numero_proyecto', key: 'numero_proyecto' },
    { title: 'Año', dataIndex: 'año_proyecto', key: 'año_proyecto' },
    { title: 'Título', dataIndex: 'titulo_proyecto', key: 'titulo_proyecto' },
    { title: 'Autor', dataIndex: 'autor', key: 'autor' },
    { title: 'Colaboradores', dataIndex: 'colaboradores', key: 'colaboradores' },
    { title: 'Girado a', dataIndex: 'girado_a', key: 'girado_a' },
    { title: 'Acta fecha', dataIndex: 'acta_fecha', key: 'acta_fecha',
      render: (date: Date) => new Date(date).toLocaleDateString() },
    { title: 'Aprobado', dataIndex: 'aprobado', key: 'aprobado',
      render: (aprobado: boolean) => aprobado ? 'Sí' : 'No' },
    { title: 'Tipo norma', dataIndex: 'tipo_norma', key: 'tipo_norma' },
    { title: 'Número norma', dataIndex: 'numero_norma', key: 'numero_norma' },
    { title: 'Observaciones', dataIndex: 'observaciones', key: 'observaciones' },
  ];

  return (
    !loading ?  <Spin/> :
    <div>
      <Title style={{marginTop: "10%"}}>Buscador de Proyectos</Title>
  
      <div style={{ marginBottom: '16px' }}>
        <Input.Search
          placeholder="Buscar proyecto por número exacto..."
          value={busquedaNumero}
          onChange={handleBusquedaNumeroChange}
          style={{ width: 300, marginRight: '16px' }}
        />
        <Input.Search
          placeholder="Buscar proyecto por palabra..."
          value={busquedaPalabra}
          onChange={handleBusquedaPalabraChange}
          style={{ width: 300, marginRight: '16px' }}
        />
        <Select
          placeholder="Filtrar por tipo de proyecto"
          style={{ width: 200, marginRight: '16px' }}
          onChange={handleFiltroTipoChange}
        >
          <Option value="Ordenanza">Ordenanza</Option>
          <Option value="Declaración">Declaración</Option>
          <Option value="Comunicación">Comunicación</Option>
          <Option value="Resolución">Resolución</Option>
        </Select>
        <Checkbox onChange={(e) => handleFiltroAprobadoChange(e.target.checked)}>Proyectos aprobados</Checkbox>
      </div>

      <Table
        dataSource={resultados}
        columns={columns}
        pagination={false}
        style={{ borderCollapse: 'collapse' }}
        rowKey="id" // Agregado la propiedad rowKey con el valor "id" para corregir el warning
      />
    </div>
  );
}

export default Proyectos;
