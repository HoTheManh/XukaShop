var connection = require('./connection');


var kytudac_biet = function(query) {
        if (query == null || query == "") {
            var str = " ";
            return (str);
        } else {
            var str = query;
            str = str.replace(/!|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|`|{|}|\||\\/g, "");
            str = str.replace(/ + /g, "");
            str = str.trim();
            return (str);
        }
    }
    // lay danh sach loaisanpham
var getLoai = function(callback) {
        var query = 'SELECT loaihanghoa.MaLoai, loaihanghoa.TenLoai,loaihanghoa.MoTa,loaihinhhanghoa.TenLoaiHinh, loaihanghoa.LoaiHinh FROM loaihanghoa INNER JOIN loaihinhhanghoa ON loaihanghoa.LoaiHinh = loaihinhhanghoa.MaLoaiHinh order by loaihanghoa.MaLoai ASC';
        connection.query(query, function(err, rows) {
            if (err) throw err;
            callback(rows);
        });
    }
    /// thêm loại sản phẩm
var addLoai = function(loai) {

    var tenloai = kytudac_biet(loai.inputTenLoai);


    var mota = kytudac_biet(loai.inputMota);

    var query = "INSERT INTO `loaihanghoa` (`MaLoai`, `TenLoai`, `LoaiHinh`, `MoTa`) VALUES (NULL, '" + tenloai + "', '" + loai.selectloaihinh + "', '" + mota + "');";
    connection.query(query, function(err) {
        if (err) console.log('fail');
        else console.log('success');
    });
};
// cập nhật loại sản phẩm
var updateLoai = function(id, ten, loaihinh, mota) {

    var tenloaihinh = kytudac_biet(ten);

    var mota = kytudac_biet(mota);

    var query = "UPDATE `loaihanghoa` SET `TenLoai` = '" + ten + "',`LoaiHinh` = '" + loaihinh + "', `MoTa` = '" + mota + "' WHERE `loaihanghoa`.`MaLoai` = " + id + ";";
    console.log(query)
    connection.query(query, function(err, rows) {
        if (err) console.log('fail');
        else console.log('success');
    });
};
// xóa loại sản phẩm
var deleteLoai = function(id) {
    var query = "DELETE FROM loaihanghoa WHERE loaihanghoa.MaLoai = " + id + ";";
    console.log(query)
    connection.query(query, function(err, rows) {
        if (err) console.log('fail');
        else console.log('success');
    });
};

module.exports = {
    getLoai: getLoai,
    addLoai: addLoai,
    updateLoai: updateLoai,
    deleteLoai: deleteLoai

};