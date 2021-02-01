//installed express, nodemon, body-parser

const express = require('express');

const app = express();  

const adminRoutes = require('./routes/admin'); //importing admin routes
const readerRoutes = require('./routes/reader');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false})); //middleware parsing the body of the request

app.use(adminRoutes);
app.use(readerRoutes);

app.listen(3000);