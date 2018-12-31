//You need to install express to listen port and nodemailer for sending email
const express = require('express');
const app = express();
const listenport = '3000'; //You may select your own port
const nodemailer = require('nodemailer');
app.use(express.json())

app.post('/api/email', (req, res) => {
    const sendemail = {
        sendername: req.body.sendername, //Sender name  (Optional)
        receivername: req.body.receivername, //Receiver name  (Optional)
        receiveremail: req.body.receiveremail, //Receiver email  (Compulsory)
        subject: req.body.subject, //Email subject (Compulsory)
        text: req.body.text //Email content (Compulsory)
    };

    const transporter = nodemailer.createTransport({
        host: 'smtpdm-ap-southeast-1.aliyun.com', //SMTP service address in Alibaba Cloud DirectMail Service
        port: '465',
        secure: true,
        auth: {
            user: '', //Your Sender Address in Alibaba Cloud DirectMail Service
            pass: '' //Your password in Alibaba Cloud DirectMail Service
        }
    });
//You may customize your content
    const msghtml = `Dear ${sendemail.receivername}<br/><br/>Happy New Year!<br/><br/>${sendemail.text}<br/><br/>
Warm Regards<br/><br/>${sendemail.sendername}<br/>${Date()}<br/>
Sent out by NodeJS API`;

    const mailOptions = {
        from: '', //Your Sender Address in Alibaba Cloud DirectMail Service
        to: sendemail.receiveremail,
        subject: sendemail.subject,
        html: msghtml
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(`Email cannot be sent out.
              ${error}`)
        }
    else {
            console.log('Email sent: ' + info.response);
            res.send(`Email has been sent to ${sendemail.receivername} (${sendemail.receiveremail}).`)
        }
    });
})

app.listen(listenport, () => console.log(`Listening on port ${ listenport }`));