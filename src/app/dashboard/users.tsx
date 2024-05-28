/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useSession } from "@clerk/nextjs";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";


interface Users{
    id: string;
    email: string;
    disable: boolean;
}

export default function UsersPage() {
    const { session } = useSession()

    const [users, setUsers] = useState([])
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(false);

   
    const toggleCheckbox = (id: string, disable: boolean) => {
        const updateDisableStatus = async () => {
          try {
            let res = await fetch("/api/form", {
              method: "PUT",
              body: JSON.stringify({ id, disable }),
            });
            setStatus(status + 1) 
            return console.log('Product toogle')  
             
          } catch (error) {
            console.log('error', error)
          }       
      }
      updateDisableStatus() 
    }
    
    const toggleCheckboxUser = (id: string, disable: boolean) => {
      const updateDisableStatus = async () => {
        try {
          let res = await fetch("/api/signup", {
            method: "PUT",
            body: JSON.stringify({ id, disable }),
          });
          setStatus(status + 1) 
          return console.log('User toogle')  
           
        } catch (error) {
          console.log('error', error)
        }       
    }
    updateDisableStatus()
  }
useEffect(() => {
  Aos.init({ duration: 1000 });
})
  

  return (
  
           <div  data-aos="fade-up"  className="mt-100 rounded-lg shadow-[0_0px_10px_5px_rgba(100,100,100,.5)] m-1"> 
                             <div className="min-w-full h-screen grid md:grid-cols-3 md:gap-5">
                    <div className="ovewrflow-y-scroll overflow-x-hidden h-full mr-1 md:col-span-3 w-96 md:w-auto">
            <table className=" h-full bg-slate-100 bg-opacity-80 rounded-lg">
              <thead className="border-b text-gray-900 text-8px w-96">
                <tr>
                  <th className="p-1 text-xs text-right">Email</th>
                  <th className="p-1">Enable / Disable</th>
                  <th className="p-1 text-6px text-left">User ID</th>
                  
                </tr>
              </thead>
              <tbody>
                {users.map((user: Users) => (
                  <tr key={user.id} className="border-b text-gray-900 text-xs">
                   
                    <td className="p-1 text-left">{user.email}</td>
                    <td className="p-1 text-center">
                    <input type="checkbox" className="toggle toggle-error" checked={user.disable} onChange={() => toggleCheckboxUser(user.id, !user.disable)}/>
                    </td>
                    <td>
                    {user.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div> 
 );
}