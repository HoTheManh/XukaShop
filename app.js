var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto-js');
const fileUpload = require('express-fileupload');

// khai báo connect----------------------------------------
var mysql = require('mysql')

/// khai báo routes---------------------------------------------------
var indexclient = require('./routes/indexclient');
var loginclient = require('./routes/loginclient');
var registerclient = require('./routes/registerclient');
var cartclient = require('./routes/cartclient');
var contactclient = require('./routes/contactclient');
var singleclient = require('./routes/productclient');
var layout = require('./routes/layoutclient');
var order = require('./routes/order');
var customer = require('./routes/customer');
// routes admin
var indexadmin = require('./routes/admin/index');
var loaihinhadmin = require('./routes/admin/loaihinhsanpham');
var loginadmin = require('./routes/admin/login');
var loaisanphamadmin = require('./routes/admin/loaisanpham');
var nhasanxuatadmin = require('./routes/admin/nhasanxuat');
var sanphamadmin = require('./routes/admin/sanpham');
var dathangadmin = require('./routes/admin/dathang');
var chitietadmin = require('./routes/admin/chitietdathang');
var hinhanh = require('./routes/admin/hinhanh');
var layoutadmin = require('./routes/admin/layoutadmin');





//------------------------------------------------------------
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(session({
    secret: 'XukaShop',
    resave: true,
    saveUninitialized: true
}));
app.use('/', function(req, res, next) {
    layout.getlayout(req, function(loaihinh, loaihanghoa, shopinfo, cartlist, profile, user) {
        layoutadmin.getlayout(req, function(admin, ncc) {
            res.locals.loaihinh = loaihinh;
            res.locals.loaihanghoa = loaihanghoa;
            res.locals.shop = shopinfo;
            res.locals.giohang = cartlist;
            res.locals.profile = profile;
            res.locals.users = user;
            res.locals.admin = admin;
            res.locals.ncc = ncc;
            next();
        });
    });
});
/// dùng view-----------------------------------------------
app.use('/', indexclient);
app.use('/', registerclient);
app.use('/', cartclient);
app.use('/', contactclient);
app.use('/', singleclient);
app.use('/', loginclient);
app.use('/', order);
app.use('/', customer);

// view admin-------------------------------
app.use('/quanlyshop', indexadmin);
app.use('/quanlyshop', loginadmin);
app.use('/quanlyshop', loaihinhadmin);
app.use('/quanlyshop', loaisanphamadmin);
app.use('/quanlyshop', nhasanxuatadmin);
app.use('/quanlyshop', sanphamadmin);
app.use('/quanlyshop', dathangadmin);
app.use('/quanlyshop', chitietadmin);
app.use('/quanlyshop', hinhanh);



// catch 404 and forward to error handler
app.use('/', function(req, res, next) {
    var errr = new Error('Not Found');
    errr.status = 404;
    next(errr);
});

app.use(function(errr, req, res, next) {
    res.status(errr.status || 500);
    res.render('error', {
        title: 'XukaShop-Page Not Found'
    });
    console.log(errr);
});
module.exports = app;