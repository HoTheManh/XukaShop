var express = require('express');
var router = express.Router();

var loaihinh = require('../../models/loaihinhsanpham');
var loaihanghoa = require('../../models/loaisanpham');
var shop = require('../../models/ShopInfo')
var sanpham = require('../../models/sanpham')
var nhacc = require('../../models/nhacungcap')


// xuat layout menu- thong tin shop - sub_menu
var getlayout = function(req, callback) {
    nhacc.getNhaCungCap(function(ncc) {
        var admin = 0;
        if (req.session.admin == 1) {
            admin = 1;
        }
        callback(admin, ncc);
    });
}
module.exports = {
    getlayout: getlayout
};