var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')


var urlencodedParser = bodyParser.urlencoded({ extended: false })



// thêm giỏ hàng
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
                if (cartlist[i].soluongsanpham >= 10) {
                    cartlist[i].soluongsanpham = 10;
                    cartlist[i].thanhtien = cartlist[i].soluongsanpham * cartlist[i].giasanpham;
                    tontai = true;
                    break;
                } else {
                    cartlist[i].soluongsanpham = parseInt(cartlist[i].soluongsanpham) + 1;
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


// xóa item gio hàng

var deleteGioHang = function(iditem, cartlist, callback) {
    for (var i = 0; i < cartlist.length; i++) {
        if (cartlist[i].masanpham == iditem) {
            cartlist.splice(i, 1);
            break;
        }
    }
    callback(cartlist);
}

// cập nhật item giỏ hàng
var updateGioHang = function(iditem, soluong, cartlist, callback) {
    for (var i = 0; i < cartlist.length; i++) {
        if (cartlist[i].masanpham == iditem) {
            if (soluong >= 10) {
                cartlist[i].soluongsanpham = 10;
                cartlist[i].thanhtien = cartlist[i].soluongsanpham * cartlist[i].giasanpham;
                break;
            } else {
                if (soluong < 1) {
                    cartlist[i].soluongsanpham = 1;
                    cartlist[i].thanhtien = cartlist[i].soluongsanpham * cartlist[i].giasanpham;
                    break;
                } else {
                    cartlist[i].soluongsanpham = soluong;
                    cartlist[i].thanhtien = cartlist[i].soluongsanpham * cartlist[i].giasanpham;
                    break;
                }
            }
        }
    }
    callback(cartlist);
}


// them giỏ hàng


router.post('/giohang', urlencodedParser, addGioHang, function(req, res) {
    //res.redirect('/giohang/view');
    addGioHang(urlencodedParser, req, res, function(giohang) {
        req.session.cart = giohang;

        res.redirect('/giohang/view');
    })
});


// xoa item gio hàng

router.post('/giohang/update/:id/:soluong', urlencodedParser, function(req, res) {
    //res.redirect('/giohang/view');
    var id = req.params.id;
    var soluong = req.params.soluong;

    var cartlist = [];
    cartlist = req.session.cart
    updateGioHang(id, soluong, cartlist, function(giohang) {
        req.session.cart = giohang;
        res.redirect('/giohang/view');
    })

});


// update item giỏ hàng
router.post('/giohang/remove/:id', urlencodedParser, function(req, res) {
    //res.redirect('/giohang/view');
    var id = req.params.id;
    var cartlist = [];
    cartlist = req.session.cart
    deleteGioHang(id, cartlist, function(giohang) {
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


// hủy giỏ hàng
router.get('/giohang/huy', function(req, res) {
    req.session.cart = null;
    res.redirect('/giohang/view');
});



module.exports = router;