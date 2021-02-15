const express = require('express');
const readerController = require('../controllers/reader');

const router = express.Router();

// /search GET request
router.get('/search', readerController.getSearch);

// /my-requests GET request
router.get('/my-requests', readerController.getMyRequests);

router.post('/request-book', readerController.postRequest);

// /history GET request
router.get('/history', readerController.getHistory);

module.exports = router;