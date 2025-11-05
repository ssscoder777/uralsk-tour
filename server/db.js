const Database = require('better-sqlite3');
const db = new Database('uralsk.db');

// Создаём таблицы, если их нет
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    confirmed INTEGER DEFAULT 0,
    token TEXT
  );

  CREATE TABLE IF NOT EXISTS forum (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS ratings (
    place TEXT,
    stars INTEGER
  );
`);

module.exports = db;
