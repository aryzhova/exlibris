const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.SENDGRID_API
  }
}));

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    isAuthenticated: req.session.isAuthenticated,
    isAdmin: req.session.isAdmin,
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
            if(user.role === "reader"){
              req.session.isAuthenticated = true;
            } else {
              req.session.isAdmin = true;
            }
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          res.redirect('/login');
        })
        
    })
    .catch(err => {
      console.log(err);
      res.redirect('/login');
    });
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
            role: "reader"
          });
  
          return user.save();
        })
        .then(result => {
          res.redirect('/login'); 
          return transporter.sendMail({
            to: email,
            from: 'anastasiawarm@gmail.com',
            subject: 'Exlibris signup',
            html: '<h1>You successfully created an account at exlibris.com! </h1>'
          })
          .catch(err => {
            console.log(err);
          });
         
        });
      })
      .catch(err => {
        console.log(err);
      })

};