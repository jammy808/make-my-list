import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { error } from 'console'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDataFromToken } from '@/helpers/getDatafromToken'

connect()

export async function POST(request : NextRequest){

    const reqBody = await request.json()
        const { id } = reqBody

    const userId = await getDataFromToken(request)
     
    const user = await User.findOne({_id: userId.id})

    user.tasks.splice(id, 1);
    await user.save();
   
    return NextResponse.json({
        message: "User found",
        data: user
    })
}
