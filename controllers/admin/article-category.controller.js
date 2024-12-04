module.exports.index = async (req, res) => {
    // res.send("ok");
    res.render("admin/pages/articles-category/index", {
        pageTitle: "Quản lý danh mục bài viết"
    });
};