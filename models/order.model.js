// file này để sử lí dữ liệu khi connect với mongoodb
// gọi mongoose để kết nối với mongodb
const  mongoose = require("mongoose");
// sau đó là lấy ra các lược đồ với cách trường tương ứng với các kiểu dữ liệu 
const orderSchema = new mongoose.Schema({ 
        cart_id: String,
        userInfo: {
            fullName: String,
            phone: String,
            address: String
        },
        products: [
            {
                product_id: String,
                title: String,
                price: Number,
                discountPercentage: Number,
                quantity: Number
            }
        ],
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
        
    },
    {
        timestamps: true,
    }
);
const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;

// kết nối xong sau đó nhúng vào file controller để xử lí dữ liệu