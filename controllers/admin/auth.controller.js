const md5 = require('md5');
const Account = require('../../models/account.model');
const systemConfig = require('../../config/system');

//[GET] admin/auth/login
module.exports.login = async (req, res) =>{
    // console.log(req.cookies.token);
    if(req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    }else
    {
        res.render("admin/pages/auth/login", {
            pageTitle: "Đăng nhập"
        });
    }
    
}

//[POST] admin/auth/loginPost
module.exports.loginPost = async (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        deleted: false,
        email: email,
    });
    if(!user)
    {
        req.flash("error", "Email không tồn tại");
        res.redirect('back');
        return;
    }
    console.log(password);
    if(md5(password) != user.password){
        req.flash("error", "Mật khẩu không đúng");
        res.redirect('back');
        return ;
    }
    //Đăng nhập thành công -> trả về fe token để lưu trên cookies từ lần sau khi vào url gửi lên vào token vào middleware xem thỏa mãn đúng dkien hay k 
    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}

//[GET] admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};