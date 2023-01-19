const nodemailer = require('nodemailer');
const mailer = ({email, OTP}) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'rajat.chugh@hashstudioz.com',
      pass: 'Rajat2711@#',
    },
  });
  var mailoptions = {
    from: 'rajatchugh7898@gmail.com',
    to: email,
    subject: 'testing purpose mail otp is :',
    html: '<h3>Your Otp is :' + OTP + '</h3>',
    text: 'testing',
  };
  transporter.sendMail(mailoptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log('email has been sent successfully', info.response);
    }
  });
};

module.exports = { mailer };
