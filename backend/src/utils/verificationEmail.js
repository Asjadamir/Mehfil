import nodemailer from "nodemailer";
import {
    EMAIL_HOST,
    EMAIL_PASSWORD,
    EMAIL_PORT,
    EMAIL_USER,
    SENDER_EMAIL,
    BASE_URL,
} from "../config/env.js";

let transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    secure: true,
    port: EMAIL_PORT,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    },
});

const sendVerificationEmail = (email, token) => {
    const url = `${BASE_URL}/verify/${token}`;

    transporter.sendMail(
        {
            from: SENDER_EMAIL,
            to: email,
            subject: "Mehfil: Verify Your Email",
            html: `<h2>Welcome to Mehfil!</h2>
        <p>Click on the link below to verify your email:</p>
        <a href="${url}">Verify Email</a>`,
        },
        (err, res) => {
            if (err) {
                console.error("Error sending email:", err);
            } else {
                console.log("Email sent:", res.message);
            }

            return res;
        }
    );
};
