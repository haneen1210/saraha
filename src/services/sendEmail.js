import nodemailer from 'nodemailer';

 async function SendEmail(to,subject,html) {
    const transporter = nodemailer.createTransport({
    service:'gmail',
        auth: {
            user: process.env.SENDEMAIL,
            pass: process.env.SENDPASS,
        },
        tls:{
            rejectUnauthorized:false
        }
    });

        const info = await transporter.sendMail({
            from: `"Infinity light 👻"< ${process.env.SENDEMAIL}>`, // sender address
            to, 
            subject , 
            html, 
        });

    
}
export default SendEmail;
