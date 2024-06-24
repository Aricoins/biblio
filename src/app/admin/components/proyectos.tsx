"use client";
import { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
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

export default function Proyectos() {
  const initialProyectos: Proyecto[] = [];

  const [proyectos, setProyectos] = useState<Proyecto[]>(initialProyectos.slice(0, 5));
  const [filteredProyectos, setFilteredProyectos] = useState<Proyecto[]>(initialProyectos.slice(0, 5)); // Añadir estado para proyectos filtrados
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [editingProject, setEditingProject] = useState<Proyecto | null>(null);
  const [formData, setFormData] = useState<Partial<Proyecto>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProyectos() {
      try {
        const response = await fetch(`/api/proyectos`);
        if (!response.ok) {
          throw new Error('Error al cargar los proyectos');
        }
        const data = await response.json();
        setProyectos(data.proyectos);
        setFilteredProyectos(data.proyectos); // Inicializar proyectos filtrados
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProyectos();
  }, []);

  const handleEditClick = (proyecto: Proyecto) => {
    setEditingProject(proyecto);
    setFormData({
      ...proyecto,
      acta_fecha: new Date(proyecto.acta_fecha).toISOString().split('T')[0]
    });
    setIsModalVisible(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement; // Asegurarse de que el objetivo es un HTMLInputElement
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/proyectos', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (!response.ok) {
        throw new Error('Error al actualizar el proyecto');
      }
    
      const updatedProject = await response.json();
    
      setProyectos((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
      setFilteredProyectos((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
      setEditingProject(null);

      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

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
    setCurrentPage(1); // Reiniciar a la primera página después de la búsqueda
  };

  console.log(formData, "formData");

  return (
    <div className={styles.container}> 
      {loading ? (
        <>
          <input 
            type="text" 
            className={styles.inputSearch} 
            placeholder="Buscar Proyecto por ID" 
            onChange={handleSearch} // Añadir manejador de búsqueda
          />
          <div className={styles.gridContainer}> 
            {currentProjects.map((proyecto) => (
              <div style={{ border: "solid 1px black", width: "100%" }} key={proyecto.id}>
                <h5>{proyecto.titulo_proyecto}</h5>
                <h3>{proyecto.numero_proyecto}/{proyecto.anio_proyecto}</h3>
                <p>{proyecto.tipo_proyecto}</p>
                <p> {proyecto.id} </p>
                <button onClick={() => handleEditClick(proyecto)}>Editar</button>
              </div>
            ))}
          </div>
          <Modal
            styles={{ body: { padding: 20 } }}
            title="Editar "
            open={isModalVisible}
            onOk={handleSubmit}
            onCancel={() => setIsModalVisible(false)}
          >
            <input type="hidden" name="id" value={formData.id || ''} />
            <label>
              Número de Proyecto:
              <input
                type="text"
                name="numero_proyecto"
                value={formData.numero_proyecto || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Año de Proyecto:
              <input
                type="text"
                name="anio_proyecto"
                value={formData.anio_proyecto || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Título de Proyecto:
              <input
                type="text"
                name="titulo_proyecto"
                value={formData.titulo_proyecto || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Tipo de Proyecto:
              <input
                type="text"
                name="tipo_proyecto"
                value={formData.tipo_proyecto || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Autor:
              <input
                type="text"
                name="autor"
                value={formData.autor || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Colaboradores:
              <input
                type="text"
                name="colaboradores"
                value={formData.colaboradores || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Girado a:
              <input
                type="text"
                name="girado_a"
                value={formData.girado_a || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Acta Fecha:
              <input
                type="date"
                name="acta_fecha"
                value={formData.acta_fecha || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Aprobado:
              <input
                type="checkbox"
                name="aprobado"
                checked={formData.aprobado || false}
                onChange={handleChange}
              />
            </label>
            <label>
              Tipo de Norma:
              <input
                type="text"
                name="tipo_norma"
                value={formData.tipo_norma || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Número de Norma:
              <input
                type="text"
                name="numero_norma"
                value={formData.numero_norma || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Observaciones:
              <input
                type="text"
                name="observaciones"
                value={formData.observaciones || ''}
                onChange={handleChange}
              />
            </label>
          </Modal>
          <div>
            <p>Páginas</p>
            {Array.from({ length: Math.ceil(filteredProyectos.length / projectsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? styles.activePage : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
}
