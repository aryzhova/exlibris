const express = require('express');
const libraryController = require('../controllers/library');

const router = express.Router();

// / GET request
router.get('/', libraryController.getIndex);

router.get('/book/:bookId', libraryController.getBookDetail);

module.exports = router;