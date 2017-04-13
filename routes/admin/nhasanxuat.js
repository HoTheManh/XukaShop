var express = require('express');
var router = express.Router();


// trang chính admin
router.get('/nhasanxuat', function(req, res) {
    res.render('admin/nhasanxuat', {
        title: 'XukaShop-Admin'
    });
});

module.exports = router;