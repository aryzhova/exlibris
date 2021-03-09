const express = require('express');
const libraryController = require('../controllers/library');

const router = express.Router();

// / GET request
router.get('/', libraryController.getIndex);

router.get('/book/:bookId', libraryController.getBookDetail);

router.get('/search', libraryController.getSearch);

router.post('/search', libraryController.postSearch);

module.exports = router;