import nodemailer from "nodemailer";
import { FRONTEND_URL } from "../config/env.js";

export const sendVerificationEmail = async (email, token) => {
    // Create a test SMTP account from Ethereal
    let testaccount = await nodemailer.createTestAccount();

    // Create a transporter
    let transporter = nodemailer.createTransport({
        host: testaccount.smtp.host,
        secure: testaccount.smtp.secure,
        port: testaccount.smtp.port,
        auth: {
            user: testaccount.user,
            pass: testaccount.pass,
        },
    });

    // Construct verification URL
    const url = `${FRONTEND_URL}/verify-email/${token}`;

    // Send email
    try {
        let info = await transporter.sendMail({
            from: '"Mehfil" <no-reply@mehfil.com>',
            to: email,
            subject: "Mehfil: Verify Your Email",
            html: `<h2>Welcome to Mehfil!</h2>
                <p>Click on the link below to verify your email:</p>
                <a href="${url}">Verify Email</a>`,
        });

        console.log("Email sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); // Ethereal preview
        return info;
    } catch (err) {
        console.error("Error sending email:", err);
        throw err;
    }
};
