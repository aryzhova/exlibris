const Book = require('../models/book');
const Request = require('../models/request');

exports.postRequest = (req, res, next) => {
  const bookId = req.body.bookId;

  Book.findById(bookId)
    .then(book => {
      const users = book.queue.users;

      //checking if user is already on a queue
      for(let i=0; i<users.length; i++){
        if(users[i]._id.toString() === req.session.user._id.toString()){
          return res.redirect('/my-requests');
        }
      }

      users.push(req.session.user);
      book.queue.users = users;
      return book.save();
    })
    .then(book => {
      const request = new Request({
        book: book,
        bookId: book._id,
        userId: req.session.user._id,
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

exports.postcancelRequest = (req, res, next) => {
  console.log(req.body);
  const requestId = req.body.requestId;
  let bookId;

  Request.findById(requestId)
    .then(request => {
      if(!request){
        return console.log("request not found");
      }
      bookId = request.book._id;
      return request.deleteOne({ _id: requestId });
    })
    .then(() => {
      return Book.findById(bookId);
    })
    .then(book => {
      console.log('users', book.queue.users);
      let newQueue = book.queue.users.filter(user => {
        return user._id.toString() !== req.session.user._id.toString();
      });
      book.queue.users = newQueue;
      book.save()
        .then(result => {
          res.redirect('/my-requests');
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getMyRequests = (req, res, next) => {
  let requests;

  Request.find({ userId: req.session.user._id, isPending: true })
    .then(requests => {
      res.render('reader/my-requests', {
        pageTitle: 'My Requests',
        requests: requests,
        isAuthenticated: req.session.isAuthenticated,
        isAdmin: req.session.isAdmin,
        path: '/my-requests'
      });
    })
};

exports.getHistory = (req, res, next) => {
  res.render('reader/history', {
    pageTitle: 'History',
    isAuthenticated: req.session.isAuthenticated,
    isAdmin: req.session.isAdmin,
    path: '/'
  });
}