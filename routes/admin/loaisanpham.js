var express = require('express');
var router = express.Router();
var loaisanpham = require('../../models/loaisanpham')
var loaihinh = require('../../models/loaihinhsanpham')

// trang loại sản phẩm
router.get('/loaisanpham', function(req, res) {
    loaihinh.getLoaiHinh(function(loaihinhsp) {
        loaisanpham.getLoai(function(loai) {
            res.render('admin/loaisanpham', {
                title: 'XukaShop-Admin',
            });
        });
    })

});


// trang them loại sản phẩm
router.post('/loaisanpham', function(req, res) {
    loaisanpham.addLoai(req.body);
    res.redirect("/quanlyshop/loaisanpham");

});

// update loai sản pham
router.post('/loaisanpham/update', function(req, res) {
    var id = req.body.id;
    var ten = req.body.ten;
    var loaihinh = req.body.loaihinh;
    var mota = req.body.mota;

    loaisanpham.updateLoai(id, ten, loaihinh, mota);
    res.redirect("/quanlyshop/loaihinhsanpham");
});
//// xóa loại sản phẩm
router.post('/loaisanpham/delete', function(req, res) {
    var id = req.body.id;
    loaisanpham.deleteLoai(id);
    res.redirect("/quanlyshop/loaihinhsanpham");
});




module.exports = router;