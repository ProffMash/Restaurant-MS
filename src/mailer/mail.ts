import { info } from "console"
import "dotenv/config"
import nodemailer from 'nodemailer'

export const mailFunction = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.EMAIL,
        to: "kdmacharia8485@gmail.com",
        text: "This is a Demo"
    }
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error)
        }else{
            console.log(`Email sent: ${info.response}`)
        }

    })
}
// export default mailFunction


