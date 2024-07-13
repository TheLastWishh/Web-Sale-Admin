const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const session = require('express-session');
const engine = handlebars.engine;
const port = 3000;

const route = require('./routes');

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 1200000},
    })
);

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
