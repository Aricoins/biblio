
'use client'
import React, { useState, useEffect, FC } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Swal from 'sweetalert2'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';
import NavFoot from '@/app/components/NavFoot';
import NavTop from '@/app/components/NavTop';


interface Resenia {
    [key: string]: any; 
}

interface Form {
  titulo: string;
  autor: string;
  imagen: string;
  decla: string;
  resenia: Resenia;
}

interface Errors {
  titulo: string;
  autor: string;
  imagen: string;
  decla: string;
  resenia: string;
}



const validation = ( form: Form, setErrors: React.Dispatch<React.SetStateAction<Errors>>) => {
    let reseniaAsString = JSON.stringify(form.resenia);
    let newErrors: Errors = {
      titulo: form.titulo?.trim() === '' ? 'El título no puede estar vacío' : '',
      autor: form.autor?.trim() === '' ? "El campo Autor debe estar completo"  : '', 
      imagen: form.imagen ? '' : "Debe seleccionar una imagen",
      decla: Number(form.decla) > 0 ? '' : 'Debe ser un numero',
      resenia:  /^(\S+\s*){1,1000}$/.test(reseniaAsString)  ? "" : "La reseña no puede exceder las 1000 palabras",
    };
    setErrors(newErrors);
}


const CrearLibro: FC = () => {
    const router = useRouter();
    const [form, setForm] = useState<Form>({
    titulo: '',
    autor: '',
    imagen: '',
    decla: '',
    resenia: {},
  });

  const [errors, setErrors] = useState<Errors>({
    titulo: '',
    autor: '',
    imagen: '',
    decla: '',
    resenia: '',
  });
  const [formInteracted, setFormInteracted] = useState(false);


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
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
      specs: {
        ...prevForm.resenia,
        [newReview.property]: newReview.value,
      },
    }));  
    validation({ ...form, resenia: { ...form.resenia, [property]: value } }, setErrors);
  };
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


   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    validation(form, setErrors);
  
    const hasErrors = Object.values(errors).some((error) => error !== '');
  
    if (!hasErrors) {
      try {
        let res = await fetch('/api/crearLibro', {
            method: 'POST',
            body: JSON.stringify({ form }),
          }); console.log(res, 'res')
          if (!res.ok) {
          throw new Error(res.statusText);
        }
          const id = (await res.json()).id;
          const resetForm = () =>
          setForm({
            titulo: '',
            autor: '',
            imagen: '',
            decla: '',
            resenia: {reseña: ''},
          });
        resetForm();

        Swal.fire({
          title: 'Libro Creado!',
          html: `El libro ha sido creado exitosamente.`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            // window.location.href = `/product/${id}`;
            router.push(`/libros`)

          }});
        }

       catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Product not added',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        }
    }
    };
  useEffect(() => {
    AOS.init();
  }, []);
console.log(errors, 'eerros')

