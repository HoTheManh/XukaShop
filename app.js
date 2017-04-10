var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto-js');
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

app.use(session({
    secret: 'XukaShop',
    resave: true,
    saveUninitialized: true
}));
app.use(function(req, res, next) {
    layout.getlayout(req, function(menu, sub_menu, shop, cartlist, profile, user) {
        res.locals.menu = menu;
        res.locals.sub_menu = sub_menu;
        res.locals.shop = shop;
        res.locals.giohang = cartlist;
        res.locals.profile = profile;
        res.locals.users = user;
        next();
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



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    layout.getlayout(req, function(menu, sub_menu, shop, cartlist, profile, user) {
        res.locals.menu = menu;
        res.locals.sub_menu = sub_menu;
        res.locals.shop = shop;
        res.locals.giohang = cartlist;
        res.locals.profile = profile;
        res.locals.users = user;
        var errr = new Error('Not Found');
        errr.status = 404;
        console.log(errr);
        next(errr);
    });

});



app.use(function(errr, req, res, next) {
    res.status(errr.status || 500);
    res.render('error', {
        title: 'XukaShop-Page Not Found'
    });
});

module.exports = app;