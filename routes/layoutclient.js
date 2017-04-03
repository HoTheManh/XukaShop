var express = require('express');
var router = express.Router();

var loaihinh = require('../models/loaihinhsanpham');
var loaihanghoa = require('../models/loaisanpham');
var shop = require('../models/ShopInfo')

// xuat layout menu- thong tin shop - sub_menu
var getlayout = function(req, callback) {
    loaihinh.getLoaiHinh(function(menu) {
        loaihanghoa.getLoai(function(sub_menu) {
            shop.getShopInfo(function(shop) {
                var cartlist = [];
                var profile = [];
                if (req.session.cart != null) {
                    cartlist = req.session.cart
                } else {
                    req.session.cart = cartlist
                }
                if (req.session.user == 1) {
                    profile = req.session.profile
                }
                callback(menu, sub_menu, shop, cartlist, profile);
            });
        });
    });
};



module.exports = {
    getlayout: getlayout,

};