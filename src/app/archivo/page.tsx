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


const Container = 'bg-black flex items-center justify-center';

const Registro = () => {
  return (
    <>
      <NavTop />
      <div className={Container}>
      <div className="grid grid-cols-12 gap-4 m-10 bg-gray-300">
       

        <div className='col-span-6 mx-10 shadow-2xl'>
          <ExpedientesOrdenanzas />
        </div>
        <div className='col-span-6'>
          <ProyectosNoSancionados />
        </div>

        <div className='col-span-6'>
     
     <ExpedientesComunicaciones />
   </div>

        <div className='col-span-6'>
          <ExpedientesDeclaraciones />
        </div>

       
       
        <div className='col-span-6'>
          <ExpedientesResoluciones />
        </div>
        <div className='col-span-6'>
          <PCM />
        </div>
      </div>
      </div>
      <NavFoot />
    </>
  );
}

export default Registro;
