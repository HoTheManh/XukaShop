var connection = require('./connection');

// lay thong tin shop
var getShopInfo = function(callback) {
    var query = "SELECT * FROM `thongtinshop`";
    connection.query(query, function(err, row) {
        if (err) throw err;
        callback(row);
    });
}

module.exports = {
    getShopInfo: getShopInfo,
};