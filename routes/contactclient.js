var express = require('express');
var router = express.Router();


var layout = require('./layoutclient');
/* GET  thông tin shop. */
router.get('/lienhe', function(req, res) {
    layout.getlayout(function(menu, sub_menu, shop) {
        res.render('contactclient', {
            title: 'XukaShop-Thông Tin liên hệ',
            menu: menu,
            sub_menu: sub_menu,
            shop: shop
        });
    });
});

module.exports = router;