const md5 = require('md5');
const Account = require('../../models/account.model');
const Role = require('../../models/role.model');

const systemConfig = require('../../config/system');
//[GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };
    const records = await Account.find(find).select("-password-token");
    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false,
        });
        record.role = role;
    }
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
    res.render('admin/pages/accounts/index', {
        pageTitle: 'Danh sách tài khoản',
        records: records,
    });
};
//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false,
    });
    res.render('admin/pages/accounts/create', {
        pageTitle: 'Tạo mới tài khoản',
        roles: roles,
    });
};
//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false,
    });
    if (emailExist) {
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
        res.redirect('back');
    }else
    {
        req.body.createdBy = {
            account_id: res.locals.user.id
        };
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
    
};

//[GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    let find = {
        _id: req.params.id,
        deleted: false,
    };
    try{
        const data = await Account.findOne(find);
        const roles = await Role.find({
            deleted: false,
        });
        res.render('admin/pages/accounts/edit', {
            pageTitle: 'Chỉnh sửa tài khoản',
            data: data,
            roles: roles,
        });
    }catch(e){
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
};
//[PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const emailExist = await Account.findOne({
        _id: {$ne: id},
        email: req.body.email,
        deleted: false,
    });
    
    if (emailExist) {
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
        res.redirect('back');
    }else{
        if(req.body.password){
            req.body.password = md5(req.body.password);
        }else{
            delete req.body.password;
        }
        const updatedBy = {
            account_id: res.locals.user.id,
            updatedAt: new Date()
        }
        await Account.updateOne({_id: id,}, {
            ...req.body,
            $push: {updatedBy: updatedBy}
        });
        req.flash("success", "Cập nhật tài khoản thành công!");
    }

    res.redirect('back');
};