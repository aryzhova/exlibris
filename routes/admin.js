const express = require('express');

const router = express.Router();
 
// /admin/add-book GET request
router.get('/add-book', (req, res) => {
  res.render('admin/add-book', { pageTitle: 'Add Book'});
});

// /admin/add-book POST request
router.post('/add-book', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

router.get('/pastdue', (req, res) => {
  console.log(req.body);
  res.render('admin/pastdue', { pageTitle: 'Items past due'});
});

module.exports = router;

