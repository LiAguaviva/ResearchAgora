import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
 
 
dotenv.config();
 
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
 
});
 
 
// export const sendMailValidation = (email, token) =>{
//     transporter.sendMail({
//         from: 'socratesters@gmail.com',
//         to: email,
//         subject: "Validate Your Account",
//         html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
// </head>
// <body>
//   <h1>This is Agora Research. To validate your account, click here</h1>
//    <a href="${process.env.VITE_SERVER_URL}${token}"
   
//      target="_blank"
//      style="color: blue; text-decoration: underline;">
//      Click here to validate your account
//   </a>
// </body>
// </html>`
//     })
// };
 
import path from 'path';
import { fileURLToPath } from 'url';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
export const sendMailValidation = (email, token) => {
  transporter.sendMail({
      from: 'socratesters@gmail.com',
      to: email,
      subject: "Validate Your Account",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Validation</title>
      </head>
      <body>
          <div style="text-align: center; padding: 20px;">
              <img src="cid:logo" alt="Research Agora" style="width: 20rem; margin-bottom: 20px;">
              <h1 style="color:rgb(56, 0, 120)">Welcome to Research Agora!</h1>
              <p>Thank you for signing up. Please verify your email by clicking the button below.</p>

              <a href="${process.env.VITE_SERVER_URL}${token}"
                 style="display: inline-block; padding: 10px 20px; background-color:rgb(56, 0, 120); color: white; text-decoration: none; border-radius: 5px;">
                 Verify Your Account
              </a>

              <p style="font-size: 12px; color: #666; margin-top: 20px;">If you did not sign up, please ignore this email.</p>
          </div>
      </body>
      </html>`,
      attachments: [
          {
              path: path.resolve(__dirname, '../public/images/emailImg.png'),
              cid: 'logo'
          }
      ]
  });
};
 
 
 
 
export const sendPasswordResetEmail = (email, token) => {
  const resetLink = `http://localhost:5173/resetPassword/${token}`;
 
  transporter.sendMail({
    from: 'socratesters@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Validation</title>
      </head>
      <body>
          <div style="text-align: center; padding: 20px;">
              <img src="cid:logo" alt="Research Agora" style="width: 20rem; margin-bottom: 20px;">
              
              <p> This is Agora Research. We received your request to reset your password. Click the link below to reset your password:</p>

              <a href="${resetLink}"
                 style="display: inline-block; padding: 10px 20px; background-color:rgb(56, 0, 120); color: white; text-decoration: none; border-radius: 5px;">
                 Reset Your Password
              </a>

              <p style="font-size: 12px; color: #666; margin-top: 20px;">If you did not sign up, please ignore this email.</p>
          </div>
      </body>
      </html>`,
      attachments: [
        {
            path: path.resolve(__dirname, '../public/images/emailImg.png'),
            cid: 'logo'
        }
    ]
  }, (error, info) => {
    if (error) {
      throw new Error('Error sending password reset email');
    }
  });
};
 
 
  
export const forgottenPassword = (email, token) => {
  const resetLink = `${process.env.VITE_SERVER_URL2}resetPassword/${token}`;
 
  transporter.sendMail({
    from: 'socratesters@gmail.com',
    to: email,
    subject: 'Reset your password',
    html: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <img src="cid:logo" alt="Research Agora" style="width: 20rem; margin-bottom: 20px;">
      <title>Reset Your Password</title>
    </head>
    <body>
      <h1 style="color:rgb(56, 0, 120)">This is Agora Research. To reset your password, please click here</h1>
      <a href="${resetLink}" target="_blank" style="color: blue; text-decoration: underline;">
                      Click here to reset your password
      </a>
    </body>
  </html>`,
    }, (error, info) => {
      if (error) {
        throw new Error('Error sending forgotten password email');
      }
    });
};