const categoryMiddleware = require('../../middlewares/client/category.middleware');
const cartMiddleware = require('../../middlewares/client/cart.middleware');
const userMiddleware = require('../../middlewares/client/user.middleware');
const settingMiddleware = require('../../middlewares/client/setting.middleware');
// sử dụng module.exports để xuất file khi require ở file chính cũng như file khác 
// truyền biến app vào để sd tại vì app đc khai báo bên index.js dc gọi thôi
// đường link trên URL
const productRouter = require('./product.router');
const homeRouter = require('./home.router');
const searchRouter = require('./search.router');
const cartRouter = require('./cart.router');
const checkoutRouter = require('./checkout.router');
const userRouter = require('./user.router');
// truyền biến app vào để sử dụng router
module.exports = (app) => { 
    // url => trống 
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.settingGeneral);
    app.use('/', homeRouter);
    // url/products => đi vào create, edi   t
    app.use('/products', productRouter);
    app.use('/search', searchRouter);
    app.use('/cart', cartRouter);
    app.use('/checkout', checkoutRouter);
    app.use('/user', userRouter);
}