const Product = require("../../models/product.model");


// [GET] /
// export hàm xử lí ra home.router.js
module.exports.index =async (req, res) =>{
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active",
    });
    console.log(productsFeatured);
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productsFeatured : productsFeatured
    });
}