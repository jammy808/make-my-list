'use client'  
import React, { lazy, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignupPage() {

    const router = useRouter()

    const [user, setuser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled , setbuttonDisabled] = useState(false)
    const [loading , setloading] = useState(false)

    const onSignup = async () => {
        try {
            setloading(true)
            
            const response = await axios.post("/api/users/signup", user)
            console.log("signup done", response.data);

            router.push('/login')
            
        } catch (error: any) {
            console.log("Signup failed");
            toast.error(error.message)
        }
    }

    useEffect(() => {
         if(user.email.length > 0 && user.password.length && user.username.length > 0){
            setbuttonDisabled(false)
         }else{
            setbuttonDisabled(true)
         }
    }, [user])

    return(
        <>
        <h1>{loading ? "Processing" : "Signup"}</h1>

        <br />
        <input
        id="username"
        value={user.username}
        onChange={(e) => setuser({...user,
            username: e.target.value
        })}
        placeholder="Username"
        type="text" />

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
            {buttonDisabled? "fill the form": "Sign Up" }
        </button>

        <br />
        
        <Link href="/login">Login</Link> 
        </>
        
    )
}

export default SignupPage 