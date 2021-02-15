const Book = require('../models/book');

exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.render('auth/login', {
    pageTitle: 'Login',
    isAuthenticated: req.session.isAuthenticated,
    path: '/login'
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isAuthenticated = true;
  res.redirect('/');
};

exports.postLogout = (req, res, next) => {
  req.session.destroy( err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.postSignup = (req, res, next) => {
    res.redirect('/');
};