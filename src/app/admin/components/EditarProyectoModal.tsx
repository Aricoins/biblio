// EditarProyectoModal.jsx
import { Modal, Button, Input } from 'antd';
import { Proyectos } from './proyectos';
import { useState } from 'react';

interface EditarProyectoModalProps {
  visible: boolean;
  proyecto: Proyecto | null;
  onCancel: () => void;
  onSave: (formData: Partial<Proyecto>) => void;
}

export default function EditarProyectoModal({ visible, proyecto, onCancel, onSave }: EditarProyectoModalProps) {
  const [formData, setFormData] = useState<Partial<Proyecto>>(proyecto || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (proyecto) {
      onSave(formData);
    }
  };

  return (
    <Modal
      title="Editar Proyecto"
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      {/* Aquí van los campos del formulario */}
      <Input
        name="titulo_proyecto"
        value={formData.titulo_proyecto || ''}
        onChange={handleChange}
      />
      {/* Agrega los demás campos aquí */}
    </Modal>
  );
}
