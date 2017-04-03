var connection = require('./connection');

// lay danh sach loaihinh
var getLoaiHinh = function(callback) {
    var query = 'SELECT * FROM loaihinhhanghoa ';
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
};


module.exports = {
    getLoaiHinh: getLoaiHinh

};