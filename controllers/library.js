const Book = require('../models/book');

exports.getIndex = (req, res, next) => {
 
  Book.find()
      .then(books => {
        res.render('index', {
          books: books,
          pageTitle: 'All books',
          isAuthenticated: req.session.isAuthenticated,
          isAdmin: req.session.isAdmin,
          csrfToken: req.csrfToken(),
          path: '/'
        });
      })
      .catch(err => {
        console.log();
      });
}

exports.getBookDetail = (req, res, next) => {
  const bookId = req.params.bookId;
  let confirm = req.flash('confirm');
  if(confirm){
    confirm=confirm[0];
  } else {
    confirm = null;
  }
  let error = req.flash('error');
  if(error){
    error = error[0];
  } else {
    error = null;
  }

  Book.findById(bookId)
      .then(book => {
        res.render('book-detail', {
          pageTitle: 'Book Detail',
          book: book,
          isAuthenticated: req.session.isAuthenticated,
          isAdmin: req.session.isAdmin,
          confirmMessage: confirm,
          errorMessage: error,
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
  } else {
    Book.find({  "author": { "$regex": keyword, "$options": "i" }})
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
