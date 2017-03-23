var connection = require('./connection');

// lay danh sach hình ảnh
var getListHinhSanPham = function(callback) {
        var query = "select *from hinhanh";
        connection.query(query, function(err, rows) {
            if (err) throw err;
            callback(rows);
        });
    }
    // lay danh sach hình ảnh của sản phẩm chi tiết
var getListHinhSanPhamChiTiet = function(id, callback) {
    var query = "select *from hinhanh where mahang='" + id + "'";
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}
module.exports = {
    getListHinhSanPham: getListHinhSanPham,
    getListHinhSanPhamChiTiet: getListHinhSanPhamChiTiet,

};