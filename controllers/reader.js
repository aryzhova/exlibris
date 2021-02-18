const Book = require('../models/book');
const Request = require('../models/request');

exports.getSearch = (req, res, next) => {
  res.render('search', {
    pageTitle: 'Search',
    isAuthenticated: req.session.isAuthenticated,
    path: '/search'
  });
}

exports.postRequest = (req, res, next) => {
  const bookId = req.body.bookId;

  Book.findById(bookId)
    .then(book => {
      const users = book.queue.users;
      users.push({ _id: '6026993d070288649645bf64'});
      book.queue.users = users;

      return book.save();
    })
    .then(book => {
      console.log('is it a book?', book);
      const request = new Request({
        book: book,
        userId: '6026993d070288649645bf64',
        startDate: new Date(),
        dueDate: new Date().setDate(new Date().getDate()+14),
        isPending: true
      });

      return request.save();
    })
    .then(() => {
      res.redirect(`/book/${bookId}`);
    })
    .catch(err => {
      console.log(err);
    })

};

exports.getMyRequests = (req, res, next) => {
  let requests;

  Request.find()
    .then(requests => {
      res.render('reader/my-requests', {
        pageTitle: 'My Requests',
        requests: requests,
        isAuthenticated: req.session.isAuthenticated,
        path: '/my-requests'
      });
    })
};

exports.getHistory = (req, res, next) => {
  res.render('reader/history', {
    pageTitle: 'History',
    isAuthenticated: req.session.isAuthenticated,
    path: '/'
  });
}