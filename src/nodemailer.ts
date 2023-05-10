import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

export const transporter = nodemailer.createTransport(new SMTPTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
}))
