import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import CrearLibro from '../libros/form/page'
import UsersPage from '../dashboard/users'
export default function AdminDashboard() {


  // If the user does not have the admin role, redirect them to the home page
  
  return (
    <>
     <div  style={{ display: "flex", flexDirection: "row", marginTop: "10%"}}>
     Administración de datos

<div  style={{width: "50%"}}> <CrearLibro />
</div>     

<div><UsersPage /></div>    
</div></>
  );
}