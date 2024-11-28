"use client";
import { useEffect, useState } from 'react';
import { Modal, Spin, Table, Button, Input, Select } from 'antd';
import styles from './styles.module.css';

interface Proyecto {
  id: number;
  numero_proyecto: string;
  anio_proyecto: string;
  titulo_proyecto: string;
  tipo_proyecto: string;
  autor: string;
  colaboradores: string;
  girado_a: string;
  acta_fecha: string;
  aprobado: boolean;
  tipo_norma: string;
  numero_norma: string;
  observaciones: string;
}

type FormDataKey = keyof Proyecto;

export default function Proyectos() {
  const initialProyectos: Proyecto[] = [];

  const [proyectos, setProyectos] = useState<Proyecto[]>(initialProyectos.slice(0, 5));
  const [filteredProyectos, setFilteredProyectos] = useState<Proyecto[]>(initialProyectos.slice(0, 5));
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined); // Año seleccionado
  const [searchNumber, setSearchNumber] = useState<string>(''); // Filtro por número
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // Filtro por palabra clave
  const [editingProject, setEditingProject] = useState<Proyecto | null>(null);
  const [formData, setFormData] = useState<Partial<Proyecto>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchProyectos() {
    try {
      const response = await fetch(`/api/proyectos`);
      if (!response.ok) {
        throw new Error('Error al cargar los proyectos');
      }
      const data = await response.json();
      setProyectos(data.proyectos);
      setFilteredProyectos(data.proyectos); // Establece proyectos inicialmente
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProyectos();
  }, []);

  // Función para manejar el cambio en el filtro por año
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    filterProjects(year, searchNumber, searchKeyword);
  };

  // Función para manejar el cambio en el filtro por número de proyecto
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNumber(e.target.value);
    filterProjects(selectedYear, e.target.value, searchKeyword);
  };

  // Función para manejar el cambio en el filtro por palabra clave
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    filterProjects(selectedYear, searchNumber, e.target.value);
  };

  // Función para filtrar los proyectos según todos los filtros aplicados
  const filterProjects = (year?: string, number?: string, keyword?: string) => {
    let filtered = proyectos;

    // Filtro por año
    if (year) {
      filtered = filtered.filter((proyecto) => proyecto.anio_proyecto === year);
    }

    // Filtro por número de proyecto
    if (number) {
      filtered = filtered.filter((proyecto) =>
        proyecto.numero_proyecto.toLowerCase().includes(number.toLowerCase())
      );
    }

    // Filtro por palabra clave
    if (keyword) {
      filtered = filtered.filter((proyecto) =>
        proyecto.titulo_proyecto.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setFilteredProyectos(filtered);
  };

  const columns = [
    { title: 'Número de Proyecto', dataIndex: 'numero_proyecto' },
    { title: 'Año de Proyecto', dataIndex: 'anio_proyecto' },
    { title: 'Título', dataIndex: 'titulo_proyecto' },
    { title: 'Tipo de Proyecto', dataIndex: 'tipo_proyecto' },
    // Más columnas según lo necesites
  ];

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="Filtrar por año"
          style={{ width: 200 }}
        >
          {/* Opciones de años, puedes agregar años dinámicamente */}
          <Select.Option value="2024">2024</Select.Option>
          <Select.Option value="2023">2023</Select.Option>
          <Select.Option value="2022">2022</Select.Option>
          <Select.Option value="2021">2021</Select.Option>
          <Select.Option value="2020">2020</Select.Option>
          <Select.Option value="2019">2019</Select.Option>
          <Select.Option value="2018">2018</Select.Option>
          <Select.Option value="2017">2017</Select.Option>
          <Select.Option value="2016">2016</Select.Option>
          <Select.Option value="2015">2015</Select.Option>
          <Select.Option value="2014">2014</Select.Option>
          <Select.Option value="2013">2013</Select.Option>
          <Select.Option value="2012">2012</Select.Option>
          <Select.Option value="2011">2011</Select.Option>
          <Select.Option value="2010">2010</Select.Option>
          <Select.Option value="2009">2009</Select.Option>
          <Select.Option value="2008">2008</Select.Option>
          <Select.Option value="2007">2007</Select.Option>
          <Select.Option value="2006">2006</Select.Option>
          <Select.Option value="2005">2005</Select.Option>
          <Select.Option value="2004">2004</Select.Option>
          <Select.Option value="2003">2003</Select.Option>
          <Select.Option value="2002">2002</Select.Option>
          <Select.Option value="2001">2001</Select.Option>
          <Select.Option value="2000">2000</Select.Option>
          <Select.Option value="1999">1999</Select.Option>
          <Select.Option value="1998">1998</Select.Option>
          <Select.Option value="1997">1997</Select.Option>
          <Select.Option value="1996">1996</Select.Option>
          <Select.Option value="1995">1995</Select.Option>
          <Select.Option value="1994">1994</Select.Option>
          <Select.Option value="1993">1993</Select.Option>
          <Select.Option value="1992">1992</Select.Option>
          <Select.Option value="1991">1991</Select.Option>
          <Select.Option value="1990">1990</Select.Option>
          <Select.Option value="1989">1989</Select.Option>
          <Select.Option value="1988">1988</Select.Option>
          <Select.Option value="1987">1987</Select.Option>
          <Select.Option value="1986">1986</Select.Option>
          <Select.Option value="1985">1985</Select.Option>
          <Select.Option value="1984">1984</Select.Option>
          <Select.Option value="1983">1983</Select.Option>
          <Select.Option value="1982">1982</Select.Option>
          <Select.Option value="1981">1981</Select.Option>
          <Select.Option value="1980">1980</Select.Option>
          <Select.Option value="1979">1979</Select.Option>
          <Select.Option value="1978">1978</Select.Option>
          <Select.Option value="1977">1977</Select.Option>

        
        </Select>

        <Input
          value={searchNumber}
          onChange={handleNumberChange}
          placeholder="Buscar por número de proyecto"
          style={{ width: 200 }}
        />

        <Input
          value={searchKeyword}
          onChange={handleKeywordChange}
          placeholder="Buscar por palabra clave en título"
          style={{ width: 200 }}
        />
      </div>

      <Table
        dataSource={filteredProyectos}
        columns={columns}
        rowKey="id"
        pagination={{ current: currentPage, pageSize: projectsPerPage }}
      />
    </div>
  );
}
