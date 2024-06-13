"use client"
import Proyectos from './components/proyectos';
import CrearLibro from '../libros/form/page';
import Link from 'next/link';
import { Modal } from 'antd';
import {SignIn, useAuth} from '@clerk/nextjs';


const Page = () => {
 const { isSignedIn } = useAuth();

  return (
       <>   

       {isSignedIn ? 
      (  
<div style={{textAlign: "center", 
color: "white",  

display: "flex",
flexDirection: "column",
width: "80%",
margin: "5%",
justifySelf: "center",
fontSize: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",

}} >

  <h1 style={{backgroundColor: "gray", borderRadius: "10px", fontFamily: "Arial"}}>Administrar datos</h1>

    <div style={{width: "90%", 
       margin: "1%", 
      marginLeft: "1%", 
      display: "grid",
      gridTemplateColumns: "1fr 1fr", 
      gap: "5%",
      backgroundColor: "black"}} >
 
     
       <div style= {{width: "98%", color: "black"}}>
       <p style={{color: "white", fontFamily: "Arial"}}>Archivo</p> 
        <Proyectos />
      </div>
      
      <div style={{width: "98%", }}>
      <p style= {{ color: "white",  fontFamily: "Arial", justifySelf: "right"}} > Biblioteca </p>
           <CrearLibro /> 
      </div>
      
    

      </div> 
    </div>
      ) : <SignIn /> }
    </>  );  
}

export default Page;
