const express = require('express')
// trong express có Router sau đó tạo biến để exports
const router = express.Router();

const controller = require('../../controllers/client/cart.controller.js');
router.get('/', controller.index);
router.post('/add/:productId', controller.addPost);
router.get('/delete/:productId', controller.delete);
router.get('/update/:productId/:quantity', controller.update);
module.exports = router;