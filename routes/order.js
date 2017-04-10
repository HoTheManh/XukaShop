var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })


var customer = require('../models/customer');
var dathang = require('../models/dathang');
var chitietdathang = require('../models/chitietdathang');


// khách hàng checkout

router.get('/dathang/checkout', function(req, res) {
    if (req.session.profile != null) {
        res.redirect('/dathang/hoantat');
    } else {
        res.render('ordercheckout', {
            title: 'XuKaShop'
        });
    }
});


// sau khi khách hàng nhập thông tin
router.get('/dathang/hoantat', function(req, res) {
    if (req.session.profile == null) {
        res.redirect('/dathang/checkout');
    } else {
        res.render('ordercomplete', {
            title: 'XuKaShop'
        });
    }
});

// khách hàng hay đổi thông tin trước khi đặt hàng

router.post('/dathang/hoantat', function(req, res) {
    var makh = req.session.profile[0].MaKhachhang;
    customer.updateCustomer(req.body, makh, function(err, MaKhachhang) {
        if (err == 0) {
            var profile = [{
                MaKhachhang: MaKhachhang,
                HoTen: req.body.inputName,
                SDT: req.body.inputSdt,
                Email: req.body.inputemail,
                DiaChi: req.body.inputDiachi,
            }]
            req.session.profile = profile;
            res.redirect('/dathang/hoantat');

        } else {
            res.redirect('/dathang/hoantat');
        }
    });
});


// khách hàng đặt hàng đặt hàng
router.post('/dathang/true', function(req, res) {
    var MaKhachhang = req.session.profile[0].MaKhachhang;
    var tongtien = 0;
    var giohang = req.session.cart;
    var chitietvalues = [];
    for (var i = 0; i < giohang.length; i++) {
        tongtien = tongtien + giohang[i].thanhtien;
    }
    var values = [
        ['Null', MaKhachhang, 'CURRENT_TIMESTAMP', '0', '0', tongtien, 'Chưa Thanh Toán', 'Không']
    ];
    dathang.addDonHang(values, function(idDonHang) {
        for (var i = 0; i < giohang.length; i++) {
            chitietvalues.push([idDonHang, giohang[i].masanpham, giohang[i].giasanpham, giohang[i].soluongsanpham, giohang[i].thanhtien, 'Không', giohang[i].tensanpham]);
        }
        chitietdathang.addchitietdathang(idDonHang, chitietvalues);
        req.session.cart = null;
        res.redirect("/dathang/hoantat");
    });
});

// khách hàng nhập thông tin mua hàng mà không cần đăng nhập

router.post('/dathang/checkout/', function(req, res) {
    customer.insertCustomer(req.body, function(err, MaKhachhang) {
        if (err == 0) {
            var profile = [{
                MaKhachhang: MaKhachhang,
                HoTen: req.body.inputName,
                SDT: req.body.inputSdt,
                Email: req.body.inputemail,
                DiaChi: req.body.inputDiachi,
            }]
            req.session.profile = profile;
            res.redirect('/dathang/hoantat');

        } else {
            res.render('ordercheckout', {
                title: 'XuKaShop'
            });
        }
    });
});








module.exports = router;