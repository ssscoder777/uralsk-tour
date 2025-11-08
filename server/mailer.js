// server/mailer.js
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./server/db/codes.sqlite3');

async function sendCode(email) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  db.run('INSERT INTO confirm_codes (email, code) VALUES (?, ?)', [email, code]);

  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Uralsk Tour" <no-reply@uralsk.kz>',
    to: email,
    subject: 'Код подтверждения',
    html: `<p>Ваш код: <b>${code}</b></p>`,
  });

  console.log('Письмо отправлено:', nodemailer.getTestMessageUrl(info));
}

module.exports = { sendCode };
