const Book = require('../models/book');

exports.getIndex = (req, res, next) => {
  let allbooks;

  Book.find()
      .then(books => {
        res.render('index', {
          books: books,
          pageTitle: 'All books',
        });
      })
      .catch(err => {
        console.log();
      });
}

exports.getBookDetail = (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findById(bookId)
      .then(book => {
        res.render('book-detail', {
          pageTitle: 'Book Detail',
          book: book,
        });
      })
      .catch(err => {
        console.log(err);
      })

  
}
