var express = require('express');
var router = express.Router();


var layout = require('./layoutclient');
var sanpham = require('../models/sanpham');


/* GET home page. */
router.get('/', function(req, res) {
    layout.getlayout(function(menu, sub_menu, shop) {
        sanpham.getListSanPhamMoi(function(sanpham, hinh) {
            res.render('indexclient', {
                title: 'XukaShop - Thời Trang Nam Nữ',
                menu: menu,
                sub_menu: sub_menu,
                sanpham: sanpham,
                shop: shop,
                hinh: hinh
            });
        });
    });
});

module.exports = router;