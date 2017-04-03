var express = require('express');
var router = express.Router();


var layout = require('./layoutclient');
var sanpham = require('../models/sanpham');


/* GET home page. */
router.get('/', function(req, res) {
    sanpham.getListSanPhamMoi(function(sanpham, hinh, banner, sanphambanchay) {
        res.render('indexclient', {
            title: 'XukaShop - Thời Trang Nam Nữ',
            sanpham: sanpham,
            hinh: hinh,
            banner: banner,
            sanphambanchay: sanphambanchay,
        });
    });

});
module.exports = router;