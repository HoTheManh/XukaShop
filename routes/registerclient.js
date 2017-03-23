var express = require('express');
var router = express.Router();


var layout = require('./layoutclient');
/* trang dang ky */
router.get('/dangky', function(req, res) {
    layout.getlayout(function(menu, sub_menu, shop) {
        res.render('registerclient', {
            title: 'XukaShop-Đăng Ký',
            menu: menu,
            sub_menu: sub_menu,
            shop,
            shop
        });
    });
});

module.exports = router;