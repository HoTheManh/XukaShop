var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')


var urlencodedParser = bodyParser.urlencoded({ extended: false })




var addGioHang = function(urlencodedParser, req, res, callback) {
    var cartlist = [];
    if (req.session.cart != null) {
        cartlist = req.session.cart
    } else {
        req.session.cart = cartlist
    }
    var masp = req.body.masp;
    var tensp = req.body.tensp;
    var giasp = req.body.giasp;
    if (cartlist.length < 1) {
        var cart = {
            masanpham: masp,
            tensanpham: tensp,
            giasanpham: giasp,
            soluongsanpham: 1,
            thanhtien: giasp * 1
        }
        cartlist.push(cart);
        callback(cartlist);

    } else {
        var tontai = false;
        for (var i = 0; i < cartlist.length; i++) {
            if (cartlist[i].masanpham == masp) {
                if (cartlist[i].soluongsanpham > 99) {
                    tontai = true;
                    break;
                } else {
                    cartlist[i].soluongsanpham = cartlist[i].soluongsanpham + 1;
                    cartlist[i].thanhtien = cartlist[i].soluongsanpham * cartlist[i].giasanpham;
                    tontai = true;
                    break;
                }
            }
        }
        if (tontai == false) {
            var cart = {
                masanpham: masp,
                tensanpham: tensp,
                giasanpham: giasp,
                soluongsanpham: 1,
                thanhtien: giasp * 1
            }
            cartlist.push(cart);
        }
        callback(cartlist);
    }
}

router.post('/giohang', urlencodedParser, addGioHang, function(req, res) {
    //res.redirect('/giohang/view');
    addGioHang(urlencodedParser, req, res, function(giohang) {
        req.session.cart = giohang;
        res.redirect('/giohang/view');
    })

});

/* trang gio hang. */

router.get('/giohang/view', function(req, res) {
    res.render('cartclient', {
        title: 'XukaShop-Giỏ Hàng'
    });
});


module.exports = router;