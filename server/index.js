const express = require('express');
require('dotenv').config();
const session = require('express-session');
const massive = require('massive');
const ac = require('./controllers/authController');

const app = express();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('o bd tá lá tb');
});

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    },
}));

app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login)
app.get('/auth/logout', ac.logout)

app.listen(SERVER_PORT, () => {
    console.log(`o servidor tá correndo aqui: ${SERVER_PORT}`);
});