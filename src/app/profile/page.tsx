'use client'
import React, { useEffect } from "react";
import axios from "axios";

function page() {

    const getData = async() =>{
        const res = await axios.post("/api/users/profile")
        console.log(res.data)
    }

    useEffect(() => { getData() }, [])

    
       

    return(
        <h1>{}</h1>
    )
}

export default page