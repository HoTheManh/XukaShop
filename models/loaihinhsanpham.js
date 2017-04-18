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



// lay danh sach loaihinh
var getLoaiHinh = function(callback) {
    var query = 'SELECT * FROM loaihinhhanghoa ';
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
};
var addLoaiHinh = function(loaihinh) {

    var tenloaihinh = kytudac_biet(loaihinh.inputTenLoaihinh);

    var mota = kytudac_biet(loaihinh.inputMotaLoaihinh);
    var query = "INSERT INTO `loaihinhhanghoa` (`MaLoaiHinh`, `TenLoaiHinh`, `MoTa`) VALUES (NULL, '" + tenloaihinh + "', '" + mota + "');";
    connection.query(query, function(err) {
        if (err) console.log('fail');
        else console.log('success');
    });
};
var updateLoaiHinh = function(id, ten, mota) {
    var tenloaihinh = kytudac_biet(ten);

    var mota = kytudac_biet(mota);
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