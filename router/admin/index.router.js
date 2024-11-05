// gọi foder để sd biến 
const systemConfig = require("../../config/system")
// sử dụng module.exports để xuất file khi require ở file chính cũng như file khác 
// truyền biến app vào để sd tại vì app đc khai báo bên index.js dc gọi thôi
// đường link trên URL
const dashboardRouter = require('./dashboard.router.js');
const productRouter = require('./product.router.js');
const recycleBinRouter = require('./recycleBin.router.js');
const productCategoryRouter = require('./products-category.router.js');
const roleRouter = require('./role.router.js');
const accountRouter = require('./account.router.js');
const authRouter = require('./auth.router.js');

module.exports = (app) => { 
    const PATH_ADMIN = systemConfig.prefixAdmin;
    // url => trống 
    app.use(PATH_ADMIN + '/dashboard', dashboardRouter);
    app.use(PATH_ADMIN + '/products', productRouter);
    app.use(PATH_ADMIN + '/recycleBin', recycleBinRouter);
    app.use(PATH_ADMIN + '/products-category', productCategoryRouter);
    app.use(PATH_ADMIN + '/roles', roleRouter);
    app.use(PATH_ADMIN + '/accounts', accountRouter);
    app.use(PATH_ADMIN + '/auth', authRouter);
    
}