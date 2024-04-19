"use client";
import { useAuth } from "@clerk/nextjs";
import { userInfo } from "os";
 import { UserProfile } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
export default function Example() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
 const usuario = useAuth();
  // In case the user signs out while on the page.
//   if (!isLoaded || !userId) {
//     return null;
//   }
 console.log(userId, "que hay")
  return (
    <div>
     <UserProfile /> 
     <SignIn /> </div>
  ) 
}