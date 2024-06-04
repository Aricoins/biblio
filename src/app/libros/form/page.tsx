'use client'
import React, { useState, useEffect, FC } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation';
import NavFoot from '@/app/components/NavFoot';
import NavTop from '@/app/components/NavTop';

import styles from './style.module.css'; // Importar el archivo CSS Modules correspondiente

interface Form {
  titulo: string;
  autor: string;
  imagen: string;
  decla: string;
  resenia: string;
}

interface Errors {
  titulo: string;
  autor: string;
  imagen: string;
  decla: string;
  resenia: string;
}

const validation = (form: Form, setErrors: React.Dispatch<React.SetStateAction<Errors>>) => {
  let newErrors: Errors = {
    titulo: form.titulo?.trim() === '' ? 'El título no puede estar vacío' : '',
    autor: form.autor?.trim() === '' ? "El campo Autor debe estar completo" : '',
    imagen: form.imagen ? '' : "Debe seleccionar una imagen",
    decla: Number(form.decla) > 0 ? '' : 'Debe ser un numero',
    resenia: /^(\S+\s*){1,10000}$/.test(form.resenia) ? "" : "La reseña no puede exceder las 1000 palabras",
  };
  setErrors(newErrors);
};

const CrearLibro: FC = () => {
    const router = useRouter();
    const [form, setForm] = useState<Form>({
      titulo: '',
      autor: '',
      imagen: '',
      decla: '',
      resenia: '', 
    });
    

  const [errors, setErrors] = useState<Errors>({
    titulo: '',
    autor: '',
    imagen: '',
    decla: '',
    resenia: '',
  });
  const [formInteracted, setFormInteracted] = useState(false);


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      [property]: value,
    }));
    validation({ ...form, [property]: value }, setErrors);
    setFormInteracted(true);
  };
  

  const handleReviewChange = (newReview: { property: string; value: any }) => {
    const property = newReview.property;
    const value = newReview.value;
    
    setForm((prevForm) => ({
      ...prevForm,
      resenia:  newReview.value,
      
    }));  
  
    validation({ ...form, resenia: value }, setErrors);  };
  
const [key, setKey] = useState('');
const [value, setValue] = useState('');

const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setKey(event.target.value);
};

const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};

const handleAddReview = () => {
    
  handleReviewChange({ property: key, value: value });
  setKey('');
  setValue('');
};


  const handleImageUpload = (data: any) => {
  const  {info} = data
    setForm((prevForm) => ({
          ...prevForm,
         imagen: info.secure_url,
        }))

      validation({ ...form, imagen: info.secure_url }, setErrors);
    setFormInteracted(true); 
   }


   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form }),
      });

      const result = await response.json();

      if (result.result) {
        Swal.fire('Success', 'Libro agregado exitosamente', 'success');
        router.push(`/libros/${result.id}`);
      } else {
        Swal.fire('Error', result.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Error al agregar el libro', 'error');
    }
  };
  useEffect(() => {
    AOS.init();
  }, []);
console.log(errors, 'errors')

return (
    <>
    <NavTop/>
   <div className={styles.flexContainer}>
    <div className={styles.flexItem}>
    <div className={styles.formContainer}>
       <h1 data-aos='flip-right' className={styles.formTitle}>
        Agregar Libro
        </h1>
          <form onSubmit={handleSubmit} className={styles.formGrid}>
           <div data-aos='flip-right' className={styles.formGroup}>
             <label htmlFor='titulo'>Título:</label> 
             <input
                name='titulo'
                type='text'
                id='titulo'
                placeholder='Ingrese el título...'
                value={form.titulo}
                onChange={handleChange}
                className={styles.formInput}
              />  
            </div>

            <div data-aos='flip-right' className={styles.formGroup}>
              <label htmlFor='autor'>Autor:</label> 
              <input
                 name='autor'
                 type='text'
                 id='autor'
                 placeholder='Ingrese el nombre del autor...'
                 value={form.autor}
                 onChange={handleChange}
                 className={styles.formInput}
               />  
             </div>
            <div data-aos='flip-right' className={styles.formGroup}>
              <CldUploadButton 
                className={styles.uploadButton}
                uploadPreset='zwtk1tj5'
                onUpload={handleImageUpload}
              >
                Suba una imagen
              </CldUploadButton>
            </div>
            {form.imagen && (
              <div className={styles.imageContainer}>
                <Image 
                  src={form.imagen}
                  alt='imagen' 
                  width={200}
                  height={200}
                  className={styles.image}
                  data-aos='flip-right' 
                />
              </div>
            )}
            <div data-aos='flip-right' className={styles.formGroup}>
              <label htmlFor='decla'>Declaración de Interés:</label>
              <input
                name='decla'
                type='text'
                id='decla'
                placeholder='Ingrese el número de declaración...'
                value={form.decla}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>
            <div data-aos='flip-right' className={styles.formGroup}>
              <label htmlFor='resenia'>Reseña:</label>
              <textarea
                name='resenia'
                id='resenia'
                placeholder='Ingrese la reseña...'
                value={form.resenia}
                onChange={handleChange}
                className={styles.formTextArea}
              />
            </div>

            <div data-aos='flip-right' className={styles.submitButtonContainer}>
            <button 
              type='submit'
              disabled={form.titulo === ""  || Object.values(errors).some((error) => error !== '')}
              className={styles.submitButton}
            >
              {!form.titulo || Object.values(errors).some((error) => error !== '') ? 'Revise los datos antes de crear el libro' : 'Crear Libro'}
            </button>
            </div>
          </form>
        </div>
      
      </div>

<div className={styles.sideContent}>

  {formInteracted ? (
    Object.values(errors).some((error) => error !== '') ? (
      <div>
        <p>Validación de Datos:</p>
        <ul className={styles.errorList}>
          {Object.entries(errors).map(([key, value]) => (
            <li className={styles.errorListItem} key={key}>
              <span className={styles.errorIcon}>{value ? '❌' : '✅'}</span>
              <span className={styles.errorText}>{value ? value : key.charAt(0).toUpperCase() + key.slice(1) + ' es válido'}</span>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className={styles.successMessage} >
        <ul>
          {Object.entries(errors).map(([key, value]) => (
            <li className={styles.errorListItem} key={key}>
              <span className={styles.successIcon}>✅</span>
              <span className={styles.successText}>{key.charAt(0).toUpperCase() + key.slice(1)} ha sido validado</span>
            </li>
          ))}
        </ul>
        <div >
          ✅ <b>El libro ya puede ser cargado.</b>
        </div>
      </div>
    )
  ) : (
    <div className={styles.requirementsMessage}>
      <p>Requerimientos:</p>
      <ul>
        <li>Título: ingrese el título completo del libro.</li>
        <li>Imagen: agregue una imagen de la portada.</li>
        <li>Autor: ingrese el nombre del autor del libro.</li>
        <li>Declaración: ingrese el número de declaración del libro.</li>
      </ul>
    </div>
  )}
   </div>
    </div>

<NavFoot/>

    </>
  );
  
};
export default CrearLibro;
