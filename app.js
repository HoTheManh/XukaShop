var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// khai báo connect----------------------------------------
var mysql = require('mysql')
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quanlybanhang'
});


/// khai báo routes---------------------------------------------------
var indexclient = require('./routes/indexclient');
var loginclient = require('./routes/loginclient');
var registerclient = require('./routes/registerclient');
var cartclient = require('./routes/cartclient');
var contactclient = require('./routes/contactclient');
var singleclient = require('./routes/productclient');
var layout = require('./routes/layoutclient');


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

/// dùng view-----------------------------------------------
app.use('/', indexclient);
app.use('/', loginclient);
app.use('/', registerclient);
app.use('/', cartclient);
app.use('/', contactclient);
app.use('/', singleclient);



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
            shop: shop
        });
    });
});*/


module.exports = app;