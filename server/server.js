const { sendCode } = require('./mailer');
const { verifyCode } = require('./confirm');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { registerUser, confirmEmail, loginUser } = require('./auth');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
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

// ✅ Важно: слушать PORT от Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
app.post('/api/send-code', async (req, res) => {
    const { email } = req.body;
    try {
        await sendCode(email);
        res.send('Код отправлен на почту');
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при отправке письма');
    }
});
app.post('/api/verify-code', (req, res) => {
    const { email, code } = req.body;
    verifyCode(email, code, (err, valid) => {
        if (err) return res.status(500).send('Ошибка');
        if (valid) return res.send('Код подтверждён');
        res.status(400).send('Неверный код');
    });
});
