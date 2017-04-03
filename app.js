var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
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
    layout.getlayout(req, function(menu, sub_menu, shop, cartlist, profile) {
        res.locals.menu = menu;
        res.locals.sub_menu = sub_menu;
        res.locals.shop = shop;
        res.locals.giohang = cartlist;
        res.locals.profile = profile;
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



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
/*
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        layout.getlayout(function(menu, sub_menu, shop) {
            res.render('error', {
                title: 'XukaShop-Page Not Found',
                menu: menu,
                sub_menu: sub_menu,
                shop: shop
            });
        });
    });
}
*/
// production error handler
// no stacktraces leaked to user
/*
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    layout.getlayout(function(menu, sub_menu, shop) {
        res.render('error', {
            title: 'XukaShop-Page Not Found',
            menu: menu,
            sub_menu: sub_menu,
            shop: shop,
            giohang: cartlist
        });
    });
});*/


module.exports = app;