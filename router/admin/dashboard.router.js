const express = require('express')
// trong express có Router sau đó tạo biến để exports
const router = express.Router();
const controller = require('../../controllers/admin/dashboard.controller');
router.get('/', controller.dashboard); // gọi ra hàm dashboard
// router.get('/create', controller.create);
// router.get('/edit', controller.edit);
module.exports = router;