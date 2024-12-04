// gọi foder để sd biến 
const systemConfig = require("../../config/system")
// sử dụng module.exports để xuất file khi require ở file chính cũng như file khác 
// truyền biến app vào để sd tại vì app đc khai báo bên index.js dc gọi thôi
// đường link trên URL
const authMiddleware = require('../../middlewares/admin/auth.middleware');
const dashboardRouter = require('./dashboard.router.js');
const productRouter = require('./product.router.js');
const recycleBinRouter = require('./recycleBin.router.js');
const productCategoryRouter = require('./products-category.router.js');
const roleRouter = require('./role.router.js');
const accountRouter = require('./account.router.js');
const authRouter = require('./auth.router.js');
const myAccountRouter = require('./my-account.route.js');
const settingRouter = require('./setting.router.js');
const articleCategoryRouter = require('./articles-category.router.js');
module.exports = (app) => { 
    const PATH_ADMIN = systemConfig.prefixAdmin;
    // url => trống 
    app.use(
        PATH_ADMIN + '/dashboard',
        authMiddleware.requireAuth,
        dashboardRouter
    );
    app.use(PATH_ADMIN + '/products',authMiddleware.requireAuth, productRouter);
    app.use(PATH_ADMIN + '/recycleBin',authMiddleware.requireAuth, recycleBinRouter);
    app.use(PATH_ADMIN + '/products-category',authMiddleware.requireAuth, productCategoryRouter);
    app.use(PATH_ADMIN + '/roles',authMiddleware.requireAuth, roleRouter);
    app.use(PATH_ADMIN + '/accounts',authMiddleware.requireAuth, accountRouter);
    app.use(PATH_ADMIN + '/auth', authRouter);
    app.use(PATH_ADMIN + '/my-account', authMiddleware.requireAuth, myAccountRouter);
    app.use(PATH_ADMIN + '/settings',authMiddleware.requireAuth, settingRouter);
    app.use(PATH_ADMIN + '/articles-category',authMiddleware.requireAuth, articleCategoryRouter);
    
}