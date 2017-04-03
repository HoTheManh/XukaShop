var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/dathang/checkout', function(req, res) {
    if (req.session.profile != null) {
        res.redirect('/dathang/hoantat');
    } else {
        res.render('orderconfirm', {
            title: 'XuKaShop'
        });
    }
});

router.get('/dathang/hoantat', function(req, res) {
    if (req.session.profile == null) {
        res.redirect('/dathang/checkout');
    } else {
        res.render('ordercomplete', {
            title: 'XuKaShop'
        });
    }
});





module.exports = router;