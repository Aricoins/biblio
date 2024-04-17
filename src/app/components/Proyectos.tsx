import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Select, Typography, Table, Spin } from 'antd';
import Aos from 'aos';
import 'aos/dist/aos.css';
import styles from './style.module.css';

const { Option } = Select;
const { Title } = Typography;

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
  const [loading, setLoading] = useState(false);
  const [ver, setVer] = useState(false);
  
  useEffect(() => {
    fetchProyectos();
    Aos.init({ duration: 3000 });
  }, []);

  async function fetchProyectos() {
    try {
      const response = await fetch('/api/proyectos');
      const data = await response.json();
      if (data && data.proyectos && Array.isArray(data.proyectos.rows)) {
        const proyectosOrdenados = data.proyectos.rows.sort((a, b) => new Date(b.acta_fecha) - new Date(a.acta_fecha));
        setProyectos(proyectosOrdenados);
        setResultados(proyectosOrdenados.slice(0, 5));
        setLoading(true);
      }
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    }
  }

  const handleBusquedaNumeroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusquedaNumero(event.target.value);
    filtrarProyectos(event.target.value, busquedaPalabra, filtroTipo, filtroAprobado);
  };

  const handleBusquedaPalabraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusquedaPalabra(event.target.value);
    filtrarProyectos(busquedaNumero, event.target.value, filtroTipo, filtroAprobado);
  };

  const handleFiltroTipoChange = (value: string) => {
    setFiltroTipo(value);
    filtrarProyectos(busquedaNumero, busquedaPalabra, value, filtroAprobado);
  };

  const handleFiltroAprobadoChange = (checked: boolean) => {
    setFiltroAprobado(checked);
    filtrarProyectos(busquedaNumero, busquedaPalabra, filtroTipo, checked);
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

    filteredProyectos = filteredProyectos.sort((a, b) => new Date(b.acta_fecha) - new Date(a.acta_fecha)).slice(0, 5);

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
    { title: 'Observaciones', dataIndex: 'observaciones', key: 'observaciones', width: 200 },
  ];
  
  return (
    (!loading) ?  <Spin/> :
    <>
      <div onClick={() => setVer(!ver)}>
        <h2 
          data-aos="fade-left" 
          className={styles.h2}
        >
          Todos los Proyectos
        </h2>
      </div>
      
      {(ver) && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Input.Search
              placeholder="Buscar proyecto por número exacto..."
              value={busquedaNumero}
              onChange={handleBusquedaNumeroChange}
              style={{ width: 300, marginRight: '16px', marginBottom: '8px' }}
            />
            <Input.Search
              placeholder="Buscar proyecto por palabra..."
              value={busquedaPalabra}
              onChange={handleBusquedaPalabraChange}
              style={{ width: 300, marginRight: '16px', marginBottom: '8px' }}
            />
            <Select
              placeholder="Filtrar por tipo de proyecto"
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

          <Table
            dataSource={resultados}
            columns={columns}
            pagination={false}
            style={{ borderCollapse: 'collapse', background: '#0d0101', color:"white" }}
            rowKey="id"
          />
        </div>
      )}
    </>
  );
}

export default Proyectos;
