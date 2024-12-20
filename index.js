// khai báo để sử dung express với thư viên express() đã được tạo lập sẵn và được gắn vào biến app npm i express
const express = require('express');
// khai bao thư viện cho việc thay đổi màu chữ , chữ nghiêng ở textarea
const path = require('path');
// khai báo thư viện body-parser để parse dữ liệu post
const methodOverride = require('method-override');
// sử dụng env để bảo mật npm i dotenv
require('dotenv').config();
// thư viện thông báo
const flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// thư viện ngày giờ
const moment = require('moment');
// npm i mongoose
const database = require('./config/database');
const app = express();
// import bodyParser để giúp form method có thể gửi lên server
const bodyParser = require('body-parser');
// sử dụng router được lấy bên router ứng vào mô hình MVC 
const route = require('./router/client/index.router');
// route của admin
const routeAdmin = require('./router/admin/index.router');
// import folder chứa biến
const systemConfig = require('./config/system');
// process.env.PORT để lấy port trong file env để bảo mật
const port = process.env.PORT;


database.connect();
//Su dung PUG xét đến thư mục ./views rồi nên lát chạy chỉ cần render đến index thôi
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// sử dụng các file tĩnh trong./public
app.use(express.static(`${__dirname}/public`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse dữ liệu post
app.use(methodOverride('_method'));

// use libary of flash
//Flash
// Sử dụng cookie-parser với SESSION_SECRET từ .env
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End flash
//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//End TinyMCE

// Biến locals có thể dùng được ở các folder App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// Router
route(app);
routeAdmin(app);
app.get("*", (req, res)=> {
    res.render("client/pages/errors/404",{
        pageTitle: "404 Not Found",
    })
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


// mvc đi vào router 
// tạo route cho admin -> đi vào router của admin với index.js 