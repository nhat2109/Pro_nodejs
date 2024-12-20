const express = require('express');
const multer = require("multer");

// trong express có Router sau đó tạo biến để exports
const router = express.Router();

// const storageMulter = require('../../helpers/storageMulter');
const upload = multer();
const controller = require('../../controllers/admin/product.controller');
const validate = require('../../validates/admin/product.validate');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');
router.get('/', controller.index); // gọi ra hàm index
router.patch('/change-status/:status/:id', controller.changeStatus); // gọi ra hàm changeStatus
router.patch('/change-multi', controller.changeMulti); // gọi ra hàm changeStatus
router.get('/create', controller.create);
router.post('/create', 
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);
router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', 
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch
);
router.delete('/delete/:id', controller.deleteItem);
router.get('/detail/:id', controller.detail);
module.exports = router;