// [GET] /admin/dashboard
// export hàm xử lí ra home.router.js
module.exports.dashboard = (req, res) =>{
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang chur tong quan"
    });
}