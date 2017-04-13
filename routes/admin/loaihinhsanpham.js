var express = require('express');
var router = express.Router();
var loaihinh = require('../../models/loaihinhsanpham')


// trang chính admin
router.get('/loaihinhsanpham', function(req, res) {
    loaihinh.getLoaiHinh(function(loaihinh) {
        res.render('admin/loaihinh', {
            title: 'XukaShop-Admin',
            loaihinh: loaihinh
        });
    });
});
/// add loại hinh
router.post('/loaihinhsanpham', function(req, res) {
    loaihinh.addLoaiHinh(req.body);
    res.redirect("/quanlyshop/loaihinhsanpham");
});

// update loaihinh
router.post('/loaihinhsanpham/update', function(req, res) {
    var id = req.body.id;
    var ten = req.body.ten;
    var mota = req.body.mota;
    loaihinh.updateLoaiHinh(id, ten, mota);
    res.redirect("/quanlyshop/loaihinhsanpham");
});

router.post('/loaihinhsanpham/delete/:id', function(req, res) {
    var id = req.params.id;
    loaihinh.deleteLoaiHinh(id);
    res.redirect("/quanlyshop/loaihinhsanpham");
});
module.exports = router;