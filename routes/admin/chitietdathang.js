var express = require('express');
var router = express.Router();


// trang chính admin
router.get('/chitietdathang', function(req, res) {
    res.render('admin/chitietdathang', {
        title: 'XukaShop-Admin'
    });
});

module.exports = router;