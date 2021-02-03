//installed express, nodemon, body-parser, ejs

const express = require('express');

const app = express();  

const adminRoutes = require('./routes/admin'); //importing admin routes
const readerRoutes = require('./routes/reader');

const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public')); //public directory serving static files

app.set('view engine', 'ejs'); // setting ejs as templating engine
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false})); //middleware parsing the body of the request

app.use(adminRoutes);
app.use(readerRoutes);

app.use((req, res) => {
  res.status(404).render('404', {pageTitle: 'Page not found'});
});

app.listen(3000);