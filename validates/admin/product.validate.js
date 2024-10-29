module.exports.createPost = (req, res, next) => {
    if(!req.body.title)
    {
        req.flash("error", `Vui long nhập tiêu đề!`);
        res.redirect("back");
        return;
    }
    next();
}