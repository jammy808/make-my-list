'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Alert() {
 
    return(
        <>
           <div className="w-screen h-screen bg-yellow-300 py-72">

            <div className="text-center font-bold text-4xl lg:text-3xl italic text-black">
                <h1 className="">A Verification mail has been sent to your registered email. Please check your inbox</h1>
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
