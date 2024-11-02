// file này để sử lí dữ liệu khi connect với mongoodb
// gọi mongoose để kết nối với mongodb
const  mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// sau đó là lấy ra các lược đồ với cách trường tương ứng với các kiểu dữ liệu 
const productCategorySchema = new mongoose.Schema({ 
    title: String,
    parent_id: {
        type: String,
        default: "",
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    },
    
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date
},{
    timestamps: true,
}
);
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category");
module.exports = ProductCategory;

// kết nối xong sau đó nhúng vào file controller để xử lí dữ liệu