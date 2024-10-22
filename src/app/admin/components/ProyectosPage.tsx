import { useState } from 'react';
import ProyectosList from './ProyectosList';
import EditarProyectoModal from './EditarProyectoModal';
import CrearProyecto from './CrearProyecto';
import { Button, notification } from 'antd';
import { Proyecto } from './ProyectosList';

export default function ProyectosPage() {
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [projects, setProjects] = useState<Proyecto[]>([]);

  const openNotification = (type: 'success' | 'error', message: string) => {
    notification[type]({
      message: message,
      placement: 'bottomRight',
    });
  };

  const handleEdit = (proyecto: Proyecto) => {
    setSelectedProject(proyecto);
    setIsEditModalVisible(true);
  };

  const handleCreate = () => {
    setSelectedProject(null);
    setIsCreateModalVisible(true);
  };

  const handleSave = async (formData: Partial<Proyecto>) => {
    try {
      const response = await fetch('/api/proyectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error('Failed to create project');
  
      const newProject = await response.json();
      setProjects([...projects, newProject]);
  
      openNotification('success', 'Proyecto guardado con éxito');
      setIsCreateModalVisible(false);
    } catch (error) {
      console.error('Error saving project:', error);
      openNotification('error', 'Error al guardar el proyecto');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleCreate}>Crear Nuevo Proyecto</Button>
      <ProyectosList onEdit={handleEdit}  />
      <EditarProyectoModal
        visible={isEditModalVisible}
        proyecto={selectedProject}
        onCancel={() => setIsEditModalVisible(false)}
        onSave={handleSave}
      />
      <CrearProyecto
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        onSave={handleSave}
      />
    </div>
  );
}
