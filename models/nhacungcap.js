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
var getNhaCungCap = function(callback) {
    var query = 'SELECT * FROM nhacungcap';
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
};
var addNhaCungCap = function(ncc) {

    var ten = kytudac_biet(ncc.inputTenNhacungcap);
    var sdt = kytudac_biet(ncc.inputSDTNhacungcap);
    var diachi = kytudac_biet(ncc.inputDiaChiNhacungcap);
    var ghichu = kytudac_biet(ncc.inputGhiChuNhacungcap);
    var query = "INSERT INTO `nhacungcap` (`MaNhaCungCap`, `TenNhaCungCap`, `SDT`, `DiaChi`, `GhiChu`) VALUES (NULL, '" + ten + "', '" + sdt + "', '" + diachi + "', '" + ghichu + "')";

    console.log(query);
    connection.query(query, function(err) {
        if (err) console.log('fail');
        else console.log('success');
    });
};
var updateNhaCungCap = function(ncc) {
    var values = {
        TenNhaCungCap: kytudac_biet(ncc.ten),
        SDT: kytudac_biet(ncc.sdt),
        DiaChi: kytudac_biet(ncc.diachi),
        GhiChu: kytudac_biet(ncc.ghichu),
    }
    console.log(values)
    var query = "UPDATE `nhacungcap` SET  ? Where ?";
    connection.query(query, [values, { MaNhaCungCap: ncc.id }], function(err) {
        if (err) console.log('fail');
        else console.log('success');
    });
};
var deleteNhaCungCap = function(id) {
    var query = "DELETE FROM nhacungcap WHERE nhacungcap.MaNhaCungCap = " + id + ";";
    console.log(query)
    connection.query(query, function(err, rows) {
        if (err) console.log('fail');
        else console.log('success');
    });
};

module.exports = {
    getNhaCungCap: getNhaCungCap,
    addNhaCungCap: addNhaCungCap,
    updateNhaCungCap: updateNhaCungCap,
    deleteNhaCungCap: deleteNhaCungCap
};