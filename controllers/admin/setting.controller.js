const SettingGeneral = require("../../models/settings-general.model");
// [GET] /admin/settings/general
module.exports.general = async (req, res) => {
    const settingGeneral = await SettingGeneral.findOne({});
    res.render("admin/pages/settings/general", {
        pageTitle: "Cài đặt chung",
        settingGeneral: settingGeneral
    });
}


// [PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {
    try {
        const settingGeneral = await SettingGeneral.findOne({});
        
        if (settingGeneral) {
            // Cập nhật bản ghi
            await SettingGeneral.updateOne(
                { _id: settingGeneral._id },
                { $set: req.body } // Sử dụng $set để chỉ cập nhật các trường trong req.body
            );
        } else {
            // Tạo bản ghi mới
            const newRecord = new SettingGeneral(req.body);
            await newRecord.save();
        }
        
        req.flash("success", "Cập nhật thành công!");
    } catch (error) {
        console.error("Lỗi khi cập nhật cài đặt:", error);
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại.");
    }
    res.redirect("back");
};

