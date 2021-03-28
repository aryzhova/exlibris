const express = require('express');
const adminController = require('../controllers/admin');
const isAdmin = require('../middleware/is-admin');
const { body } = require('express-validator/check');

const router = express.Router();

// /add-book GET request
router.get('/add-book', isAdmin, adminController.getAddBook);

// /add-book POST request
router.post('/add-book', isAdmin, 
[
  body('title', 'Please enter book title')
    .notEmpty(),
  body('author', 'Please enter an author')
    .notEmpty(),
  body('year')
    .notEmpty()
    .withMessage('Please enter a year')
    .isNumeric()
    .withMessage('Year is not in a correct format')
    .custom((value) => {
      if(value <= 0 || value > new Date().getFullYear().toString()){
        throw new Error('Please enter correct value for the year');
      }
      return true;
    }),

],
adminController.postAddBook);

// /pastdue GET request
router.get('/pastdue',isAdmin, adminController.getDueItems);

// /holds GET request
router.get('/holds', isAdmin, adminController.getHolds);

// /issue-book POST route
router.post('/issue-book', isAdmin, adminController.postIssueBook);

router.post('/return-book', isAdmin, adminController.postReturnBook);

router.post('/notify-reader', isAdmin, adminController.postNotifyReader);

router.post('/delete-book', isAdmin, adminController.postDeleteBook);

module.exports = router;

