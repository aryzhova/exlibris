const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', {pageTitle: 'Login'});
});

router.get('/:bookId', (req, res)=> {
  res.render('book-detail', {pageTitle: 'Book Detail'});
})

module.exports = router;