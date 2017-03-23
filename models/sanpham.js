var connection = require('./connection');
var hinhanh = require('./hinhanh');


// hàm chuyển sang tiếng việt không dấu

var chuyenkhongdau = function(query, callback) {
    var str = query;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    callback(str);
}

var kytudacbiet = function(query, callback) {
    var str = query;
    str = str.toLowerCase();
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    callback(str);
}


// lay danh sach sanpham
var getListSanPhamMoi = function(callback) {
    var query = 'SELECT sanpham.MaSanPham,sanpham.TenSanPham,sanpham.GiaThuong,sanpham.GiaKhuyenMai,sanpham.Banner,sanpham.HinhBanner FROM sanpham order by MaSanPham desc';
    connection.query(query, function(err, rows) {
        if (err) throw err;
        hinhanh.getListHinhSanPham(function(hinh) {
            callback(rows, hinh);
        });

    });
}

// lấy thông tin chi tiết sản phẩm
var getChiTietSanPham = function(id, callback) {
        var query = "SELECT * FROM sanpham WHERE MaSanPham ='" + id + "'";
        console.log(query);
        connection.query(query, function(err, sp) {
            if (err) throw err;
            hinhanh.getListHinhSanPhamChiTiet(id, function(hinh) {
                callback(sp, hinh);
            });
        });
    }
    // san pham theo loai sanpham
var getListSanPhamTheoLoai = function(id, callback) {
    var query = "SELECT loaihanghoa.TenLoai,sanpham.MaSanPham,sanpham.TenSanPham,sanpham.GiaThuong,sanpham.GiaKhuyenMai,sanpham.LoaiSanPham FROM sanpham INNER JOIN loaihanghoa ON sanpham.LoaiSanPham = loaihanghoa.MaLoai where LoaiSanPham ='" + id + "'";
    console.log(query);
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}

// tìm kiếm sản phẩm bằng tên
var searchSanPham = function(keyword, callback) {
    chuyenkhongdau(keyword, function(string) {
        kytudacbiet(keyword, function(string1) {
            var query = "SELECT sanpham.MaSanPham,sanpham.TenSanPham,sanpham.GiaThuong,sanpham.GiaKhuyenMai,sanpham.LoaiSanPham FROM sanpham WHERE TenSanPham  like '%" + string + "%' or TenSanPham  like '%" + string1 + "%'";
            console.log(query);
            connection.query(query, function(err, sp) {
                if (err) throw err;
                hinhanh.getListHinhSanPham(function(hinh) {
                    callback(sp, hinh);
                });
            });
        });

    })

}

var getSanPhamCungLoai = function(id, callback) {
    var query = "SELECT sanpham.MaSanPham,sanpham.TenSanPham,sanpham.GiaThuong,sanpham.GiaKhuyenMai FROM sanpham WHERE LoaiSanPham=(SELECT s.LoaiSanPham from sanpham s WHERE s.MaSanPham='" + id + "') AND MaSanPham <> '" + id + "' limit 5";
    console.log(query);
    connection.query(query, function(err, sp) {
        if (err) throw err;
        hinhanh.getListHinhSanPham(function(hinh) {
            callback(sp, hinh);
        });
    });
}



module.exports = {
    getListSanPhamMoi: getListSanPhamMoi,
    getChiTietSanPham: getChiTietSanPham,
    getListSanPhamTheoLoai: getListSanPhamTheoLoai,
    searchSanPham: searchSanPham,
    getSanPhamCungLoai: getSanPhamCungLoai

};