var connection = require('./connection');
var crypto = require('crypto-js');


// xử lý ký tự đặc biệt
var kytudac_biet = function(query) {
    var str = query;
    str = str.replace(/!|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|`|{|}|\||\\/g, "");
    str = str.replace(/ + /g, "");
    str = str.trim();
    return (str);
}

// mã hóa mật khẩu
var mahoa = function(query) {
    var code = crypto.AES.encrypt(query, 'tu1den10').toString();
    return (code);
}

/// giải mã
var giaima = function(query) {
    var bytes = crypto.AES.decrypt(query, 'tu1den10')
        // Chuyển sang chuỗi gốc
    var message_decode = bytes.toString(crypto.enc.Utf8);
    return (message_decode);
}

//  khach hang dang nhap
var loginCustomer = function(user, callback) {
    var UserName = kytudac_biet(user.inputTaikhoan)

    var Password = kytudac_biet(user.inputPassword);
    var password_code = mahoa(Password);

    var query = "SELECT COUNT(MaKhachhang) as tontai, MaKhachhang,HoTen,SDT,Email,DiaChi,Password from khachhang where Email='" + UserName + "'  or username='" + UserName + "' ";
    console.log(query);
    connection.query(query, function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows[0].tontai == "0") {
            var tontai = 0
        } else {
            if (giaima(rows[0].Password) == giaima(password_code)) {
                var tontai = 1
            } else {
                var tontai = 0
            }
        }

        callback(tontai, rows)
    });
}




var checkCustomer = function(user, callback) {
    if (user.inputemail != null || customer.inputemail != "") {
        var Email = "'" + kytudac_biet(user.inputemail) + "'";
    } else {
        var Email = "''";
    }
    if (user.inputTaikhoan != null) {
        var UserName = "'" + kytudac_biet(user.inputTaikhoan) + "'";
    } else {
        var UserName = "''";
    }
    var query = "SELECT COUNT(MaKhachhang) as tontai from khachhang where  (username=" + UserName + ") or (Email=" + Email + ")";
    console.log(query);
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

}

/// them moi khach hang

var insertCustomer = function(customer, callback) {
    checkCustomer(customer, function(tontai) {
        if (tontai == 1) {
            var err = 2
            console.log(err);
            var MaKhachhang = "null";
            console.log(MaKhachhang);
            callback(err, MaKhachhang);
        } else {
            var HoTen = kytudac_biet(customer.inputName);
            var SDT = kytudac_biet(customer.inputSdt);
            if (customer.inputemail != null && customer.inputemail != "") {

                var Email = "'" + kytudac_biet(customer.inputemail) + "'";
            } else {
                var Email = null;
            }
            if (customer.inputTaikhoan != null) {
                var UserName = "'" + kytudac_biet(customer.inputTaikhoan) + "'";
            } else {
                var UserName = null;
            }
            if (customer.inputPassword != null) {
                var Password = kytudac_biet(customer.inputPassword);
                var password_code = mahoa(Password);
            } else {
                var Password = "";
                var password_code = mahoa(Password);
            }
            var Diachi = kytudac_biet(customer.inputDiachi);
            query = "INSERT INTO `khachhang` (`MaKhachhang`, `HoTen`, `SDT`, `Email`, `DiaChi`, `UserName`, `Password`) VALUES (NULL, '" + HoTen + "', '" + SDT + "', " + Email + ", '" + Diachi + "', " + UserName + ", '" + password_code + "')";
            console.log(query);
            connection.query(query, function(err, rows) {
                if (err) {
                    var err = 1
                    var MaKhachhang = "null";
                } else {
                    console.log('succes');
                    var err = 0;
                    var MaKhachhang = rows.insertId;
                    console.log(MaKhachhang);
                }
                callback(err, MaKhachhang);
            });
        }
    })
}

// cập nhật thông tin khách hàng
var updateCustomer = function(customer, id, callback) {

    var HoTen = kytudac_biet(customer.inputName);
    var SDT = kytudac_biet(customer.inputSdt);
    if (customer.inputemail != null && customer.inputemail != "") {

        var Email = "'" + kytudac_biet(customer.inputemail) + "'";
    } else {
        var Email = null;
    }
    var Diachi = kytudac_biet(customer.inputDiachi);
    query = "UPDATE `khachhang` SET `HoTen` = '" + HoTen + "', `SDT` = '" + SDT + "', `Email` = " + Email + ", `DiaChi` = '" + Diachi + "' WHERE `khachhang`.`MaKhachhang` = '" + id + "';";
    console.log(query);
    connection.query(query, function(err, rows) {
        if (err) {
            var err = 1
            console.log('fail');
        } else {
            console.log('succes');
            var err = 0;
        }
        callback(err, id);
    });
}
module.exports = {
    loginCustomer: loginCustomer,
    insertCustomer: insertCustomer,
    updateCustomer: updateCustomer

};