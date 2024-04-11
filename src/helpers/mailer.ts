import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel'

export const sendEmail = async ({email, emailType , userId}: any) =>{

    try{

        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
          const updateUser = await User.findByIdAndUpdate(userId,
            { $set:{
              verifyToken: hashedToken , verifyTokenExpiry: Date.now() + 360000
            }}
          )
        } else if(emailType === "RESET"){
          const updateUser = await User.findByIdAndUpdate(userId,
          {
            $set:{
              forgotPasswordToken: hashedToken , forgotPasswordTokenExpiry: Date.now() + 3600000
            }
          }
          )
        }

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "03fac9e5bac056",
            pass: "a27ad7c73412cc"
          }
        });

          const mailOptions = {
            from: 'soham@.ai',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
            ${emailType === "VERIFY" ? "verify your email" : "reset your password"} ${hashedToken} </p>`,
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse

    } catch(error:any){
        throw new Error(error.message)
    }
}