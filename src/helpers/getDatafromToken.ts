import { NextRequest } from "next/server";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export const getDataFromToken = async (request: NextRequest) =>{
    try {
        const token = await request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)

        return decodedToken
        
    } catch (error:any) {
        throw new Error(error.message)   
    }
}