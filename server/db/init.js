const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./server/db/codes.sqlite3');

db.run(`
  CREATE TABLE IF NOT EXISTS confirm_codes (
    email TEXT NOT NULL,
    code TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
