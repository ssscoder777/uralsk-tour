require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function sendMail(to, text) {
  transporter.sendMail({
    from: 'Туризм в Уральске <' + process.env.EMAIL_USER + '>',
    to,
    subject: 'Подтверждение регистрации',
    text
  });
}

module.exports = sendMail;
