var express = require('express');
var router = express.Router();

//khai báo models

var layout = require('./layoutclient');
var sanpham = require('../models/sanpham');
var hinhanh = require('../models/hinhanh');

var pagination = function(totalList, pageSize, req, callback) {
    var pageCount = Math.ceil(totalList.length / pageSize),
        currentPage = 1,
        ItemArrays = [],
        ItemList = [];
    while (totalList.length > 0) {
        ItemArrays.push(totalList.splice(0, pageSize));
    }

    //set current page if specifed as get variable (eg: /?page=2)
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    //show list of students from group
    ItemList = ItemArrays[+currentPage - 1];

    callback(pageCount, currentPage, ItemList);
}

/* thong tin chi tiet san pham */
router.get('/sanpham/:name/:id', function(req, res) {
    layout.getlayout(function(menu, sub_menu, shop) {
        var id = req.params.id;
        sanpham.getChiTietSanPham(id, function(sanpham1, hinh1) {
            if (sanpham1.length < 1) { // kiem tra co gia tri tra ve  neu khong co -> page not found 
                res.render('error', {
                    title: 'XukaShop',
                    menu: menu,
                    sub_menu: sub_menu,
                    shop: shop
                });
            } else {
                sanpham.getSanPhamCungLoai(id, function(sanphamcungloai, hinhcungloai) { // xuat gia tri ra giao dien
                    res.render('singleclient', {
                        title: 'XukaShop-' + sanpham1[0].TenSanPham,
                        menu: menu,
                        sub_menu: sub_menu,
                        sanpham1: sanpham1,
                        shop: shop,
                        hinh1: hinh1,
                        sanphamcungloai: sanphamcungloai,
                        hinhcungloai: hinhcungloai
                    });
                });
            }
        });
    });
});


// list san theo loai san pham
router.get('/danhmuc/:loai/:id/', function(req, res) {
    layout.getlayout(function(menu, sub_menu, shop) {
        var id = req.params.id;
        var loai = req.params.loai;
        sanpham.getListSanPhamTheoLoai(id, function(sanpham) {
            if (sanpham.length < 1) { // kiem tra co gia tri tra ve  neu khong co -> page not found 
                res.render('products', {
                    title: 'XukaShop-' + loai,
                    menu: menu,
                    sub_menu: sub_menu,
                    shop: shop,
                    sanpham: sanpham
                });
            } else { // xuat gia tri ra giao dien
                hinhanh.getListHinhSanPham(function(hinh) {
                    var pagesize = 12;
                    pagination(sanpham, pagesize, req, function(pageCount, currentPage, ItemList) {
                        res.render('products', {
                            title: 'XukaShop-' + ItemList[0].TenLoai,
                            menu: menu,
                            sub_menu: sub_menu,
                            sanpham: ItemList,
                            shop: shop,
                            hinh: hinh,
                            pageSize: pagesize,
                            totalSanpham: sanpham.length,
                            pageCount: pageCount,
                            currentPage: currentPage
                        });
                    });
                });
            }
        });
    });
});

/// tìm kiếm sản phẩm
router.post('/search/', function(req, res) {
    layout.getlayout(function(menu, sub_menu, shop) {
        var string = req.body.txt_search;
        res.redirect('/search/keyword=' + string);
    });
});
router.get('/search/keyword=:string', function(req, res) {
    layout.getlayout(function(menu, sub_menu, shop) {
        var string = req.params.string;
        sanpham.searchSanPham(string, function(sanphams) {
            // kiem tra co gia tri tra ve  neu khong co -> page not found 
            // xuat gia tri ra giao dien
            if (sanphams.length < 1) { // kiem tra co gia tri tra ve  neu khong co -> page not found 
                res.render('searchclient', {
                    title: 'XukaShop-' + string,
                    menu: menu,
                    sub_menu: sub_menu,
                    shop: shop,
                    sanpham: sanphams,
                    string: string
                });
            } else {
                hinhanh.getListHinhSanPham(function(hinh) {
                    var pagesize = 5;
                    pagination(sanphams, pagesize, req, function(pageCount, currentPage, ItemList) {
                        res.render('searchclient', {
                            title: 'XukaShop-' + string,
                            menu: menu,
                            sub_menu: sub_menu,
                            sanpham: ItemList,
                            shop: shop,
                            hinh: hinh,
                            string: string,
                            pageSize: pagesize,
                            totalSanpham: sanphams.length,
                            pageCount: pageCount,
                            currentPage: currentPage
                        });
                    });
                });
            }
        });
    });
});






module.exports = router;