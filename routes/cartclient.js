var express = require('express');
var router = express.Router();


var layout = require('./layoutclient');
/* trang gio hang. */
router.get('/giohang', function(req, res) {
    layout.getlayout(function(menu, sub_menu, shop) {
        res.render('cartclient', {
            title: 'XukaShop-Đăng Nhập',
            menu: menu,
            sub_menu: sub_menu,
            shop: shop
        });
    });
});

module.exports = router;