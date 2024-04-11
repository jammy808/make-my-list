'use client'
import React, { useEffect , useState } from "react";
import axios from "axios";

function Profile() {

    const getData = async() =>{

        const res = await axios.get("/api/users/profile")
        console.log(res.data.data._id)
    }

    useEffect(() => { getData() }, [])




    
    
// -----------------------------------------------------------------------------------------------------------------------------------------------
       
    return(
        <>
        <h1>My List</h1>
        </>
    )
}

export default Profile