const Product = require('../../models/product.model.js');
// nhungs file chứ liệu
// [GET] /products
module.exports.index = async (req, res) =>{
    const products = await Product.find({
        status:"active", // tìm kiếm với dữ liệu có status active, deleted flase
        deleted: false,
    }).sort({position: "desc"});
    // có thể sử dụng forEach thay vì map
    const newProducts = products.map(item => {
        item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
        return item;
    });
    // console.log(newProducts);
    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        // trả về dữ liệu của newProducts vào biến products cho view index
        products: newProducts,
    });
}

module.exports.detail = async (req, res) =>{
    try{
        const find ={
            deleted: false,
            slug: req.params.slug,
            status: "active",
        }
        const product = await Product.findOne(find);
        //  console.log(req.params.slug);
    
        res.render("client/pages/products/detail",{
            pageTitle: product.title,
            product: product
        });
    }catch(e) {
        res.redirect(`/products`);
    }
    
}