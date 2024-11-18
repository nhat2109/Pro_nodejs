const express = require('express')
// trong express có Router sau đó tạo biến để exports
const router = express.Router();

const controller = require('../../controllers/client/search.controller.js');
router.get('/', controller.index);
module.exports = router;