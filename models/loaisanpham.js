var connection = require('./connection');

// lay danh sach loaisanpham
var getLoai = function(callback) {
    var query = 'SELECT * FROM loaihanghoa ';
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}


module.exports = {
    getLoai: getLoai

};