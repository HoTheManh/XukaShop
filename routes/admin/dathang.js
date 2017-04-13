var express = require('express');
var router = express.Router();


// trang chính admin
router.get('/dathang', function(req, res) {
    res.render('admin/dathang', {
        title: 'XukaShop-Admin'
    });
});

module.exports = router;