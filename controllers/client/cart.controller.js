const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const productsHelper = require('../../helpers/product');
// [GET] /cart/
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId; // Lấy cartId từ cookie
    const cart = await Cart.findOne({
        _id: cartId
    });
    if(cart.products.length > 0) {
        for(const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id: productId,
            }).select("title thumbnail slug price discountPercentage");
            productInfo.priceNew = productsHelper.priceNewProduct(productInfo);
            item.productInfo = productInfo;
            item.totalPrice = productInfo.priceNew * item.quantity;
        }
    }
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)
    // console.log(cart);
    res.render("client/pages/cart/index",{
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    });
};
// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) =>{
    const productId = req.params.productId; // Lấy productId từ URL
    const quantity = parseInt(req.body.quantity, 10); // Lấy quantity từ body
    const cartId = req.cookies.cartId; // Lấy cartId từ cookie
    // console.log(productId);
    // console.log(quantity);
    // console.log(cartId);
    const cart = await Cart.findOne({
        _id: cartId
    });
    const existProductInCart = cart.products.find(item => item.product_id == productId);
    // console.log(existProductInCart);
    if(existProductInCart){
        const quantityNew = quantity + existProductInCart.quantity;
        // console.log(quantityNew);
        await Cart.updateOne(
            {
                _id: cartId,
                "products.product_id": productId,

            },{
                $set: {
                    "products.$.quantity": quantityNew
                }
            }
        );
    }else{
        const objectCart = {
            product_id: productId,
            quantity: quantity
        };
        await Cart.updateOne(
            {
                _id: cartId,
                
            },{
                $push: {products: objectCart}
            }
        );
    }
    // const objectCart = {
    //     product_id: productId,
    //     quantity: quantity
    // }
   
    // req.flash("success"," Đã thêm sản phẩm vào giỏ hàng thành công");
    // res.send("OK");
    res.redirect("back");
};

// [GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    await Cart.updateOne(
        {
            _id: cartId,
            
        },{
            $pull: {products: {product_id: productId}}
        }
    );
    req.flash("success", "Đã xóa sản phẩm khỏi giỏ hành!");

    res.redirect("back");
};
// [GET] /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = req.params.quantity;

    await Cart.updateOne(
        {
            _id: cartId,
            "products.product_id": productId,
        },{
            $set: {
                "products.$.quantity": quantity,
            }
           
        }
    );
    req.flash("success", "Cập nhật số lượng thành công!");

    res.redirect("back");
};