const express = require('express');
const adminController = require('../controllers/admin');
const isAdmin = require('../middleware/is-admin');

const router = express.Router();

// /add-book GET request
router.get('/add-book', isAdmin, adminController.getAddBook);

// /add-book POST request
router.post('/add-book', isAdmin, adminController.postAddBook);

// /pastdue GET request
router.get('/pastdue',isAdmin, adminController.getPastDue);

// /holds GET request
router.get('/holds', isAdmin, adminController.getHolds);

router.post('/issue-book', isAdmin, adminController.postIssueBook);

module.exports = router;

