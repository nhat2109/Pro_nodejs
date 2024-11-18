const express = require('express')
// trong express có Router sau đó tạo biến để exports
const router = express.Router();

const controller = require('../../controllers/client/checkout.controller.js');
router.get('/', controller.index);
router.post('/order', controller.order);
router.get('/success/:orderId', controller.success);
module.exports = router;