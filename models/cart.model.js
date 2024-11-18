// file này để sử lí dữ liệu khi connect với mongoodb
// gọi mongoose để kết nối với mongodb
const  mongoose = require("mongoose");
// sau đó là lấy ra các lược đồ với cách trường tương ứng với các kiểu dữ liệu 
const cartSchema = new mongoose.Schema({ 
    user_id: String,
    products: [
            {
                product_id: String,
                quantity: Number
            }
        ]
    },
    {
        timestamps: true,
    }
);
const Cart = mongoose.model("Cart", cartSchema, "carts");
module.exports = Cart;

// kết nối xong sau đó nhúng vào file controller để xử lí dữ liệu