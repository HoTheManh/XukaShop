var connection = require('./connection');


var kytudac_biet = function(query) {
    var str = query;
    str = str.replace(/!|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|`|{|}|\||\\/g, "");
    str = str.replace(/ + /g, "");
    str = str.trim();
    return (str);
}



// lay danh sach loaihinh
var getLoaiHinh = function(callback) {
    var query = 'SELECT * FROM loaihinhhanghoa ';
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
};
var addLoaiHinh = function(loaihinh) {
    if (loaihinh.inputTenLoaihinh != null || loaihinh.inputTenLoaihinh != "") {
        var tenloaihinh = kytudac_biet(loaihinh.inputTenLoaihinh);
    } else {
        var tenloaihinh = "";
    }
    if (loaihinh.inputMotaLoaihinh != null) {
        var mota = kytudac_biet(loaihinh.inputMotaLoaihinh);
    } else {
        var mota = "";
    }
    var query = "INSERT INTO `loaihinhhanghoa` (`MaLoaiHinh`, `TenLoaiHinh`, `MoTa`) VALUES (NULL, '" + tenloaihinh + "', '" + mota + "');";
    connection.query(query, function(err) {
        if (err) console.log('fail');
        else console.log('success');
    });
};
var updateLoaiHinh = function(id, ten, mota) {
    if (ten != null || ten != "") {
        var tenloaihinh = kytudac_biet(ten);
    } else {
        var tenloaihinh = "";
    }
    if (mota != null) {
        var mota = kytudac_biet(mota);
    } else {
        var mota = "";
    }
    var query = "UPDATE `loaihinhhanghoa` SET `TenLoaiHinh` = '" + tenloaihinh + "', `MoTa` = '" + mota + "' WHERE `loaihinhhanghoa`.`MaLoaiHinh` = " + id + ";";
    connection.query(query, function(err, rows) {
        if (err) console.log('fail');
        else console.log('success');
    });
};
var deleteLoaiHinh = function(id) {
    var query = "DELETE FROM loaihinhhanghoa WHERE loaihinhhanghoa.MaLoaiHinh = " + id + ";";
    console.log(query)
    connection.query(query, function(err, rows) {
        if (err) console.log('fail');
        else console.log('success');
    });
};

module.exports = {
    getLoaiHinh: getLoaiHinh,
    addLoaiHinh: addLoaiHinh,
    updateLoaiHinh: updateLoaiHinh,
    deleteLoaiHinh: deleteLoaiHinh


};