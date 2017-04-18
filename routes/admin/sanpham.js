var express = require('express');
var router = express.Router();
var sanpham = require('../../models/sanpham')

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

var bodyParser = require('body-parser')


var urlencodedParser = bodyParser.urlencoded({ extended: false })

// trang chính admin
router.get('/sanpham', function(req, res) {
    sanpham.getListSanPhamAll(function(sanphamlist) {
        var pagesize = 30;
        pagination(sanphamlist, pagesize, req, function(pageCount, currentPage, ItemList) {
            res.render('admin/sanpham', {
                title: 'XukaShop',
                sanpham: ItemList,
                pageSize: pagesize,
                totalSanpham: sanphamlist.length,
                pageCount: pageCount,
                currentPage: currentPage
            });
        })
    });
});

// xoa san pham
router.post('/sanpham/delete', function(req, res) {
    var id = req.body.id;
    sanpham.deleteSanpham(id);
    res.redirect("/quanlyshop/sanpham");

});
router.post('/sanpham/add', urlencodedParser, function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    let sampleFile = req.files.inputHinhSP;
    var filepath = "./public/dist/img/" + req.files.inputHinhSP.name;

    // Use the mv() method to place the file somewhere on your server 
    sampleFile.mv(filepath, function(err) {
        if (err)
            return res.status(500).send(err);
    });
    sanpham.addSanpham(req);
    res.redirect("/quanlyshop/sanpham");

});
// cập nhật sản phẩm
router.post('/sanpham/update/:id', urlencodedParser, function(req, res) {
    if (req.files.inputupdateHinhSP != null) {

        let sampleFile = req.files.inputupdateHinhSP;
        var filepath = "./public/dist/img/" + req.files.inputupdateHinhSP.name;

        // Use the mv() method to place the file somewhere on your server 
        sampleFile.mv(filepath, function(err) {
            if (err)
                return res.status(500).send(err);
        });
    }
    var id = req.params.id
    sanpham.updateSanpham(req, id);
    res.redirect("/quanlyshop/sanpham");

});

module.exports = router;