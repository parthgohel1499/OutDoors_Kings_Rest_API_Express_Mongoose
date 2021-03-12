import nodemailer from 'nodemailer';
require('dotenv').config();

// send mail with defined transport object
const sMail = (email, subject, html) => {

    var sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'parthgohel984298@gmail.com',
            pass: 'ozhlkjoidyrjvwkg'
        }
    });

    var mail = {
        from: "parthgohel984298@gmail.com",
        subject: subject,
        to: email,
        html: html
    };

    console.log("email sent !");
    //res.send({ message: " email sent !" });

    sender.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.send({ message: " email sent !" })
            console.log("Email sent successfully: "
                + info.response);
        }
    });
}
export { sMail }

