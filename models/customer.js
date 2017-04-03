var connection = require('./connection');


// xử lý ký tự đặc biệt
var kytudacbiet = function(query, callback) {
    var str = query;
    str = str.toLowerCase();
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    callback(str);
}


// thong tin khach hang
var loginCustomer = function(user, req, callback) {
        kytudacbiet(user.inputemail, function(email) {
            kytudacbiet(user.inputPassword, function(password) {
                var query = "SELECT COUNT(MaKhachhang) as tontai,MaKhachhang,HoTen,SDT,Email,DiaChi from khachhang where ( Email='" + email + "' AND Password='" + password + "') or (username='" + email + "' and Password='" + password + "')";
                connection.query(query, function(err, rows) {
                    if (err) {
                        throw err;
                    }
                    if (rows[0].tontai == "0") {
                        var tontai = 0
                    } else {
                        var tontai = 1
                    }
                    callback(tontai, rows)
                });
            })
        })
    }
    // lay danh sach hình ảnh của sản phẩm chi tiết

module.exports = {
    loginCustomer: loginCustomer,
};