"use client";
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import styles from './styles.module.css'; 
import { Spin } from 'antd';

export default function Proyectos() {
  const initialProyectos = []; 

  const [proyectos, setProyectos] = useState(initialProyectos.slice(0, 5));
  const [filteredProyectos, setFilteredProyectos] = useState(initialProyectos.slice(0, 5)); // Añadir estado para proyectos filtrados
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({});
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

  const handleEditClick = (proyecto) => {
    setEditingProject(proyecto);
    setFormData({
      ...proyecto,
      acta_fecha: new Date(proyecto.acta_fecha).toISOString().split('T')[0]
    });
    setIsModalVisible(true);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
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
      setFilteredProyectos((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))); // Actualizar proyectos filtrados
      setEditingProject(null);
      setFormData({});
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProyectos.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = proyectos.filter((proyecto) => 
      proyecto.numero_proyecto.toLowerCase().includes(searchTerm)
    );
    setFilteredProyectos(filtered);
    setCurrentPage(1); // Reiniciar a la primera página después de la búsqueda
  };
console.log(formData, "formData")
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
            <input type="hidden" name="id" value={formData.id} />
            <label>
              Número de Proyecto:
              <input
                type="text"
                name="numero_proyecto"
                value={formData.numero_proyecto}
                onChange={handleChange}
              />
            </label>
            <label>
              Año de Proyecto:
              <input
                type="text"
                name="anio_proyecto"
                value={formData.anio_proyecto}
                onChange={handleChange}
              />
            </label>
            <label>
              Título de Proyecto:
              <input
                type="text"
                name="titulo_proyecto"
                value={formData.titulo_proyecto}
                onChange={handleChange}
              />
            </label>
            <label>
              Tipo de Proyecto:
              <input
                type="text"
                name="tipo_proyecto"
                value={formData.tipo_proyecto}
                onChange={handleChange}
              />
            </label>
            <label>
              Autor:
              <input
                type="text"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
              />
            </label>
            <label>
              Colaboradores:
              <input
                type="text"
                name="colaboradores"
                value={formData.colaboradores}
                onChange={handleChange}
              />
            </label>
            <label>
              Girado a:
              <input
                type="text"
                name="girado_a"
                value={formData.girado_a}
                onChange={handleChange}
              />
            </label>
            <label>
              Acta Fecha:
              <input
                type="date"
                name="acta_fecha"
                value={formData.acta_fecha}
                onChange={handleChange}
              />
            </label>
            <label>
              Aprobado:
              <input
                type="checkbox"
                name="aprobado"
                checked={formData.aprobado}
                onChange={handleChange}
              />
            </label>
            <label>
              Tipo de Norma:
              <input
                type="text"
                name="tipo_norma"
                value={formData.tipo_norma}
                onChange={handleChange}
              />
            </label>
            <label>
              Número de Norma:
              <input
                type="text"
                name="numero_norma"
                value={formData.numero_norma}
                onChange={handleChange}
              />
            </label>
            <label>
              Observaciones:
              <input
                type="text"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
              />
            </label>
          </Modal>
          <div>
            <p>Páginas</p>
            {Array.from({ length: Math.ceil(filteredProyectos.length / projectsPerPage) }, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <><Spin /> cargando datos ... </>
      )}
    </div>
  );
}
