const express = require('express');
const adminController = require('../controllers/admin');
const isAdmin = require('../middleware/is-admin');

const router = express.Router();

// /add-book GET request
router.get('/add-book', isAdmin, adminController.getAddBook);

// /add-book POST request
router.post('/add-book', isAdmin, adminController.postAddBook);

// /pastdue GET request
router.get('/pastdue',isAdmin, adminController.getDueItems);

// /holds GET request
router.get('/holds', isAdmin, adminController.getHolds);

// /issue-book POST route
router.post('/issue-book', isAdmin, adminController.postIssueBook);

router.post('/return-book', isAdmin, adminController.postReturnBook);

module.exports = router;

