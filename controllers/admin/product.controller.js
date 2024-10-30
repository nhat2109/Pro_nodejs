const Product = require('../../models/product.model');
const systemConfig = require('../../config/system');
// [GET] /admin/products
// export hàm xử lí ra home.router.js
const fillterStatusHelper = require('../../helpers/fillterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
module.exports.index = async (req, res) =>{
    const fillterStatus= fillterStatusHelper(req.query);
    // khi truyền params ở trên url ?status=active 
    // console.log(req.query.status); test việc lấy được trên url
    // tạo object find để lấy ra thông tin các trường xóa false
    let find ={
        deleted: false,
    }
    // ngoài ra, kiểm tra xem có params hay không thì add thêm status vào find để hiển thị 
    // định nghĩa bên trên sau đó gọi hàm được trả về các thuộc tính do folder bên kia, truyền req.query sang folder bên với query tương ứng
    const objectSearch = searchHelper(req.query);

    if(req.query.status){
        find.status = req.query.status;
    }

    // cách 1
    // 
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }
    // cách 2
    // // tìm kiếm 
    
    // if(req.query.keyword)
    // {
    //     // find.title = req.query.keyword; // tìm kiếm theo keyword
    //     // $regex: new RegExp(req.query.keyword, 'i') tìm kiếm với chữ thường và hoa
    //     // i : chuyển chữ cái thườnhg thành chữ cái hoa nếu có ký tự đó trong keyword
    //     find.title = { $regex: new RegExp(req.query.keyword, 'i') }; 
    // }else
    // {
    //     // nếu không có keyword thì mặc định lấy tất cả các sản phẩm
    //     find.title = { $regex: '' };  // trả về dữ liệu ra...
    //     // find = {};
    // }
    // Pagination 
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 4
        },
        req.query,
        countProducts
    );
    //Sort  
    let sort ={};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }else{
        sort.position= "desc";
    }
    // End sort
    // // laasy params trên url
    // if(req.query.page){
    //     // nếu k có thì mặc định là 1, nếu kphari thì sẽ lấy ra param hiên url
    //     objectPagination.currentPage = parseInt(req.query.page);
    // }
    // // tính skip để lấy ra các item phù hợp (trang hiện tại - 1) * số giới hạn item trang 2 = (2 - 1) * 4
    // objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    // // console.log(objectPagination.skip)
    // const countProducts = await Product.countDocuments(find);
    // const totalPage = Math.ceil(countProducts/objectPagination.limitItems);
    // console.log(totalPage);
    // // tạo object phân trang
    // objectPagination.totalPage = totalPage; 
    //End Pagination
    // lấy ra các sản phẩm theo find, limit và skip để trả về ra danh sách sản phẩm phù hợp với thông tin truyền vào
    // find: tìm kiếm từng trường của sản phẩm, nếu tìm thấy thì sẽ trả về sản phẩm đó, nếu không thì trả về null
    // limit: số lượng sản phẩm trả về
    // skip: số lượng sản phẩm bỏ qua để trả về sản phẩm tiếp theo (tính từ 0)
    const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
    // console.log(products)
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm", 
        products: products,  // trả về dữ liệu của products vào biến products cho view index
        fillterStatus: fillterStatus, // trả dữ liệu ra ...
        keyword:objectSearch.keyword,
        pagination: objectPagination,  // trả dữ liệu ra...
    });
}
//[PATCH] /change-status/:status/:id

// dùng async await để update lại 
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status}); 
    // console.log(req.params);
    req.flash("success", "Cập nhật trạng thái thành công");
    res.redirect("back");
}
// [PATCH] /admin/products/change-multi

// dùng async await để update lại 
module.exports.changeMulti = async (req, res) => {  
    const type = req.body.type;
    // console.log(req.body.type);
    const ids = req.body.ids.split(', ');
    switch (type) {
        case 'active':
            // await để sd cho mongodb trả về nhiều id cùng lúc nếu type là ative thì tất cả active
            await Product.updateMany({_id: { $in: ids }}, { status: 'active' });
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);
            break;
        case 'inactive': // ngược lại 
            await Product.updateMany({_id: { $in: ids }}, { status: 'inactive' });
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);
            break;
        case 'delete-all': // xóa tất cả 
            await Product.updateMany(
                {_id: {$in:ids}},
                {
                    deleted: true,
                    deletedAt: new Date()
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
                await Product.updateMany(
                    {
                        _id: {$in: id}
                    },
                    {
                        position: position
                    }
                )
            }
            break;
        default:
            break;
        
    }
    // khi submit thì về trang nguyên bản 
    res.redirect("back");

}


// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne(
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

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
   res.render("admin/pages/products/create", 
    {
       pageTitle: "Thêm mới sản phẩm", 
    });
}
// end delete item

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
   
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    // lấy vị trí còn trống 
    if (req.body.position == "") {
        const countProducts = await Product.countDocuments();
        let newPosition = countProducts + 1;
    
        // Tìm vị trí còn trống
        const existingPositions = await Product.find({}).select('position');
        const usedPositions = existingPositions.map(product => product.position);
        
        while (usedPositions.includes(newPosition)) {
            newPosition++;
        }
        
        req.body.position = newPosition;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    
    
    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
 }

 // [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
   try{
    let find ={
        _id: req.params.id,
        deleted: false,
    };
    // lấy đc tt sp đó với id đó
    const product = await Product.findOne(find);
    // console.log(product);
    res.render("admin/pages/products/edit", 
     {
        product: product,  // trả về dữ liệu của product vào biến product cho view edit
        pageTitle: "Chỉnh sửa sản phẩm", 
     });
   }catch(error){
        req.redirect(`${systemConfig.prefixAdmin}/products`);
   }
   
 }
 // end edit item

 // [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
   
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    
    try{
        await Product.updateOne({_id: req.params.id}, req.body);
        req.flash("success", "Cập nhật sản phẩm thành công");
    }catch(error){
        req.flash("error", "Cập nhật thất bại");
    }
    res.redirect("back");
 }
 // End [PATCH] /admin/products/edit/:id
 
// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try{
     let find ={
         _id: req.params.id,
         deleted: false,
     };
     // lấy đc t.tin sp đó với id đó
     const product = await Product.findOne(find);
     // console.log(product);
     res.render("admin/pages/products/detail", 
      {
         product: product,  // trả về dữ liệu của product vào biến product cho view detail
         pageTitle: product.title, 
      });
    }catch(error){
         req.redirect(`${systemConfig.prefixAdmin}/products`);
    }
    
  }
  
// End [GET] /admin/products/detail/:id