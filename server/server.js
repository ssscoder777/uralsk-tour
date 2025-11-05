const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { registerUser, confirmEmail, loginUser } = require('./auth');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  res.json(registerUser(name, email, password));
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  res.json(loginUser(email, password));
});

app.get('/confirm', (req, res) => {
  const result = confirmEmail(req.query.token);
  res.send(result.ok ? 'Email подтверждён!' : 'Ошибка подтверждения');
});

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
