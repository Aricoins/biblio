"use client"
import Proyectos from './components/Proyectos';
import CrearLibro from '../libros/form/page';


const Page = () => {

  return (
    <div style={{
      marginTop: "20%",
     display: "flex", 
     flexDirection: "row", 
     margin: "6%"}}>
      
      <div  style={{width: "40%", margin: "5%" }}>
        <Proyectos />
      </div>
      <div style={{width: "40%"}}>
      <CrearLibro />
      </div>
    </div>
  );  
}

export default Page;
