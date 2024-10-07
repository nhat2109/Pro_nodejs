// [GET] /
// export hàm xử lí ra home.router.js
module.exports.index = (req, res) =>{
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ"
    });
}