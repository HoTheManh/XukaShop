var express = require('express');
var router = express.Router();


var layout = require('./layoutclient');
/* GET trang dang nhap */
router.get('/dangnhap', function(req, res) {
    layout.getlayout(function(menu, sub_menu, shop) {
        res.render('loginclient', {
            title: 'XukaShop-Đăng Nhập',
            menu: menu,
            sub_menu: sub_menu,
            shop: shop
        });
    });
});

module.exports = router;