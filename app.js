if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const ConnectDB = require('./server/config/db');
const passport = require('passport'); // Ensure passport is imported from 'passport'
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const initializePassport = require('./server/config/passport_config');
dotenv.config();

const port = 9922;

app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(flash());

ConnectDB();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || "mongodb+srv://Elviznc:Ngwudalu12345.@notehub.ebn6j.mongodb.net/"
  }),
}));

initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./server/routes/google.js'));
app.use('/', require('./server/routes/mainroutes.js'));
app.use('/auth', require('./server/routes/jwt.js'));
app.use('/user', require('./server/routes/login.js'));


app.get('*', (req, res) => {
  res.status(404).send('404');
});


app.listen(port, () => {
  console.log(`Quicklo App listening at http://localhost:${port}`);
});