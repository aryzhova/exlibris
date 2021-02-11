const express = require('express');
const libraryController = require('../controllers/library');

const router = express.Router();

// / GET request
router.get('/', libraryController.getIndex);

router.get('/login', (req, res) => {
  res.render('login', {pageTitle: 'Login'});
});

router.get('/:bookId', libraryController.getBookDetail);

module.exports = router;