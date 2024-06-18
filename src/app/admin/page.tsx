"use client";

import Proyectos from './components/proyectos';
import CrearLibro from '../libros/form/page';
import Link from 'next/link';
import { SignIn, useAuth, SignUp } from '@clerk/nextjs';
import { useUser } from "@clerk/clerk-react";

const Page = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  console.log(user, "user");
  return (
    <>
      {user && user.id ==="user_2hpeAtj5l4aYpY9olKcPdEYO6W6" && isSignedIn ? (
        <div style={{
          textAlign: "center",
          color: "white",
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "5%",
          justifySelf: "center",
          fontSize: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        }}>
          <h1 style={{ backgroundColor: "gray", borderRadius: "10px", fontFamily: "Arial" }}>Administrar datos</h1>

          <div style={{
            width: "90%",
            margin: "1%",
            marginLeft: "1%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5%",
            backgroundColor: "black"
          }}>
            <div style={{ width: "98%", color: "black" }}>
              <p style={{ color: "white", fontFamily: "Arial" }}>Archivo</p>
              <Proyectos />
            </div>

            <div style={{ width: "98%" }}>
              <p style={{ color: "white", fontFamily: "Arial", justifySelf: "right" }}>Biblioteca</p>
              <CrearLibro />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "10%" }}>
          <h4 style={{color: "white", padding: "3%", textAlign: "center", fontFamily: "Roboto", }}>Debe ser administrador para poder editar datos</h4>
       <div style={{}}>
</div >
<Link href="/" > <button style={{fontSize: "large", 
  backgroundColor: "orangered", 
  padding: "1%", color: "white", marginLeft: "42%", borderRadius: "10%"}}> Salir de Admin </button> </Link>

        </div>

      )}
    </>
  );
};

export default Page;
