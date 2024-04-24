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
        {/* <h1>{loading}</h1>

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
        
        <Link href="/signup">Sign Up</Link>  */}


        <div className="w-screen h-screen bg-yellow-300 flex items-center justify-center">

        <div className="w-9/12 lg:w-[30vw] bg-gradient-to-r from-yellow-200 rounded-3xl px-4 lg:px-20 py-8 text-3xl lg:text-base">

        <h1 className="font-bold text-4xl lg:text-3xl italic text-black text-center">Make My List</h1>
        <h2 className="font-semibold text-2xl lg:text-xl text-yellow-700 text-center mt-4">{loading}</h2>
        
        <label className="block mt-10 lg:mt-3 font-bold p-1 text-xl lg:text-xl">Email :</label>
        <input className="block w-full border-yellow-500 border-2 rounded-lg bg-yellow-200"
         type="email"
         id="Email"
        value={user.email}
        onChange={(e) => setuser({...user,
            email: e.target.value
        })}
        />
        

        <label className="block mt-10 lg:mt-3 font-bold p-1 text-xl lg:text-xl">Password :</label>
        <input className="block w-full border-yellow-500 border-2 rounded-lg bg-yellow-200 lg:p-1" 
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setuser({...user,
            password: e.target.value
        })}
        />


        <div className="w-[100%] flex justify-center">
        <button 
            className="bg-yellow-400  px-2 rounded-2xl border-0 border-b-4 border-r-1 border-solid border-yellow-600 
            font-bold italic text-yellow-700 shadow-xl m-6 justify-self-end w-32 transform transition-all hover:translate-y-1  " 
            onClick={onSignup}> {buttonDisabled? "fill the form": "Log In" } </button>
        </div>


        <Link href="/signup">
        <h2 className="font-semibold text-2xl lg:text-xl text-yellow-700 text-center mt-1">Sign Up</h2>
        </Link>

        
        </div>

        </div>

        </>
        
    )
}

export default LoginPage