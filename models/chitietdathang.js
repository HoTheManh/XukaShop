var connection = require('./connection');

// lay thong tin shop
var getchitietdonhang = function(callback) {
    var query = 'select *from chitietdathang';
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}

var addchitietdathang = function(id, values) {
    var query = "INSERT INTO `chitietdathang` (`MaDonHang`, `MaHangHoa`, `DonGia`, `SoLuong`, `ThanhTien`, `GhiChu`, `HangHoa`) VALUES ?;";
    connection.query(query, [values], function(err) {
        if (err) {
            console.log('fail');
        } else {
            console.log('succes');
        }
    });
}

module.exports = {
    addchitietdathang: addchitietdathang,
    getchitietdonhang: getchitietdonhang
}