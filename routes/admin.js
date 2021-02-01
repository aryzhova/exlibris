const express = require('express');

const router = express.Router();

router.get('/add-book', (req, res) => {
  res.send('<form action="/book" method="POST"><input type="text" name="title"><button type="submit">submit</button></form>');
});

router.post('/book', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;

