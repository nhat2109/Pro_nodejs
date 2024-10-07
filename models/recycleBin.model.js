// file này để sử lí dữ liệu khi connect với mongoodb
// gọi mongoose để kết nối với mongodb
const  mongoose = require("mongoose");
// sau đó là lấy ra các lược đồ với cách trường tương ứng với các kiểu dữ liệu 
const recycleBinSchema = new mongoose.Schema({ 
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean,
    deletedAt: Date,
});

const RecycleBin = mongoose.model("RecycleBin", recycleBinSchema, "products");

module.exports = RecycleBin;


// kết nối xong sau đó nhúng vào file controller để xử lí dữ liệu