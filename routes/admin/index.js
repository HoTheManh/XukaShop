var express = require('express');
var router = express.Router();


// trang chính admin
router.get('/trangchu', function(req, res) {
    res.render('admin/index', {
        title: 'XukaShop-Admin'
    });
});

module.exports = router;