var express = require('express');
var router = express.Router();


// trang chính admin
router.get('/khachhang', function(req, res) {
    res.render('admin/khachhang', {
        title: 'XukaShop-Admin'
    });
});

module.exports = router;