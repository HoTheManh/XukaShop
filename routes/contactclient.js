var express = require('express');
var router = express.Router();


var layout = require('./layoutclient');
/* GET  thông tin shop. */
router.get('/lienhe', function(req, res) {
    res.render('contactclient', {
        title: 'XukaShop-Thông Tin liên hệ'
    });
});

module.exports = router;