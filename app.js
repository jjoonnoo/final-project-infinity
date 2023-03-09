const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const router = require('./routes');
const authRouter = require('./routes/auth.route');

require('dotenv').config();
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('layout extraScripts', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(express.static('public'));

app.use('/auth', authRouter);

app.listen(process.env.PORT, function () {
    console.log(`http://localhost:${process.env.PORT}/`);
});
