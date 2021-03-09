const Book = require('../models/book');

exports.getIndex = (req, res, next) => {
 
  Book.find()
      .then(books => {
        res.render('index', {
          books: books,
          pageTitle: 'All books',
          isAuthenticated: req.session.isAuthenticated,
          isAdmin: req.session.isAdmin,
          path: '/'
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
          isAuthenticated: req.session.isAuthenticated,
          isAdmin: req.session.isAdmin,
          path: '/'
        });
      })
      .catch(err => {
        console.log(err);
      })

  
}

exports.getSearch = (req, res, next) => {
  Book.find()
      .then(books => {
        res.render('search', {
          books: books,
          pageTitle: 'Search',
          isAuthenticated: req.session.isAuthenticated,
          isAdmin: req.session.isAdmin,
          path: '/search'
        });
      })
      .catch(err => {
        console.log();
      });
}

exports.postSearch = (req, res, next) => {
  const searchBy = req.body.searchBy;
  const keyword = req.body.keyword;

  if(searchBy === "title"){
    Book.find({  "title": { "$regex": keyword, "$options": "i" }})
      .then(books => {
        console.log(books);
        res.render('search', {
          books: books,
          pageTitle: 'Search',
          isAuthenticated: req.session.isAuthenticated,
          isAdmin: req.session.isAdmin,
          path: '/search'
        });
      })
      .catch(err => {
        console.log();
      });
  }
  
}
