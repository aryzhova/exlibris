const express = require('express');
const readerController = require('../controllers/reader');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/search', readerController.getSearch);

router.get('/my-requests', isAuth,  readerController.getMyRequests);

router.post('/cancel-request', isAuth, readerController.postcancelRequest);

router.post('/request-book', readerController.postRequest);

router.get('/history', readerController.getHistory);

module.exports = router;