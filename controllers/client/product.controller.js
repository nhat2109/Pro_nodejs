const Product = require('../../models/product.model.js');
const productsHelper = require("../../helpers/product");
const productsCategoryHelper = require("../../helpers/products-category.js");
const ProductCategory = require('../../models/product-category.model.js');

// nhungs file chứ liệu
// [GET] /products
module.exports.index = async (req, res) =>{
    const products = await Product.find({
        status:"active", // tìm kiếm với dữ liệu có status active, deleted flase
        deleted: false,
    }).sort({position: "desc"}).limit(12);
    // có thể sử dụng forEach thay vì map
    const newProducts = productsHelper.priceNewProducts(products);
    // console.log(newProducts);
    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        // trả về dữ liệu của newProducts vào biến products cho view index
        products: newProducts,
    });
}
// [GET] /products/detail/
module.exports.detail = async (req, res) =>{
    try{
        const find ={
            deleted: false,
            slug: req.params.slugProduct,
            status: "active",
        }
        const product = await Product.findOne(find);
        //  console.log(req.params.slug);
        if(product.product_category_id){
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                status: "active",
                deleted: false,
            });
            product.category = category;
        }
        product.priceNew = productsHelper.priceNewProduct(product);
        res.render("client/pages/products/detail",{
            pageTitle: product.title,
            product: product
        });
    }catch(e) {
        res.redirect(`/products`);
    }
    
}
// [GET] /products/:slugCategory
module.exports.category = async (req, res) =>{
    // console.log(req.params.slugCategory);
    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory,
        status: "active",
        deleted: false,
    });
    
    const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);
    const listSubCategoryId = listSubCategory.map(item => item.id);
    // console.log(listSubCategoryId);
    const products = await Product.find({
        product_category_id: {$in: [category.id, ...listSubCategoryId]},
        deleted: false,
    }).sort({position: "desc"});
    // console.log(newProducts);
    const newProducts = productsHelper.priceNewProducts(products);
    res.render("client/pages/products/index", {
        pageTitle: category.title,
        // trả về dữ liệu của newProducts vào biến products cho view index
        products: newProducts,
    });
}