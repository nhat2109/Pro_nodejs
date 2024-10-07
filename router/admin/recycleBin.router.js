const express = require('express')
// trong express có Router sau đó tạo biến để exports
const router = express.Router();
const controller = require('../../controllers/admin/recycleBin.controller');
router.get('/', controller.index); // gọi ra hàm index
router.patch('/change-status/:status/:id', controller.changeStatus); // gọi ra hàm changeStatus
router.patch('/change-multi', controller.changeMulti); // gọi ra hàm changeStatus
router.delete('/delete/:id', controller.deleteItem);
router.patch('/restore/:id', controller.restoreItem);
// router.get('/create', controller.create);
// router.get('/edit', controller.edit);
module.exports = router;