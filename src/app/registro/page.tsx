'use client'
import Expedientes from '../components/Expedientes'
import ONGs from '../components/ONGs'
import NavTop from '../components/NavTop'
import NavFoot from '../components/NavFoot'


const Registro = (
) => {

return (
    <>
<NavTop/>
<div className="mt-10">
<h1>Expedientes de proyectos sin sanción.</h1>
<Expedientes />
</div>
<NavFoot/>
</>
)


}

export default Registro;