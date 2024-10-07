// sử dụng module.exports để xuất file khi require ở file chính cũng như file khác 
// truyền biến app vào để sd tại vì app đc khai báo bên index.js dc gọi thôi
// đường link trên URL
const productRouter = require('./product.router');
const homeRouter = require('./home.router');
// truyền biến app vào để sử dụng router
module.exports = (app) => { 
    // url => trống 
    app.use('/', homeRouter);
    // url/products => đi vào create, edi   t
    app.use('/products', productRouter);
}