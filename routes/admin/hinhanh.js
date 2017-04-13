var express = require('express');
var router = express.Router();


// trang chính admin
router.get('/hinhanh', function(req, res) {
    res.render('admin/hinhanh', {
        title: 'XukaShop-Admin'
    });
});

module.exports = router;