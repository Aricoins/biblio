"use client";

import Proyectos from './components/proyectos';
import CrearLibro from '../libros/form/page';
import Link from 'next/link';
import {  SignIn, useAuth, SignUp, UserProfile, Protect } from '@clerk/nextjs';
import { useUser } from "@clerk/clerk-react";


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
  const { isSignedIn, has, orgRole } = useAuth();
  const { user } = useUser();
  
  const isAdmin = has && has({permission: "org:admin"});

  console.log(isSignedIn, "isSignedIn");
  console.log(user, "user");
console.log (isAdmin, "isAdmin");
console.log(useAuth(), "useAuth");
  return (
    <>
     {
     (user?.id === "user_2hpeAtj5l4aYpY9olKcPdEYO6W6" || user?.id === "user_2hyFEgA0uIUAdDsl4YSdDexhBu6") ? 
     (
  
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
              <p style={{ color: "white", 
                fontFamily: "Arial", 
                fontSize: "10px", 
                textAlign: "center", 
                justifySelf: "right" }}>Biblioteca</p>
              <CrearLibro />
            </div>
          </div>

        </div>

      ) :
       ( <div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "20%" }}>
          <h4 style={{color: "white", 
            padding: "3%", 
            textAlign: "center", 
            fontFamily: "Sans-Serif"}}>Debe ser administrador para poder editar datos</h4>
           
       <div style={{color: "green"}}>
          <SignIn />
            <Link href="/" > <button style={{fontSize: "large", 
                backgroundColor: "orangered", 
                padding: "1%", color: "white", marginLeft: "42%", borderRadius: "10%"}}> Salir de Admin </button> </Link>

        </div>


        </div> </div>
        
        )}
      
    </>)};

export default Page;



//   {
//     "pathRoot": "/me",
//     "id": "user_2hpeAtj5l4aYpY9olKcPdEYO6W6",
//     "externalId": null,
//     "username": null,
//     "emailAddresses": [
//         {
//             "pathRoot": "/me/email_addresses",
//             "emailAddress": "arielgarcia79@gmail.com",
//             "linkedTo": [
//                 {
//                     "pathRoot": "",
//                     "id": "idn_2hpeAsewyBXyb85pEG8PuhwIyqb",
//                     "type": "oauth_google"
//                 }
//             ],
//             "id": "idn_2hpeArunAGx9FT0MblucJYOBNAD",
//             "verification": {
//                 "pathRoot": "",
//                 "status": "verified",
//                 "strategy": "from_oauth_google",
//                 "nonce": null,
//                 "externalVerificationRedirectURL": null,
//                 "attempts": null,
//                 "expireAt": "2024-06-19T14:32:57.848Z",
//                 "error": null
//             }
//         }
//     ],
//     "phoneNumbers": [],
//     "web3Wallets": [],
//     "externalAccounts": [
//         {
//             "pathRoot": "/me/external_accounts",
//             "providerUserId": "104276103226986054331",
//             "emailAddress": "arielgarcia79@gmail.com",
//             "approvedScopes": "email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile",
//             "firstName": "Ariel G.",
//             "lastName": "Rogel",
//             "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLVmVtY21fUG1DY05mV0U3M3drS1dhd1dBeHJVVzJNb084bGJIWVRiN3BGNnZheXZFb0FRPXMxMDAwLWMiLCJzIjoiQXArSUR6SlVtTXhUaVRIQXVRR0JzTzhPaGRCbEZMZDg1OTRRVG5rcWQ3cyJ9",
//             "username": "",
//             "publicMetadata": {},
//             "label": null,
//             "verification": {
//                 "pathRoot": "",
//                 "status": "verified",
//                 "strategy": "oauth_google",
//                 "nonce": null,
//                 "externalVerificationRedirectURL": null,
//                 "attempts": null,
//                 "expireAt": "2024-06-13T16:25:03.654Z",
//                 "error": {
//                     "code": "external_account_missing_refresh_token",
//                     "message": "Missing refresh token",
//                     "longMessage": "We cannot refresh your OAuth access token because the server didn't provide a refresh token. Please re-connect your account.",
//                     "meta": {}
//                 }
//             },
//             "id": "eac_2hpeAq3J0rS1Okm8CrM43LgItTO",
//             "identificationId": "idn_2hpeAsewyBXyb85pEG8PuhwIyqb",
//             "provider": "google"
//         }
//     ],
//     "passkeys": [],
//     "samlAccounts": [],
//     "organizationMemberships": [],
//     "passwordEnabled": false,
//     "firstName": "Ariel G.",
//     "lastName": "Rogel",
//     "fullName": "Ariel G. Rogel",
//     "primaryEmailAddressId": "idn_2hpeArunAGx9FT0MblucJYOBNAD",
//     "primaryEmailAddress": {
//         "pathRoot": "/me/email_addresses",
//         "emailAddress": "arielgarcia79@gmail.com",
//         "linkedTo": [
//             {
//                 "pathRoot": "",
//                 "id": "idn_2hpeAsewyBXyb85pEG8PuhwIyqb",
//                 "type": "oauth_google"
//             }
//         ],
//         "id": "idn_2hpeArunAGx9FT0MblucJYOBNAD",
//         "verification": {
//             "pathRoot": "",
//             "status": "verified",
//             "strategy": "from_oauth_google",
//             "nonce": null,
//             "externalVerificationRedirectURL": null,
//             "attempts": null,
//             "expireAt": "2024-06-19T14:32:57.848Z",
//             "error": null
//         }
//     },
//     "primaryPhoneNumberId": null,
//     "primaryPhoneNumber": null,
//     "primaryWeb3WalletId": null,
//     "primaryWeb3Wallet": null,
//     "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaHBlQXE4eVFjUUxNV3JscVRWek42eTJ1cHEifQ",
//     "hasImage": true,
//     "twoFactorEnabled": false,
//     "totpEnabled": false,
//     "backupCodeEnabled": false,
//     "publicMetadata": {},
//     "unsafeMetadata": {},
//     "createOrganizationEnabled": true,
//     "deleteSelfEnabled": true,
//     "lastSignInAt": "2024-06-19T14:32:55.570Z",
//     "updatedAt": "2024-06-19T14:32:55.592Z",
//     "createdAt": "2024-06-13T16:15:05.079Z",
//     "cachedSessionsWithActivities": null
// }
