var express = require('express');
var router = express.Router();


// trang chính admin
router.get('/sanpham', function(req, res) {
    res.render('admin/sanpham', {
        title: 'XukaShop-Admin'
    });
});

module.exports = router;