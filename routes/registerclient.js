var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })


var customer = require('../models/customer');


/* trang dang ky */
router.get('/dangky', function(req, res) {
    res.render('registerclient', {
        title: 'XukaShop-Đăng Ký',
        err: 0
    });
});


router.post('/dangky', urlencodedParser, function(req, res) {
    customer.insertCustomer(req.body, function(err) {
        req.session.err = err;
        if (req.session.err == 0) {
            res.redirect('/dangnhap');

        } else {
            if (req.session.err == 1) {
                res.render('registerclient', {
                    title: 'XukaShop-Đăng Ký',
                    err: 1
                });
            } else {
                res.render('registerclient', {
                    title: 'XukaShop-Đăng Ký',
                    err: 2
                });
            }
        }
    });
});

module.exports = router;