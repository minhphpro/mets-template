import nodemailer from 'nodemailer'
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_USERNAME } from '../config'

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST || 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD
  }
})

export const sendEmail = async (from: string, to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text
    })

    console.log('Email sent: ' + info.response)
    return info
  } catch (error) {
    console.error('Error sending email: ', error)
  }
}
