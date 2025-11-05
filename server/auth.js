const db = require('./db');
const { v4: uuidv4 } = require('uuid');
const sendMail = require('./mailer');

function registerUser(name, email, password) {
  const token = uuidv4();
  try {
    db.prepare(`INSERT INTO users (name, email, password, token) VALUES (?, ?, ?, ?)`)
      .run(name, email, password, token);
    sendMail(email, `Подтвердите регистрацию: http://localhost:3000/confirm?token=${token}`);
    return { ok: true };
  } catch {
    return { ok: false, error: 'Email уже зарегистрирован' };
  }
}

function confirmEmail(token) {
  const user = db.prepare(`SELECT * FROM users WHERE token = ?`).get(token);
  if (!user) return { ok: false };
  db.prepare(`UPDATE users SET confirmed = 1 WHERE id = ?`).run(user.id);
  return { ok: true };
}

function loginUser(email, password) {
  const user = db.prepare(`SELECT * FROM users WHERE email = ? AND password = ?`).get(email, password);
  if (!user) return { ok: false, error: 'Неверные данные' };
  if (!user.confirmed) return { ok: false, error: 'Email не подтверждён' };
  return { ok: true, name: user.name };
}

module.exports = { registerUser, confirmEmail, loginUser };
