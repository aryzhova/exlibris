const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

// /add-book GET request
router.get('/add-book', adminController.getAddBook);

// /add-book POST request
router.post('/add-book', adminController.postAddBook);

// /pastdue GET request
router.get('/pastdue', adminController.getPastDue);

// /holds GET request
router.get('/holds', adminController.getHolds);

module.exports = router;

