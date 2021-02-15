//installed express, nodemon, body-parser, ejs, mongodb driver, mongoose, express-session, connect-flash, express-session, connect-mongodb-session

const express = require('express');
const app = express();  

const path = require('path');
const favicon = require('serve-favicon');
const flash = require('connect-flash');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6o43l.mongodb.net/exlibris?retryWrites=true&w=majority`;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true})); //middleware parsing the body of the request
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: false,
  store: store
}));

const adminRoutes = require('./routes/admin'); //importing routes
const readerRoutes = require('./routes/reader');
const libraryRoutes = require('./routes/library');
const authRoutes = require('./routes/auth');

app.use(express.static(__dirname + '/public')); //public directory serving static files

app.set('view engine', 'ejs'); // setting ejs as templating engine
app.set('views', 'views');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(flash());


app.use(adminRoutes);
app.use(readerRoutes);
app.use(authRoutes);
app.use(libraryRoutes);

app.use((req, res) => {
  res.status(404).render('404', {pageTitle: 'Page not found', isAuthentiacated: req.isAuthentiacated});
});

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(process.env.PORT || 3000);
    console.log('Connected!');
  })
  .catch(err => {
    console.log(err);
  });