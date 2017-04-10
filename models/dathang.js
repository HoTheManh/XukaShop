var connection = require('./connection');

// lay danh sach hình ảnh
var getDonHang = function(callback) {
        var query = "select *from dathang";
        connection.query(query, function(err, rows) {
            if (err) throw err;
            callback(rows);
        });
    }
    // lay danh sach hình ảnh của sản phẩm chi tiết
var getDonHangId = function(id, callback) {
    var query = "select *from dathang where MaDonHang='" + id + "'";
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}

/// đơn hàng của khach hàng đã đăng ký thành viên
var getDonHangIdKhachHang = function(id, callback) {
    var query = "select *from dathang where KhachHang='" + id + "' order by  MaDonHang desc";

    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}


// thêm đon hàng
var addDonHang = function(values, callback) {
    var query = "INSERT INTO `dathang` (`MaDonHang`, `KhachHang`, `NgayDatHang`, `PhuThu`, `GiamGia`, `TongTien`, `TrangThai`, `GhiChu`) VALUES ?";
    connection.query(query, [values], function(err, rows) {
        if (err) {
            console.log('fail');
        } else {
            console.log('succes');
        }
        callback(rows.insertId);
    });
}
module.exports = {
    getDonHang: getDonHang,
    getDonHangId: getDonHangId,
    addDonHang: addDonHang,
    getDonHangIdKhachHang: getDonHangIdKhachHang
};