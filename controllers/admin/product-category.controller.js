const ProductCategory = require('../../models/product-category.model')
const systemConfig = require('../../config/system');
const createTreeHelper = require('../../helpers/createTree');
 // [GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
 
  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records);
  // console.log(newRecords);
  res.render("admin/pages/products-category/index", 
  {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
};


 // [GET] /admin/products-category/create
 module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records);
  res.render("admin/pages/products-category/create", 
   {
      pageTitle: "Tạo danh mục sản phẩm",
      records: newRecords
   });
};


 // [GET] /admin/products-category/create
 module.exports.createPost = async (req, res) => {
 
  // lấy vị trí còn trống 
  if (req.body.position == "") {
    const countProducts = await ProductCategory.countDocuments();
    let newPosition = countProducts + 1;

    // Tìm vị trí còn trống
    const existingPositions = await ProductCategory.find({}).select('position');
    const usedPositions = existingPositions.map(ProductCategory => ProductCategory.position);
    
    while (usedPositions.includes(newPosition)) {
        newPosition++;
    }
    req.body.position = newPosition;
  } else {
      req.body.position = parseInt(req.body.position);
  }
  const record = new ProductCategory(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);

};
