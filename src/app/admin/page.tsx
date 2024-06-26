"use client";

import Proyectos from './components/proyectos';
import CrearLibro from '../libros/form/page';
import Link from 'next/link';
import {  SignIn, useAuth, SignUp, UserProfile, Protect } from '@clerk/nextjs';
import { useUser } from "@clerk/clerk-react";
import { useState } from 'react';


// {
//   isLoaded: true,
//   isSignedIn: false,
//   sessionId: null,
//   userId: null,
//   actor: null,
//   orgId: null,
//   orgRole: null,
//   orgSlug: null,
//   has: [Function: has],
//   signOut: [AsyncFunction (anonymous)],
//   getToken: [AsyncFunction (anonymous)]
// } useAuth


const Page = () => {
  const { isSignedIn, has, orgRole, userId } = useAuth();
  const { user } = useUser();
 
  const authorizedUserIds = [
    "user_2hpQoB18ifR9aKQX85JeqFa3eXR",
    "user_2hpeAtj5l4aYpY9olKcPdEYO6W6",
    "user_2hyFEgA0uIUAdDsl4YSdDexhBu6", 
   
  ];
  
  return (
    <>
     {(userId && authorizedUserIds.includes(userId)) ? 
     (
        <div style={{
          textAlign: "center",
          color: "white",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "auto",
          marginTop: "5%",
          justifySelf: "center",
          fontSize: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        }}>
          <h1 style={{ backgroundColor: "gray", borderRadius: "10px", fontFamily: "Arial" }}>Administrar datos</h1>

          <div style={{
            width: "100%",
            margin: "auto",
            display: "flex",
            backgroundColor: "black"
          }}>
            <div style={{ width: "98%", color: "black", backgroundColor: "orangered", margin: "auto"}}>
              <p style={{ color: "white", fontFamily: "Arial" }}>Archivo</p>
              <Proyectos />
            </div> </div>

              <CrearLibro />
         

        </div>

      ) :
       ( <div>
        <div style={{ display: "flex", flexDirection: "column", margin: "auto", marginTop: "20%" }}>
          <h4 style={{color: "white", 
            padding: "3%", 
            textAlign: "center", 
            fontFamily: "Sans-Serif"}}>Debe ser administrador para poder editar datos</h4>
           
       <div style={{color: "green", margin: "auto"}}>
          <SignIn  routing='hash'/>
            <Link href="/" > <button style={{fontSize: "large", 
                backgroundColor: "orangered", 
                padding: "1%", color: "white", marginLeft: "42%", borderRadius: "10%"}}> Salir de Admin </button> </Link>

        </div>


        </div> </div>
        
        )
      
          }    </>)};

export default Page;

