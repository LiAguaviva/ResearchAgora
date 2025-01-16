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

// let emailHtml = `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
// </head>
// <body>
//   <h1>This is Agora Research. To validate your account, click here</h1>
//   <a href="${process.env.VITE_SERVER_URL}/verify-account/${token}"></a>
// </body>
// </html>`

export const sendMailValidation = (email, token) =>{
    transporter.sendMail({
        from: 'albajimenezus@gmail.com',
        to: email,
        subject: "Validate Your Account",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>This is Agora Research. To validate your account, click here</h1>
   <a href="${process.env.VITE_SERVER_URL}${token}" 
   
     target="_blank" 
     style="color: blue; text-decoration: underline;">
     Click here to validate your account
  </a>
</body>
</html>`
    })
}

//el href tiene que ser un enlace a una página del front (localhost:5173...), se abre pestaña nueva y tiene que tener un useEffect que vaya al verify. Si la respuesta está bien debe aparecer un mensaje de que el registro se ha hecho correctamente, sino, no autorizado