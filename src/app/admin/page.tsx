"use client"
import Proyectos from './components/Proyectos';
import CrearLibro from '../libros/form/page';
import Link from 'next/link';


const Page = () => {
  const abrirModal = () => {

  }

  return (
       <>   
<div style={{textAlign: "center", 
color: "white",  
margin: "10", 
padding: "10%", 
backgroundColor: "gray", 
fontFamily: "Arial"
}}>

<h1>Administrar datos</h1>

</div> 
    <div style={{
     marginTop: "15%",
     margin: "1%", 
     display: "flex",
     flexDirection: "row",    
     fontSize: "40px", 
     textAlign: "center", 
     fontFamily: "Roboto"}}>

      
      <div  style={{width: "40%", margin: "10%", marginLeft: "1%", justifyContent: "left" }}>
        <Proyectos />
      </div>
      <div style={{marginRight: "0px", textDecoration: "none", margin: "10%", backgroundColor: "red", width: "50%"}}>
  
     <button onClick={abrirModal} > Agregar Libro </button>
      </div>
    </div>

    </>  );  
}

export default Page;
