var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })


var customer = require('../models/customer');


/* GET trang dang nhap */
router.get('/dangnhap', function(req, res) {
    if (req.session.user == 1) {
        res.redirect('/customer');
    } else {
        res.render('loginclient', {
            title: 'XukaShop-Đăng Nhập',
            err: 0
        });
    }
});


// post đăng nhập
router.post('/dangnhap', urlencodedParser, function(req, res) {
    customer.loginCustomer(req.body, function(tontai, profile) {
        req.session.user = tontai;
        req.session.profile = profile;
        if (tontai == 1) {
            res.redirect('/customer');
        } else {
            res.render('loginclient', {
                title: 'XukaShop-Đăng Nhập',
                err: 1
            });
        }
    });

});


router.get('/logout', function(req, res) {
    req.session.user = 0;
    req.session.profile = null;
    res.redirect('/dangnhap');
});

module.exports = router;