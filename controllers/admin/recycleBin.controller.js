const Product = require('../../models/recycleBin.model');
// [GET] /admin/products
// export hàm xử lí ra home.router.js
const fillterStatusHelper = require('../../helpers/fillterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
const Account = require('../../models/account.model');
module.exports.index = async (req, res) =>{
    const fillterStatus= fillterStatusHelper(req.query);
    // khi truyền params ở trên url ?status=active 
    // console.log(req.query.status); test việc lấy được trên url
    // tạo object find để lấy ra thông tin các trường xóa false
    let find ={
        deleted: true,
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
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
    // Lấy tên tài khoản người tạo sản phẩm
    for (const product of products) {
        const user = await Account.findOne({
            _id: product.deletedBy.account_id,
        });
        if(user) {
            product.accountFullName = user.fullName;
        }
    }
    // console.log(products)
    res.render("admin/pages/recycleBin/index", {
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
    res.redirect("back");
}
//[PATCH] /change-multi
// dùng async await để update lại 
module.exports.changeMulti = async (req, res) => {  
    const type = req.body.type;
    const ids = req.body.ids.split(', ');
    switch (type) {
        case 'active':
            // await để sd cho mongodb trả về nhiều id cùng lúc nếu type là ative thì tất cả active
            await Product.updateMany({_id: { $in: ids }}, { status: 'active' });
            break;
        case 'inactive': // ngược lại 
            await Product.updateMany({_id: { $in: ids }}, { status: 'inactive' });
            break;
        default:
            break;
    }
    // khi submit thì về trang nguyên bản 
    res.redirect("back");

}


// delete item 
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    await Product.deleteOne(
        {_id: id}
        ,{
            deleted: false,
            deletedAt: new Date()
        }); 
    // console.log(req.params);
    res.redirect("back");
}
// end delete item

// restore item 
module.exports.restoreItem = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    await Product.updateOne(
        {_id: id}
        ,{
            deleted: false,
            deletedAt: new Date()
        }); 
    // console.log(req.params);
    res.redirect("back");
}
// end restore item