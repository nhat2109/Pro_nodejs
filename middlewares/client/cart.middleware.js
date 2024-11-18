const Cart = require("../../models/cart.model");
module.exports.cartId = async (req, res, next) => {
    // console.log(req.cookies.cartId);
    if(!req.cookies.cartId){
        const cart = new Cart();
        await cart.save();
        // console.log(cart);
        const expiresCookie = 165 * 24 * 60 * 60 * 1000;
        res.cookie("cartId", cart.id,{
            expires: new Date(Date.now() + expiresCookie), // 15 minutes
            httpOnly: true, 
        });
    }else{
        const cart = await Cart.findOne({
            _id: req.cookies.cartId,
            
        });
         // Kiểm tra nếu `cart` hoặc `cart.products` không tồn tại
         if (cart && Array.isArray(cart.products)) {
            cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        } else {
            cart.totalQuantity = 0; // Không có sản phẩm nào, số lượng là 0
        }
        res.locals.miniCart = cart;
    }
    next();
}
