const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    // create reusable transporter object using the default SMTP transport
    var transport = nodemailer.createTransport({
      service: 'Gmail',
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: "toalaa9@gmail.com",
        pass: "pxfzmodzslcdryrk"
      }
    });
    
    var mailOptions = {
      from: 'toalaa9@gmail.com',
      to: email,
      subject: subject,
      text: text,
    };
    console.log(mailOptions);
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
    
};

module.exports = sendEmail;