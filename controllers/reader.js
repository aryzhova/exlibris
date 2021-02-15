const Book = require('../models/book');

exports.getSearch = (req, res, next) => {
  res.render('search', {
    pageTitle: 'Search',
    isAuthentiacated: req.session.isAuthenticated
  });
}

exports.postRequest = (req, res, next) => {
  const bookId = req.body.bookId;

  Book.findById(bookId)
    .then(book => {
      const users = book.queue.users;
      users.push({ _id: '6026993d070288649645bf64'});
      book.queue.users = users;

      return book.save()
        .then(result => {
          console.log('you are on a queue');
          res.redirect(`/${bookId}`);
        })
    })
    .catch(err => {
      console.log(err);
    })

};

exports.getMyRequests = (req, res, next) => {
  res.render('reader/my-requests', {
    pageTitle: 'My Requests',
    isAuthentiacated: req.session.isAuthenticated
  });
}

exports.getHistory = (req, res, next) => {
  res.render('reader/history', {
    pageTitle: 'History',
    isAuthentiacated: req.session.isAuthenticated
  });
}