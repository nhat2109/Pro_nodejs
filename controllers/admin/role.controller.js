const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const permissionLabels = require("../../utils/permissionLabels");
const Account = require('../../models/account.model');
// export hàm xử lí ra home.router.js
// [GET] /admin/role/index
module.exports.index = async (req, res) =>{
    let find ={
        deleted: false
    }
    
    const records = await Role.find(find);
    // Lấy tên tài khoản người tạo sản phẩm
    for (const product of records) {
        const user = await Account.findOne({
            _id: product.createdBy.account_id,
        });
        if(user) {
        product.accountFullName = user.fullName;
        }
        // Lấy thông tin người cập nhật gần nhất
        const updatedBy = product.updatedBy.slice(-1)[0];
        if(updatedBy){
            const userUpdated = await Account.findOne({
                _id: updatedBy.account_id,
            });
            updatedBy.accountFullName = userUpdated.fullName;
        }
    }
    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records
    });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) =>{
    
    res.render("admin/pages/roles/create", {
        pageTitle: "Nhóm quyền",
    });
}
// [POST] /admin/roles/create
module.exports.createPost = async (req, res) =>{
    req.body.createdBy = {
        account_id: res.locals.user.id
    };
    const record = new Role(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) =>{
    try{
        const id = req.params.id;
        let find = {
            _id: id,
            deleted: false
        };
        const data = await Role.findOne(find);
        res.render("admin/pages/roles/edit", {
            pageTitle: "Sửa nhóm quyền",
            data: data
        });
    }catch(e)
    {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}

// [GET] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) =>{
    try{
        const updatedBy = {
            account_id: res.locals.user.id,
            updatedAt: new Date()
        }
        const id = req.params.id;
        await Role.updateOne({_id:id},
            {
                ...req.body,
                $push: {updatedBy: updatedBy}
            }
        );
        req.flash("success","Cập nhật nhóm quyền thành công");
    }catch(e)
    {
        req.flash("error","Cập nhật nhóm quyền thất bại");
        
    }
    res.redirect("back");
}

// [DELETE] /admin/roles/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Role.updateOne(
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
// [GET] /admin/roles/detail
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    let find = {
        _id: id,
        deleted: false
    };
    const data = await Role.findOne(find);
    // console.log(data);
    res.render("admin/pages/roles/detail",{
        pageTitle: "Chi tiết nhóm quyền",
        data: data,
        permissionLabels: permissionLabels
    });
}
// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find ={
        deleted: false
    };
    const records = await Role.find(find);
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        records: records
    });
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
   const permissions = JSON.parse(req.body.permissions);
   for(const item of permissions) {
    await Role.updateOne({_id: item.id}, {
        permissions: item.permission
    });
   }
   req.flash("success", "Cập nhật phân quyền thành công");
   res.redirect("back");
}

