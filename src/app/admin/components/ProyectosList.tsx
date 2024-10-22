"use client";
import { useEffect, useState } from 'react';
import { Modal, Spin, Table, Button, Input } from 'antd';

export interface Proyecto {
  id: number;
  numero_proyecto: string;
  anio_proyecto: string;
  titulo_proyecto: string;
  tipo_proyecto: string;
  autor: string[];
  colaboradores: string[];
  girado_a: string;
  acta_fecha: string;
  aprobado: boolean;
  tipo_norma: string;
  numero_norma: string;
  observaciones: string;
}

type FormDataKey = keyof Proyecto;

export default function ProyectosList({ onEdit }: { onEdit: (proyecto: Proyecto) => void }) {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [filteredProyectos, setFilteredProyectos] = useState<Proyecto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  async function fetchProyectos() {
    try {
      const response = await fetch(`/api/proyectos`);
      if (!response.ok) {
        throw new Error('Error al cargar los proyectos');
      }
      const data = await response.json();
      setProyectos(data.proyectos);
      setFilteredProyectos(data.proyectos);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProyectos();
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProyectos.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = proyectos.filter((proyecto) => 
      proyecto.numero_proyecto.toLowerCase().includes(searchTerm)
    );
    setFilteredProyectos(filtered);
    setCurrentPage(1);
  };

  const handleSearchNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = proyectos.filter((proyecto) => 
      proyecto.titulo_proyecto.toLowerCase().includes(searchTerm)
    );
    setFilteredProyectos(filtered);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: 'Título de Proyecto',
      dataIndex: 'titulo_proyecto',
      key: 'titulo_proyecto',
      width: '25%',
    },
    {
      title: 'Número de Proyecto',
      dataIndex: 'numero_proyecto',
      key: 'numero_proyecto',
      width: '2%',
    },
    {
      title: 'Norma',
      dataIndex: 'numero_norma',
      key: 'numero_norma',
      width: '2%',
    },
    {
      title: 'Año de Proyecto',
      dataIndex: 'anio_proyecto',
      key: 'anio_proyecto',
      width: '2%',
    },
    {
      title: 'Tipo de Proyecto',
      dataIndex: 'tipo_proyecto',
      key: 'tipo_proyecto',
      width: '2%',
    },
    {
      title: 'Tipo norma',
      dataIndex: 'tipo_norma',
      key: 'tipo_norma',
      width: '2%',
    },
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '2%',
    },
    {
      title: 'Autores',
      dataIndex: 'autor',
      key: 'autor',
      render: (autores: string[]) => (
        <>
          {autores.map((autor, index) => (
            <span key={index}>
              {autor}
              {index < autores.length - 1 && ', '}
            </span>
          ))}
        </>
      ),
      width: '10%',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text: string, record: Proyecto) => (
        <Button type="link" onClick={() => onEdit(record)}>
          Editar
        </Button>
      ),
      width: '2%',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {loading ? (
        <>
          <Input 
            type="text" 
            className="mb-4 p-2 border border-gray-300 rounded"
            placeholder="Buscar Proyecto por número" 
            onChange={handleSearch}
          />
          <Input 
            type="text" 
            className="mb-4 p-2 border border-gray-300 rounded"
            placeholder="Buscar Proyecto por nombre" 
            onChange={handleSearchNombre}
          />
          <Table 
            dataSource={currentProjects}
            columns={columns}
            pagination={{
              current: currentPage,
              pageSize: projectsPerPage,
              total: filteredProyectos.length,
              onChange: paginate,
            }}
            rowKey="id"
          />
        </>
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
}
