const express = require('express')
// trong express có Router sau đó tạo biến để exports
const router = express.Router();
const controller = require('../../controllers/admin/product.controller');
router.get('/', controller.index); // gọi ra hàm index
router.patch('/change-status/:status/:id', controller.changeStatus); // gọi ra hàm changeStatus
router.patch('/change-multi', controller.changeMulti); // gọi ra hàm changeStatus
router.delete('/delete/:id', controller.deleteItem);
// router.get('/create', controller.create);
// router.get('/edit', controller.edit);
module.exports = router;