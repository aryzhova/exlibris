const express = require('express');
const { check } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.post(
  '/signup', 
  [check('email')
    .isEmail()
    .withMessage("Please enter a valid email"), 
   check('password', 'Password should be at least 6 characters long')
    .isLength({ min: 6 })
  ],
  authController.postSignup);

router.get('/reset-password', authController.getResetPassword);

router.post('/reset-password', authController.postResetPassword);

router.get('/reset/:token', authController.getNewPassword); 

router.post('/new-password', authController.postNewPassword);

module.exports = router;


