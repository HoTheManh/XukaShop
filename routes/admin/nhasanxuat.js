var express = require('express');
var router = express.Router();
var nhacungcap = require('../../models/nhacungcap')


// trang chính admin
router.get('/nhacungcap', function(req, res) {
    nhacungcap.getNhaCungCap(function(ncc) {
        res.render('admin/nhacungcap', {
            title: 'XukaShop-Admin',
            ncc: ncc
        });
    });
});
/// add loại hinh
router.post('/nhacungcap', function(req, res) {
    nhacungcap.addNhaCungCap(req.body);
    res.redirect("/quanlyshop/nhacungcap");
});

// update loaihinh
router.post('/nhacungcap/update', function(req, res) {
    nhacungcap.updateNhaCungCap(req.body);
    res.redirect("/quanlyshop/nhacungcap");
});

router.post('/nhacungcap/delete/:id', function(req, res) {
    var id = req.params.id;
    nhacungcap.deleteNhaCungCap(id);
    res.redirect("/quanlyshop/nhacungcap");
});
module.exports = router;