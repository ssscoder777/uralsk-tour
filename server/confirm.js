const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Путь к базе
const dbPath = path.join(__dirname, 'db', 'codes.sqlite3');
const db = new sqlite3.Database(dbPath);

// Проверка кода
function verifyCode(email, code, callback) {
  db.get(
    'SELECT * FROM confirm_codes WHERE email = ? AND code = ?',
    [email, code],
    (err, row) => {
      if (err) {
        console.error('Ошибка при проверке кода:', err);
        return callback(err);
      }

      if (row) {
        console.log('Код подтверждён для:', email);
        return callback(null, true);
      } else {
        console.log('Неверный код для:', email);
        return callback(null, false);
      }
    }
  );
}

module.exports = { verifyCode };
