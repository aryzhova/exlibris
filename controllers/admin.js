const mongoose = require("mongoose");
const Book = require('../models/book');

exports.getAddBook = (req, res, next) => {
  res.render('admin/add-book', {
    pageTitle: 'Add Book',
    isAuthentiacated: req.session.isAuthenticated
  });
}

exports.postAddBook = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const year = req.body.year;
  const description = req.body.description;

  const book = new Book({
    title: title,
    author: author,
    year: year,
    imageUrl: null, 
    description: description,
    isAvailable: true,
    queue: []
  });

  book.save()
      .then(result => {
        console.log("Book added");
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
}

exports.getPastDue = (req, res, next) => {
  res.render('admin/pastdue', { 
    pageTitle: 'Items past due',
    isAuthentiacated: req.session.isAuthenticated
  });
}

exports.getHolds = (req, res, next) => {
  res.render('admin/holds', {
    pageTitle: 'Holds',
    isAuthentiacated: req.session.isAuthenticated
  });
}