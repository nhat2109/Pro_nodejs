// file này để sử lí dữ liệu khi connect với mongoodb
// gọi mongoose để kết nối với mongodb
const  mongoose = require("mongoose");
// sau đó là lấy ra các lược đồ với cách trường tương ứng với các kiểu dữ liệu 
const roleSchema = new mongoose.Schema({ 
    title: String,
    description: String,
    permissions: {
        type: Array,
        default: [],
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date,
        }
    ],
    deletedAt: Date
},{
    timestamps: true,
}
);
const Role = mongoose.model("Role", roleSchema, "roles");
module.exports = Role;

// kết nối xong sau đó nhúng vào file controller để xử lí dữ liệu