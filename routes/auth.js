const express = require('express');
const { check } = require('express-validator/check');
const User = require('../models/user');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', 
[ 
  check('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Please enter a correct email'),
  check('password')
    .notEmpty()
    .withMessage('Password cannot be empty') 
],
authController.postLogin);

router.post('/logout', authController.postLogout);

router.post(
  '/signup', 
  [
    check('first', "First name is required").notEmpty(),
    check('last', "Last name is required").notEmpty(),
    check('email')
     .isEmail()
     .withMessage("Please enter a valid email")
     .custom((value, {req})=> {
       return User
       .findOne({ email: value })
       .then(userDoc => {
         if(userDoc) {
          return Promise.reject("Email already exists");
        }
       })
     }),
    check('password', 'Password should be at least 6 characters long')
    .isLength({ min: 6 })
  ],
  authController.postSignup);

router.get('/reset-password', authController.getResetPassword)

router.post('/reset-password', authController.postResetPassword);

router.get('/reset/:token', authController.getNewPassword); 

router.post('/new-password', authController.postNewPassword);

module.exports = router;


