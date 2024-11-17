const express = require('express')
// trong express có Router sau đó tạo biến để exports
const router = express.Router();
const controller = require('../../controllers/client/product.controller');
router.get('/', controller.index);
router.get("/:slugCategory", controller.category);
router.get("/detail/:slugProduct", controller.detail);
// router.get('/create', controller.create);
// router.get('/edit', controller.edit);
module.exports = router;