import Image from 'next/image';
import defaultImage from "../../../public/assets/imagendefault.jpg"
// Define las props que el componente Libro espera recibir
interface LibroProps {
  libro: {
    titulo: string;
    autor: string;
    decla: string;
    imagen: string;
    // Agrega aquí cualquier otra propiedad que el objeto libro pueda tener
  };

}

const Libro: React.FC<LibroProps> = ({ libro }) => {
  return (
    <div className="max-w-l bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Image className= "text-center " src={libro.imagen ? libro.imagen : defaultImage} alt={libro.titulo} width={400} height={400} />
    <div className="flex flex-col items-center justify-center b">
      <div className="mb-2 text-l text-center font-bold tracking-tight text-gray-600 dark:text-white"><div className=" mb-3 font-2px text-gray-600 dark:text-gray-400 "> {libro.titulo}</div> </div>
      <h5 className="text-center text-xs">{libro.autor}</h5>

      {libro.decla? <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <p className='text-xs'>Declaración {libro.decla}</p>     </a> : null}
           
  
    </div>
  </div>

  );
};

export default Libro;



//  
//     <div class="p-5">
//         <a href="#">
//             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
//         </a>
//         <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
//         <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//             Read more
//              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
//             </svg>
//         </a>
//     </div>
// </div>