return (
    <>
    <NavTop/>
   <div className='flex flex-col sm:flex-row gap-10'>
    <div className='flex-1 p-1 bg-gray-600 mx-10 rounded-md 
    shadow-md text-gray-100'>   <div className='p-20 bg-gray-900 rounded-md shadow-md items-center gap-4 mb-20 text-gray-100'>
       <h1 data-aos='flip-right' className='text-gray-300 text-center text-9x1 p-20'>
                        Agregar Libro </h1>
          <form onSubmit={handleFormSubmit} className='grid justify-items-center content-evenly gap-y-40'>
           <div data-aos='flip-right' className='flex flex-col items-center gap-2 w-full'>
             <label htmlFor='titulo'>Título:</label> 
             <input
                name='titulo'
                type='text'
                id='titulo'
                placeholder='Ingrese el título...'
                value={form.titulo}
                onChange={handleChange}
                className='m-1 text-2xl text-black p-2 w-full  border-gray-500 rounded'
              />  
            </div>

            <div data-aos='flip-right' className='flex flex-col items-center gap-2 w-full'>
              <label htmlFor='autor'>Autor:</label> 
              <input
                 name='autor'
                 type='text'
                 id='autor'
                 placeholder='Ingrese el nombre de la autor...'
                 value={form.autor}
                 onChange={handleChange}
                 className='m-1 text-2xl text-black p-2 w-full  border-gray-500 rounded'
               />  
             </div>
            <div data-aos='flip-right' className='flex justify-center w-full'>
              <CldUploadButton 
                className='w-full border-blue-500 text-normal rounded border-2 p-8 cursor-pointer transition duration-300 hover:bg-blue-500 hover:text-white hover:border-transparent'
                uploadPreset='zwtk1tj5'
                onUpload={handleImageUpload}
              >
                Suba una imagen
              </CldUploadButton>
            </div>
            {form.imagen && (
              <div className='flex justify-center w-full'>
                <Image 
                  src={form.imagen}
                  alt='imagen' 
                  width={200}
                  height={200}
                  className='w-60 h-auto transition-transform rounded-2xl hover:scale-110' 
                  data-aos='flip-right' 
                />
              </div>
            )}
            <div data-aos='flip-right' className='flex flex-col items-center gap-2 w-full'>
              <label htmlFor='decla'>Declaración de Interés:</label>
              <input
                name='decla'
                type='text'
                id='decla'
                placeholder='Ingrese el número de declaración...'
                value={form.decla}
                onChange={handleChange}
                className='m-1 text-2xl text-black p-2 w-full  border-gray-500 rounded'
              />
            </div>
    
            <div data-aos='flip-right' className='bg-blue-500 text-black p-10 justify-center rounded-md cursor-pointer transition duration-500 hover:bg-white hover:text-blue-500 w-full'>
              <button 
                type='submit'
                disabled={ Object.values(errors).some((error) => error !== '')}
                className='border-gray-500 w-full rounded '
              >
                {!form.titulo || Object.values(errors).some((error) => error !== '') ? 'Cannot Submit - Fix Errors' : 'Add New Book'}
              </button>
            </div>
          </form>
        </div>
      
      </div>
      <div className='flex-1 p-4 bg-black opacity-80 rounded-md shadow-md text-gray-400'>
<div className='fixed top-20 h-full w-full p-12 text-sm text-gray-400 md:tw-1/2 tw-1/4 mx-auto bg-black opacity-80 rounded-md shadow-md'>
  {/* Sidebar content */}
  {formInteracted ? (
    Object.values(errors).some((error) => error !== '') ? (
      <div>
        <p>Validación de Datos:</p>
        <ul className='sticky top-12 h-auto w-full '>
          {Object.entries(errors).map(([key, value]) => (
            <li className='p-5' key={key}>
              <span className=' rounded-md shadow-md '>
                {value ? '❌ ' + value : '✅ ' + key.charAt(0).toUpperCase() + key.slice(1) + ' es válido'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div >
        <ul>
          {Object.entries(errors).map(([key, value]) => (
            <li className='p-5' key={key}>
              <span className='text-gray-200'>✅ {key.charAt(0).toUpperCase() + key.slice(1)} ha sido validado </span>
            </li>
          ))}
        </ul>
        <div className='text-gray-200 p-5 text-sm rounded-full'>
          ✅ <b>El libro ya puede ser cargado.</b>
        </div>
      </div>
    )
  ) : (
    <div className='fixed top-20 h-full p-12 text-sm text-gray-400 md:tw-1/2 tw-1/4 mx-auto bg-black opacity-80 rounded-md shadow-md'>

      <p>Requerimientos:</p>
      <ul>
        <li className='p-5 '>
          <span className='text-blue-500 '>Título:</span> ingrese el título completo del libro.
        </li>
        <li className='p-5 '>
          <span className='text-blue-500'>Imagen:</span> agregue una imagen de la portada.
        </li>
        <li className='p-5 '>
          <span className='text-blue-500'>Autor:</span> ingrese el nombre del autor del libro.
        </li>
        <li className='p-5 '>
          <span className='text-blue-500'>Delcaración: </span> ingrese el número de declaración del libro.
        </li>
      </ul>
    </div>
  )}
</div>


    </div>
    </div>
<NavFoot/>

    </>
  );
  
  };
  export default CrearLibro;



  

//  return (
//   <>
//     <div className="flex flex-col sm:flex-row justify-center bg-gray-500 w-full mb-36">
      
//       <div className="m-6  mx-4 w-auto sm:mx-10 sm:w-2/3 p-4 bg-black rounded-md shadow-md items-center gap-5 mb-50 text-gray-300 ">
//         <h1 data-aos="flip-right" className="text-2xl text-gray-300 p-20 text-center"> Add New Product</h1>
//         <form onSubmit={handleFormSubmit} className="grid justify-items-center content-evenly gap-y-20">
//          <div data-aos="flip-right" className='flex flex-col items-center gap-2 w-full'>
//            <label htmlFor="model">Name model:</label> 
//            <input
//               name="model"
//               type="text"
//               id="model"
//               placeholder='Enter a Name Model...'
//               value={form.model}
//               onChange={handleChange}
//               className='m-1 text-2xl text-black p-2 w-full  border-gray-500 rounded'
//             />  
//           </div>
//           <div data-aos="flip-right" className='flex justify-center w-full'>
//             <CldUploadButton 
//               className='w-full border-blue-500 text-normal rounded border-2 p-8 cursor-pointer transition duration-300 hover:bg-blue-500 hover:text-white hover:border-transparent'
//               uploadPreset="zwtk1tj5"
//               onUpload={handleImageUpload}
//             >
//               Upload Image
//             </CldUploadButton>
//           </div>
//           {form.image && (
//             <div className="flex justify-center w-full">
//               <Image 
//                 src={form.image}
//                 alt='imagen' 
//                 width={200}
//                 height={200}
//                 className="w-60 h-auto transition-transform rounded-2xl hover:scale-110" 
//                 data-aos="flip-right" 
//               />
//             </div>
//           )}
//           <div data-aos="flip-right" className='flex flex-col items-center w-full'>
//             <label htmlFor="category">Category:</label>
//             <select
//               name="category"
//               id="category"
       
//               value={form.category}
//               onChange={handleChange}
//               className='text-3xl text-black w-full border-blue-500'  
//             >
//               <option value="All">All</option>
//               <option value="Phones">Phones</option>
//               <option value="Tablets">Tablets</option>
//               <option value="Laptops">Laptops</option>
//               <option value="Desktops">Desktops</option>
//               <option value="Softwares">Softwares</option>
//             </select>
//           </div>
//           <div data-aos="flip-right" className='flex flex-col items-center gap-2 w-full'>
//             <label htmlFor="price">Price:</label>
//             <input
//               name="price"
//               type="text"
//               id="price"
//               placeholder='Type a number for the Price...'
//               value={form.price}
//               onChange={handleChange}
//               className='m-1 text-2xl text-black p-2 w-full  border-gray-500 rounded'
//             />
//           </div>
          
//  <div data-aos="flip-right" className='flex flex-col items-center gap-2 w-full'>
//   <label htmlFor="key">Spec:</label>
//   <input
//     onChange={handleKeyChange}
//     name="key"
//     id="key"
//     placeholder='Enter a specificification'
//     value={key}
//     className='m-1 text-2xl text-black p-2 w-full border-blue-500 rounded'
//   />

//   <label htmlFor="value">Desciption:</label>
//   <input
//     onChange={handleValueChange}
//     name="value"
//     id="value"
//     placeholder='Enter description'
//     value={value}
//     className='m-1 text-2xl text-black p-2 w-full border-blue-500 rounded'
//   />

// <button  type="button" onClick={handleAddSpec} className='m-1 text-2xl text-gray-800 p-2 w-full border-blue-100 bg-blue-300 rounded'>
//     Add Spec
//   </button>
// </div>

// <div className='relative mx-auto text-left items-left self-left'>
// {Object.keys(form.specs).length !== 0 ? (
//   <>
//   {form.image && (
//             <div className="flex justify-center w-full">
//               <Image 
//                 src={form.image}
//                 alt='imagen' 
//                 width={20}
//                 height={20}
//                 className="w-60 h-auto transition-transform rounded-2xl hover:scale-110" 
//                 data-aos="flip-right" 
//               />
//             </div>
//           )}
//     <div data-aos="flip-right" className='text-4xl items-left text-left p-3'>Specs:</div>
//     {Object.entries(form.specs).map(([key, value], index) => (
//       <div data-aos="flip-right" key={index} className='text-sm text-right justify-end text-gray-200 p-2 w-full border-blue-500 rounded'>
//         <strong>{key}:</strong> {value}
//       </div>
//     ))}
//   </>
// ) : null}
// </div>

//    <div data-aos="flip-right" className="bg-blue-500 text-black p-10 justify-center rounded-md cursor-pointer transition duration-500 hover:bg-white hover:text-blue-500 w-full">
//             <button 
//               type="submit"
//               disabled={ Object.values(errors).some((error) => error !== '')}
//               className='border-gray-500 w-full rounded '
//             >
//               {!form.model || Object.values(errors).some((error) => error !== '') ? 'Cannot Submit - Fix Errors' : 'Add New Product'}
//             </button>
//           </div>
//         </form>
//       </div>
//       <div className="w-full sm:w-2/4 mx-auto p-5 bg-gray-300 shadow-md text-black">
//     {/* Columna lateral */}
//     {formInteracted ? (
//       Object.values(errors).some((error) => error !== '') ? (
//         <div className="sticky top-20  h-full p-12 text-sm text-gray-400 md:tw-1/2 tw-1/4 mx-auto p-15 bg-black rounded-md shadow-md ">
//          <p>Please correct the following requirements:</p>
//           <ul className='sticky top-12 h-auto ' >
//             {Object.entries(errors).map(([key, value]) => (
//               <li className= "p-5" key={key}>
//                 <span className=" rounded-md shadow-md "> {value ?  "❌ "  + value :  "✅ " + key.charAt(0).toUpperCase() + key.slice(1) + ' has been successfully validated' }  </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <div className="sticky top-12  h-auto text-sm  md:tw-1/2 tw-1/4 mx-auto p-8 bg-black rounded-md shadow-md text-gray-400 ">

//           <ul>
//             {Object.entries(errors).map(([key, value]) => (
//               <li className="p-5" key={key}>
//                 <span className="text-gray-400">✅ {key.charAt(0).toUpperCase() + key.slice(1)} has been successfully validated </span>
//               </li>
//             ))}
//           </ul> 
//             <div className="text-gray-200 p-5  text-sm rounded-full "> ✅
//            <b>Your product is ready to be loaded!</b></div>
//           </div>
//       )
//     ) : (
//       <div className="sticky top-20  h-auto text-base text-gray-400 md:tw-1/2 tw-1/4 mx-auto p-5 bg-black rounded-md shadow-md ">
//         <p>Requirements:</p>
//         <ul>
//           <li className='p-5 '>
//             <span className="text-blue-500 ">Name model:</span> enter a valid model name. 
//           </li>
//           <li className='p-5 '>
//             <span className="text-blue-500">Image:</span> add an Image from multiple sources. 
//           </li>
//           <li className='p-5 '>
//             <span className="text-blue-500">Category:</span> add a category for your created product.
//           </li>
//           <li className='p-5 '>
//             <span className="text-blue-500">Price: </span> define the price of the product with a positive number.
//           </li>
//           <li className='p-5 '>  
//             <span className="text-blue-500">Specs:</span> detail the Specifications of the created product
//           </li>
              
//         </ul>

//       </div>
//     )}
//       </div>

        
// </div>

//   </>
// );

// };

// export default CreateProduct