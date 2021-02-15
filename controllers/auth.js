const Book = require('../models/book');

exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.render('auth/login', {
    pageTitle: 'Login',
    isAuthenticated: req.session.isAuthenticated
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isAuthenticated = true;
  res.redirect('/');
};