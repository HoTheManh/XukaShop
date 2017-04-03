<<<<<<< HEAD
var connection = require('./connection');

// lay thong tin shop
var getShopInfo = function(callback) {
    var query = 'select *from thongtinshop';
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}



module.exports = {
    getShopInfo: getShopInfo

=======
var connection = require('./connection');

// lay thong tin shop
var getShopInfo = function(callback) {
    var query = 'select *from thongtinshop';
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}



module.exports = {
    getShopInfo: getShopInfo

>>>>>>> 65eed9df34aa8d968e2bbfe6f93f9140b9033cee
};