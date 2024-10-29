const express = require('express');
const multer = require("multer");
// trong express có Router sau đó tạo biến để exports
const router = express.Router();
const storageMulter = require('../../helpers/storageMulter');
const upload = multer({storage: storageMulter()});
const controller = require('../../controllers/admin/product.controller');
const validate = require('../../validates/admin/product.validate');
router.get('/', controller.index); // gọi ra hàm index
router.patch('/change-status/:status/:id', controller.changeStatus); // gọi ra hàm changeStatus
router.patch('/change-multi', controller.changeMulti); // gọi ra hàm changeStatus
router.delete('/delete/:id', controller.deleteItem);
router.get('/create', controller.create);
router.post('/create', 
    upload.single("thumbnail"),
    validate.createPost,
    controller.createPost
);
router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', 
    upload.single("thumbnail"),
    validate.createPost,
    controller.editPatch
);

router.get('/detail/:id', controller.detail);
module.exports = router;