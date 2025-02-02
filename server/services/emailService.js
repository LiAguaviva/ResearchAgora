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


export const sendMailValidation = (email, token) =>{
    transporter.sendMail({
        from: 'socratesters@gmail.com',
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
};


export const sendPasswordResetEmail = (email, token) => {
  const resetLink = `http://localhost:5173/resetPassword/${token}`;
 
  transporter.sendMail({
    from: 'socratesters@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
<a href="${resetLink}" target="_blank">Reset Password</a>`,
  }, (error, info) => {
    if (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Error sending password reset email');
    }
    console.log('Password reset email sent:', info.response);
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
<title>Reset Your Password</title>
</head>
<body>
<h1>This is Agora Research. To reset your password, please click here</h1>
<a href="${resetLink}" target="_blank" style="color: blue; text-decoration: underline;">
                Click here to reset your password
</a>
</body>
</html>`,
  }, (error, info) => {
    if (error) {
      console.error('Error sending forgotten password email:', error);
      throw new Error('Error sending forgotten password email');
    }
    console.log('Forgotten password email sent:', info.response);
  });
};

//the href has to be a link to a front page (localhost:5173...), it opens a new tab and has to have a useEffect that goes to verify. If the response is OK, you should get a message that the registration was successful, otherwise, not authorized.