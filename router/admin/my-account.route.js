const express = require('express');
const multer = require('multer');
// trong express có Router sau đó tạo biến để exports
const router = express.Router();
const upload = multer();
const controller = require('../../controllers/admin/my-account.controller.js');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware.js');
router.get('/', controller.index); // gọi ra hàm 
router.get('/edit', controller.edit); // gọi ra hàm 
router.patch('/edit', 
    upload.single('avatar'),
    uploadCloud.upload,
    controller.editPatch); // gọi ra hàm 
module.exports = router;