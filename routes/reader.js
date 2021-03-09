const express = require('express');
const readerController = require('../controllers/reader');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/my-requests', isAuth,  readerController.getMyRequests);

router.post('/cancel-request', isAuth, readerController.postcancelRequest);

router.post('/request-book', isAuth, readerController.postRequest);

router.get('/history', isAuth, readerController.getHistory);

module.exports = router;