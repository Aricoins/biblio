'use client'
import Expedientes from '../components/Expedientes'
import ONGs from '../components/ONGs'
import NavTop from '../components/NavTop'
import NavFoot from '../components/NavFoot'
import "../style.module.css"

const Registro = () => {
  return (
    <>
      <NavTop />
      <div className="grid grid-cols-12 gap-4">
        <div className='col-span-6'>
          <h2>Expedientes de proyectos sin sanción.</h2>
          <Expedientes />
        </div>

        <div className='col-span-6'>
          <h2>Expedientes Ordenanzas</h2>
          <Expedientes />
        </div>

        <div className='col-span-6'>
          <h2>Expedientes Declaraciones</h2>
          <Expedientes />
        </div>

        <div className='col-span-6'>
          <h2>Expedientes Comunicaciones</h2>
          <Expedientes />
        </div>
      </div>
      <NavFoot />
    </>
  );
}

export default Registro;
