module.exports.registerPost = (req, res, next) => {  
    // Kiểm tra trường họ và tên  
    if (!req.body.fullName) {  
      req.flash('error', 'Vui lòng nhập họ tên!');  
      res.redirect('back');  
      return;  
    }  
  
    // Kiểm tra trường email  
    if (!req.body.email) {  
      req.flash('error', 'Vui lòng nhập email!');  
      res.redirect('back');  
      return;  
    }  
  
    // Kiểm tra trường mật khẩu  
    if (!req.body.password) {  
      req.flash('error', 'Vui lòng nhập mật khẩu!');  
      res.redirect('back');  
      return;  
    }  
  
    // Nếu tất cả các trường đều hợp lệ, tiếp tục với middleware tiếp theo  
    next();  
  };



  module.exports.loginPost = (req, res, next) => {  
   
  
    // Kiểm tra trường email  
    if (!req.body.email) {  
      req.flash('error', 'Vui lòng nhập email!');  
      res.redirect('back');  
      return;  
    }  
  
    // Kiểm tra trường mật khẩu  
    if (!req.body.password) {  
      req.flash('error', 'Vui lòng nhập mật khẩu!');  
      res.redirect('back');  
      return;  
    }  
  
    // Nếu tất cả các trường đều hợp lệ, tiếp tục với middleware tiếp theo  
    next();  
  };