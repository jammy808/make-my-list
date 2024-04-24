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
          service : "gmail",
          auth: {
            user: "lolmadhu69@gmail.com",
            pass: "uexf fmzl tmne jrda"
          }
        });

          const mailOptions = {
            from: 'service : "gmail",',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
            ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`,
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse

    } catch(error:any){
        throw new Error(error.message)
    }
}