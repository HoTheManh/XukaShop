var express = require('express');
var router = express.Router();

var customer = require('../models/customer');
var dathang = require('../models/dathang');
var chitietdathang = require('../models/chitietdathang')

/* GET  thông tin khachhang.  và các đơn đăt hàng nếu có*/
router.get('/customer', function(req, res) {
    if (req.session.user == 1) {
        var MaKhachhang = req.session.profile[0].MaKhachhang;
        dathang.getDonHangIdKhachHang(MaKhachhang, function(dathang) {
            chitietdathang.getchitietdonhang(function(chitiet) {
                res.render('customer', {
                    title: 'XukaShop-' + req.session.profile[0].HoTen,
                    donhang: dathang,
                    chitiet: chitiet
                });
            })
        });
    } else {
        res.redirect('/dangnhap');
    }
});


// cập nhật thông tin khách hàng
router.post('/customer/update', function(req, res) {
    if (req.session.user == 1) {
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
                res.redirect('/customer');

            } else {
                res.render('customer', {
                    title: 'XukaShop'
                });
            }
        });
    } else {
        res.redirect('/dangnhap');
    }
});

module.exports = router;