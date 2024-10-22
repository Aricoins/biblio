import { Modal, Button, Input, DatePicker, Checkbox } from 'antd';
import { Proyecto } from './ProyectosList';
import { useState } from 'react';
import moment, { Moment } from 'moment';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface CrearProyectoProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (formData: Partial<Proyecto>) => void;
}

export default function CrearProyecto({ visible, onCancel, onSave }: CrearProyectoProps) {
  const [formData, setFormData] = useState<Partial<Proyecto>>({
    numero_proyecto: '',
    anio_proyecto: '',
    titulo_proyecto: '',
    tipo_proyecto: '',
    autor: [], 
    colaboradores: [],
    girado_a: '',
    acta_fecha: '',
    aprobado: false,
    tipo_norma: '',
    numero_norma: '',
    observaciones: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Moment | null, dateString: string | string[]) => {
    if (Array.isArray(dateString)) {
      setFormData(prevData => ({
        ...prevData,
        acta_fecha: dateString[0], // Use the first date if an array is provided
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        acta_fecha: dateString,
      }));
    }
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setFormData(prevData => ({
      ...prevData,
      aprobado: e.target.checked,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data before save:', formData);
    onSave(formData);
  };

  return (
    <Modal
      title="Crear Proyecto"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Input
        name="numero_proyecto"
        value={formData.numero_proyecto || ''}
        onChange={handleChange}
        placeholder="Número de Proyecto"
      />
      <Input
        name="anio_proyecto"
        value={formData.anio_proyecto || ''}
        onChange={handleChange}
        placeholder="Año de Proyecto"
      />
      <Input
        name="titulo_proyecto"
        value={formData.titulo_proyecto || ''}
        onChange={handleChange}
        placeholder="Título de Proyecto"
      />
      <Input
        name="tipo_proyecto"
        value={formData.tipo_proyecto || ''}
        onChange={handleChange}
        placeholder="Tipo de Proyecto"
      />
      <Input
        name="autor"
        value={formData.autor || ''}
        onChange={handleChange}
        placeholder="Autor"
      />
      <Input
        name="colaboradores"
        value={formData.colaboradores || ''}
        onChange={handleChange}
        placeholder="Colaboradores"
      />
      <Input
        name="girado_a"
        value={formData.girado_a || ''}
        onChange={handleChange}
        placeholder="Girado a"
      />
      <DatePicker
        name="acta_fecha"
        value={formData.acta_fecha ? moment(formData.acta_fecha) : null}
        onChange={handleDateChange}
        placeholder="Fecha del Acta"
      />
      <Checkbox
        name="aprobado"
        checked={formData.aprobado || false}
        onChange={handleCheckboxChange}
      >
        Aprobado
      </Checkbox>
      <Input
        name="tipo_norma"
        value={formData.tipo_norma || ''}
        onChange={handleChange}
        placeholder="Tipo de Norma"
      />
      <Input
        name="numero_norma"
        value={formData.numero_norma || ''}
        onChange={handleChange}
        placeholder="Número de Norma"
      />
      <Input.TextArea
        name="observaciones"
        value={formData.observaciones || ''}
        onChange={handleChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
        placeholder="Observaciones"
      />
    </Modal>
  );
}
