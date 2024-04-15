import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { error } from 'console'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDataFromToken } from '@/helpers/getDatafromToken'
import { cookies } from 'next/headers'

connect()

export async function GET(request : NextRequest){
    const userId = '661d4bfaa0dfc3ebf972bb4b'
     
    const user = await User.findOne({_id: userId}).select("-password")
    console.log("profile route hit")

    return NextResponse.json({
        message: "User found",
        data: user
    })
}
