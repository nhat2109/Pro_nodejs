// file này để sử lí dữ liệu khi connect với mongoodb
// gọi mongoose để kết nối với mongodb
const  mongoose = require("mongoose");
// sau đó là lấy ra các lược đồ với cách trường tương ứng với các kiểu dữ liệu 
const settingGeneralSchema = new mongoose.Schema({ 
    websiteName: String,
    logo: String,
    address: String,
    phone: String,
    email: String,
    copyright: String,
},{
    timestamps: true,
}
);
const SettingGeneral = mongoose.model("SettingGeneral", settingGeneralSchema, "setting-general");
module.exports = SettingGeneral;

// kết nối xong sau đó nhúng vào file controller để xử lí dữ liệu