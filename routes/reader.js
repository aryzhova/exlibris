const express = require('express');
const readerController = require('../controllers/reader');

const router = express.Router();

// / GET request
router.get('/', readerController.getIndex);

// /search GET request
router.get('/search', readerController.getSearch);

// /my-requests GET request
router.get('/my-requests', readerController.getMyRequests);

// /history GET request
router.get('/history', readerController.getHistory);



module.exports = router;