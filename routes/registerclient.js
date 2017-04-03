var express = require('express');
var router = express.Router();


var layout = require('./layoutclient');
/* trang dang ky */
router.get('/dangky', function(req, res) {
    res.render('registerclient', {
        title: 'XukaShop-Đăng Ký',
    });

});

module.exports = router;