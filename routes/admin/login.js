var express = require('express');
var router = express.Router();


// trang chính admin
router.get('/dangnhap', function(req, res) {
    res.render('admin/login', {
        title: 'XukaShop-Admin'
    });
});

module.exports = router;