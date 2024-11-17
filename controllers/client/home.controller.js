const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/product");

// [GET] /
// export hàm xử lí ra home.router.js
module.exports.index =async (req, res) =>{
    // Lấy ra sản phẩm nổi bật
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active",
    }).limit(6);
    const newProducts = productsHelper.priceNewProducts(productsFeatured);
    // lấy ra sản phẩm mới nhất
    const productsNew= await Product.find({
        deleted: false,
        status: "active",
    }).sort({position: "desc"}).limit(6);
    const newProductsNew = productsHelper.priceNewProducts(productsNew);
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productsFeatured : newProducts,
        productsNew: newProductsNew,
    });
}