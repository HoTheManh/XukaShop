var express = require('express');
var router = express.Router();

var loaihinh = require('../models/loaihinhsanpham');
var loaihanghoa = require('../models/loaisanpham');
var shop = require('../models/ShopInfo')

// xuat layout menu- thong tin shop - sub_menu
var getlayout = function(callback) {
    loaihinh.getLoaiHinh(function(menu) {
        loaihanghoa.getLoai(function(sub_menu) {
            shop.getShopInfo(function(shop) {
                callback(menu, sub_menu, shop);
            });
        });
    });
};



module.exports = {
    getlayout: getlayout

};