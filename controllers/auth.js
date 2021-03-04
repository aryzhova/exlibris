const crypto = require('crypto'); //library we are using to generate secure token

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

exports.getResetPassword = (req, res, next) => {
  res.render('auth/reset', {
    pageTitle: 'Password reset',
    isAuthenticated: req.session.isAuthenticated,
    isAdmin: req.session.isAdmin,
    path: '/reset'
  });
};

exports.postResetPassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if(err) {
      console.log(err);
      return res.redirect('/reset');
    }

    const token = buffer.toString('hex');  //token storing hexadecimal characters
    User.findOne({ email: req.body.email })
      .then(user => {
        if(!user) {
          return res.redirect('/reset-password');
        }
        user.resetToken = token;
        user.resetTokenExpire = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'anastasiawarm@gmail.com',
          subject: 'Exlibris Password Reset',
          html: `
            <p>You requested password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password</p>
            `
        })
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpire: {$gt: Date.now()}})
    .then(user => {
      res.render('auth/new-password', {
        pageTitle: 'New Password',
        isAuthenticated: req.session.isAuthenticated,
        isAdmin: req.session.isAdmin,
        path: '/new-password',
        userId: user._id,
        passwordToken: token
      });
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postNewPassword = (req, res, next) => {
  const password = req.body.password;
  const userId = req.body.userId;
  const token = req.body.passwordToken;
  let updatedUser;

  User.findOne({
    resetToken: token, 
    resetTokenExpire: {$gt: Date.now() },
    _id: userId
  })
  .then(user => {
    updatedUser = user;
    return bcrypt.hash(password, 12);
  })
  .then(hashedPassword => {
    console.log('user', updatedUser);
    updatedUser.password = hashedPassword;
    updatedUser.resetToken = undefined;
    updatedUser.resetTokenExpire = undefined;
    return updatedUser.save();
  })
  .then(result => {
    res.redirect('/login');
  })
  .catch(err => {
    console.log(err);
  })
}