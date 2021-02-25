const mongoose = require("mongoose");
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
  Request.find({ isPending: false })
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

  console.log("READERiD", readerId);

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
          console.log('found request', request);
          request.isPending = false;
          request.dueDate = new Date().setDate(new Date().getDate()+14);
          request.save()
            .then(result=> {
              res.redirect(`/book/${bookId}`);
            })
        })
    })
    .catch(err => {
      console.log(err);
    })

}