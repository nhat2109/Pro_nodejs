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
// [GET /products-category/edit/:id
module.exports.edit = async (req, res) => {
  try{
    const id = req.params.id;
  const data = await ProductCategory.findOne({
    _id: id,
    deleted: false,
  });
  const records = await ProductCategory.find({
    deleted: false,
  });
  const newRecords = createTreeHelper.tree(records);
  // console.log(data);
    res.render('admin/pages/products-category/edit', {
      pageTitle: 'Sửa danh mục sản phẩm',
      data: data,
      records: newRecords,
    });
  }catch(e)
  {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }
};
 // [GET] /admin/products-category/edit/:id
 module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
  await ProductCategory.updateOne({
    _id: id,
  }, req.body);
  res.redirect('back');
};

 // [GET] /admin/products-category/detail/:id
 module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const data = await ProductCategory.findOne({
    _id: id,
    deleted: false,
  });
  const records = await ProductCategory.find({
    deleted: false,
  });
  const newRecords = createTreeHelper.tree(records);

  res.render('admin/pages/products-category/detail', {
    pageTitle: 'Chi tiết danh mục sản phẩm',
    data: data,
    records: newRecords,
  });
};

// [DELETE] /admin/products-category/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await ProductCategory.updateOne(
      {_id: id}
      ,{
          deleted: true,
          deletedAt: new Date()
      }); 
  req.flash("success", `Đã xóa thành công sản phẩm`);
  // console.log(req.params);
  res.redirect("back");
}
// end delete item
