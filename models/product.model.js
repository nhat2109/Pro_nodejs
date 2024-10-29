// file này để sử lí dữ liệu khi connect với mongoodb
// gọi mongoose để kết nối với mongodb
const  mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// sau đó là lấy ra các lược đồ với cách trường tương ứng với các kiểu dữ liệu 
const productSchema = new mongoose.Schema({ 
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    },
    position: Number,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date
},{
    timestamps: true,
}
);
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;

// kết nối xong sau đó nhúng vào file controller để xử lí dữ liệu