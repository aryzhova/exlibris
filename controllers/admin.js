const mongoose = require("mongoose");
const { rawListeners } = require("../models/book");
const Book = require('../models/book');
const Request = require('../models/request');

exports.getAddBook = (req, res, next) => {
  res.render('admin/add-book', {
    pageTitle: 'Add Book',
    isAuthenticated: req.session.isAuthenticated,
    isAdmin: req.session.isAdmin,
    path: '/add-book'
  });
}

exports.postAddBook = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const image = req.file;
  const year = req.body.year;
  const description = req.body.description;

  console.log(image);

  const book = new Book({
    title: title,
    author: author,
    year: year,
    imageUrl: image.path, 
    description: description,
    isAvailable: true,
    queue: []
  });

  book.save()
      .then(result => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
}

exports.getDueItems = (req, res, next) => {
  Request.find({ isPending: false, returned: null })
    .then(dueBooks => {
      console.log('due books', dueBooks);
      res.render('admin/items-due', { 
        pageTitle: 'Items due',
        isAuthenticated: req.session.isAuthenticated,
        isAdmin: req.session.isAdmin,
        path: '/pastdue',
        dueBooks: dueBooks
      });
    })
}

exports.getHolds = (req, res, next) => {

  Request.find({ isPending: true })
    .then(holds => {
      res.render('admin/holds', {
        pageTitle: 'Holds',
        isAuthenticated: req.session.isAuthenticated,
        isAdmin: req.session.isAdmin,
        path: '/holds',
        holds: holds
      });
    })
}

exports.postIssueBook = (req, res, next) => {
  const bookId = req.body.bookId;
  const readerId = req.body.userId;
  let issuedBook;

  Book.findById(bookId)
    .then(book => {
      issuedBook = book;
      book.isAvailable = false;
      book.borrowedBy = readerId;

      //deleting reader from the queue
      let newQueue = book.queue.users.filter(user => {
        return user._id.toString() !== readerId;
      });
      book.queue.users = newQueue;
      book.save(); 
    })
    .then(result => {
      Request.findOne({ userId: readerId, bookId: issuedBook._id})
        .then(request => {
          request.isPending = false;
          request.dueDate = new Date().setDate(new Date().getDate()+14);
          request.save()
            .then(result=> {
              req.flash('confirm', `The book has been issued!` );
              res.redirect(`/book/${bookId}`);
            })
        })
    })
    .catch(err => {
      console.log(err);
    })

}

exports.postReturnBook = (req, res, next) => {
  const bookId = req.body.bookId;
  const readerId = req.body.borrowedBy;
  let returnedBook;

  Book.findById(bookId)
    .then(book => {
      returnedBook = book;
      book.isAvailable = true;
      book.borrowedBy = null;
      book.save(); 
    })
    .then(result => {
      Request.findOne({ userId: readerId, bookId: bookId })
        .then(request => {
          request.dueDate = new Date();
          request.returned = true;
          request.save()
            .then(result=> {
              req.flash('confirm',"The book is returned");
              res.redirect(`/book/${bookId}`);
            })
        })
    })
    .catch(err => {
      console.log(err);
    })
}