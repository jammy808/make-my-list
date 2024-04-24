'use client'  
import React, { lazy, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage() {

    const router = useRouter()

    const [user, setuser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled , setbuttonDisabled] = useState(false)
    const [loading , setloading] = useState("Login")

    const onSignup = async () => {
        try {
            setloading("Processing...")
            
            const response = await axios.post("/api/users/login", user)
            console.log("login done", response.data);

            router.push('/profile')
            
        } catch (error: any) {
            console.log("login failed");
            setloading(error.response.data.error)
            console.log(error.response.data.error)

            toast.error(error.message)
        }
    }

    useEffect(() => {
         if(user.email.length > 0 && user.password.length ){
            setbuttonDisabled(false)
         }else{
            setbuttonDisabled(true)
         }
    }, [user])

    return(
        <>
        <h1>{loading}</h1>

        <br />
        <input
        id="Email"
        value={user.email}
        onChange={(e) => setuser({...user,
            email: e.target.value
        })}
        placeholder="Email"
        type="text" />

        <br />
        <input
        id="password"
        value={user.password}
        onChange={(e) => setuser({...user,
            password: e.target.value
        })}
        placeholder="Password"
        type="text" />

        <br />
        <button onClick={onSignup}>
            {buttonDisabled? "fill the form": "Log In" }
        </button>

        <br />
        
        <Link href="/signup">Sign Up</Link> 
        </>
        
    )
}

export default LoginPage