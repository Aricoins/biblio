'use client'
import ONGs from '../components/ONGs'
import NavTop from '../components/NavTop'
import NavFoot from '../components/NavFoot'
import "../style.module.css"
import ProyectosNoSancionados from '../components/ProyectosNoSancionados'
import ExpedientesResoluciones from '../components/ExpedientesResoluciones'
import ExpedientesOrdenanzas from '../components/ExpedientesOrdenanzas'
import ExpedientesDeclaraciones from '../components/ExpedientesDeclaraciones'
import ExpedientesComunicaciones from '../components/ExpedientesComunicaciones'
import PCM from '../components/PCM'


const Container = 'flex items-center justify-center text-sm h-2';

const Registro = () => {
  return (
    <>
      <NavTop />
      <div className="gap-2">
      <div className="grid grid-cols-12 bg-gradient-to-r 
from-gray-100 to-grey-600 via-grey-800 animate-gradient-x mt-20 mb-20">
            <div className='col-span-6 mx-2 shadow-2xl'>
          <ExpedientesOrdenanzas />
        </div>
        <div className='col-span-6  mx-2 shadow-2xl'>
          <ProyectosNoSancionados />
        </div>
        <div className='col-span-6 mx-2 shadow-2xl'>
          <ExpedientesComunicaciones />
   </div>
   <div className='col-span-6 mx-2 shadow-2xl'>
          <ExpedientesDeclaraciones />
        </div>
             
        <div className='col-span-6  mx-2 shadow-2xl'>
          <ExpedientesResoluciones />
        </div>
        <div className='col-span-6 mx-2 shadow-2xl'>
          <PCM />
        </div>
      </div>
      </div>
      <NavFoot />
    </>
  );
}

export default Registro;
