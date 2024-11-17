const ProductCategory = require('../../models/product-category.model')
const systemConfig = require('../../config/system');
const createTreeHelper = require('../../helpers/createTree');
const fillterStatusHelper = require('../../helpers/fillterStatus');
const searchHelper = require('../../helpers/search');
const Account = require('../../models/account.model');
 // [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const fillterStatus = fillterStatusHelper(req.query);
  let find = {
    deleted: false,
  };
  const objectSearch = searchHelper(req.query);
  if(req.query.status){
    find.status = req.query.status;
  }
  if(objectSearch.regex){
    find.title = objectSearch.regex;
  }
 
  const countProducts = await ProductCategory.countDocuments(find);
  // console.log(countProducts);
    // let objectPagination = paginationHelper(
    //     {
    //         currentPage: 1,
    //         limitItems: 4
    //     },
    //     req.query,
    //     countProducts
    // );
  //Sort  
  let sort ={};
  if(req.query.sortKey && req.query.sortValue){
      sort[req.query.sortKey] = req.query.sortValue;
  }else{
      sort.position= "desc";
  }
  const products_category = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(products_category);
  // console.log(newRecords);
  // Lấy tên tài khoản người tạo sản phẩm
  for (const product_category of products_category) {
    const user = await Account.findOne({
        _id: product_category.createdBy.account_id,
    });
    if(user) {
      product_category.accountFullName = user.fullName;
    }
    // Lấy thông tin người cập nhật gần nhất
    const updatedBy = product_category.updatedBy.slice(-1)[0];
    if(updatedBy){
        const userUpdated = await Account.findOne({
            _id: updatedBy.account_id,
        });
        updatedBy.accountFullName = userUpdated.fullName;
    }
}
  res.render("admin/pages/products-category/index", 
  {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
    fillterStatus: fillterStatus, // trả dữ liệu ra ...
    keyword:objectSearch.keyword,
    // pagination: objectPagination, 
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
 if(Permissions.includes("products-category_create")){
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
  req.body.createdBy = {
    account_id: res.locals.user.id
  };
  const record = new ProductCategory(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}else{
  res.send("403");
  return;
}
  

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
  try{
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }
    await ProductCategory.updateOne({_id: id,}, {
      ...req.body,
      $push: {updatedBy: updatedBy}
    });
    req.flash("success", `Đã sửa thành công danh mục sản phẩm`);
  } catch(err){
    req.flash("error", `Cập nhật thất bại`)
  }

  
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


//[PATCH] /change-status/:status/:id
// dùng async await để update lại 
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }
    await ProductCategory.updateOne({_id: id}, {
      status: status,
      $push: {updatedBy: updatedBy}
    }); 
    // console.log(req.params);
    res.redirect("back");
}
//[PATCH] /change-multi
// dùng async await để update lại 
module.exports.changeMulti = async (req, res) => {  
    const type = req.body.type;
    const ids = req.body.ids.split(', ');
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }
    switch (type) {
        case 'active':
            // await để sd cho mongodb trả về nhiều id cùng lúc nếu type là ative thì tất cả active
            await ProductCategory.updateMany({_id: { $in: ids }}, {$push: {updatedBy: updatedBy}, status: 'active' });
            break;
        case 'inactive': // ngược lại 
            await ProductCategory.updateMany({_id: { $in: ids }}, { $push: {updatedBy: updatedBy}, status: 'inactive' });
            break;
            case 'delete-all': // xóa tất cả 
            await ProductCategory.updateMany(
                {_id: {$in:ids}},
                {
                    deleted: true,
                    deletedBy: {
                        account_id: res.locals.user.id,
                        deletedAt: new Date()
                    }
                }
            )
            req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm`);
            break;
        case 'change-position': // thay đổi vị trí, sắp xếp vtri
            for (const item of ids){
                let[id, position] = item.split("-");
                position = parseInt(position);
                // console.log(id);
                // console.log(position);
                await ProductCategory.updateMany(
                    {
                        _id: {$in: id}
                    },
                    {
                        position: position,
                        $push: {updatedBy: updatedBy}
                    }
                );
                req.flash('success', `Đã đổi vị trí thành công ${ids.length} sản phẩm`);
            }
            break;
        default:
            break;
    }
    // khi submit thì về trang nguyên bản 
    res.redirect("back");

}
