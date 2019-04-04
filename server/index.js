const express = require('express');
require('dotenv').config();
const session = require('express-session');
const massive = require('massive');

const app = express();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db tá lá');
})

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    },
}));

app.listen(SERVER_PORT, () => {
    console.log(`o servidor tá correndo aqui: ${SERVER_PORT}`);
});