const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.render('auth/login', {
    pageTitle: 'Login',
    isAuthenticated: req.session.isAuthenticated,
    path: '/login'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email})
    .then(user => {
      if(!user) {
        return res.redirect('/login');
      }

      bcrypt.compare(password, user.password)
        .then(passwordsMatch => {
          if(passwordsMatch){
            req.session.isAuthenticated = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            })
          }
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy( err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.postSignup = (req, res, next) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;
    const password = req.body.password;

    //checking if the user already exists in db
    User
      .findOne({ email: email})
      .then(userDoc => {
        if(userDoc) {
          return res.redirect('/login')
        }

        return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            pendingRequests: []
          });
  
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        });
      })
      .catch(err => {
        console.log(err);
      })

};