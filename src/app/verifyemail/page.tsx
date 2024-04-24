'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function VerifyEmailPage() {
 
    const [token, setToken] = useState("")
    const [verified , setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            console.log(token)
            console.log("hi")
            const res = await axios.post("/api/users/verifyemail",{token})
            setVerified(true)
        } catch (error: any) {
            
            console.log("hi")
            console.log(error.response.data);
             
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]       
        setToken(urlToken || "")

    }, [])

    return(
        <>
            <div className="w-screen h-screen bg-yellow-300 py-72">

            <div className="text-center font-bold text-4xl lg:text-3xl italic text-black">
            <h1>{verified? "Verified Succesfully": "" }</h1>
            </div>

            
            <div className="w-[100%] flex justify-center">
            <button 
                className="bg-yellow-400  px-2 rounded-2xl border-0 border-b-4 border-r-1 border-solid border-yellow-600 
                font-bold italic text-yellow-700 shadow-xl m-6 justify-self-end w-32 transform transition-all hover:translate-y-1 text-2xl " 
                onClick={verifyUserEmail}> Verify </button>
            </div>

            <div>
            <Link href="/login">
            <h2 className="font-semibold text-3xl lg:text-3xl text-yellow-700 text-center mt-10">Login</h2>
            </Link>
            </div>

           </div>
        </>
    )
}
