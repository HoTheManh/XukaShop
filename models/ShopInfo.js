var connection = require('./connection');

// lay thong tin san pham
var getShopInfo = function(callback) {
    var query = 'select *from thongtinshop';
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}



module.exports = {
    getShopInfo: getShopInfo

};