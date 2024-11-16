// file này để sử lí dữ liệu khi connect với mongoodb
// gọi mongoose để kết nối với mongodb
const  mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// sau đó là lấy ra các lược đồ với cách trường tương ứng với các kiểu dữ liệu 
const productSchema = new mongoose.Schema({ 
    title: String,
    product_category_id: {
        type: String,
        default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    featured: String,
    status: String,
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    },
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    position: Number,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
    updatedBy:[
        {
            account_id: String,
            updatedAt: Date,
        }
    ]
    
},{
    timestamps: true,
}
);
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;

// kết nối xong sau đó nhúng vào file controller để xử lí dữ liệu