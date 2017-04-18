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

var kytudac_biet = function(query) {
        if (query == null || query == "" || query == undefined) {
            var str = " ";
            return (str);
        } else {
            var str = query;
            str = str.replace(/|\<|\>|\\/g, "");
            str = str.replace(/ + /g, "");
            str = str.trim();
            return (str);
        }
    }
    // xử lý ký tự đặc biệt
var kytudacbiet = function(query, callback) {
    var str = query;
    str = str.toLowerCase();
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    callback(str);
}


// lay danh sach sanpham moi
var getListSanPhamMoi = function(callback) {
        var query = 'SELECT sanpham.MaSanPham,sanpham.TenSanPham,sanpham.KhuyenMai,sanpham.GiaThuong,sanpham.GiaKhuyenMai,sanpham.Banner,sanpham.HinhBanner FROM sanpham order by MaSanPham desc limit 20';
        connection.query(query, function(err, rows) {
            if (err) throw err;
            hinhanh.getListHinhSanPham(function(hinh) {
                getBanner(function(Banner) {
                    getListBanChay(function(sanphambanchay) {
                        callback(rows, hinh, Banner, sanphambanchay);
                    })
                })
            });

        });
    }
    // danh sach san pham bán chay
var getListBanChay = function(callback) {
        var query = 'SELECT sanpham.MaSanPham,sanpham.TenSanPham,sanpham.KhuyenMai,sanpham.GiaThuong,sanpham.GiaKhuyenMai,sanpham.Banner,sanpham.HinhBanner,sanpham.LuotMua FROM sanpham order by luotmua desc limit 10';
        connection.query(query, function(err, rows) {
            if (err) throw err;
            callback(rows);

        });
    }
    /// danh sach banner
var getBanner = function(callback) {
    var query = "SELECT sanpham.MaSanPham,sanpham.TenSanPham,sanpham.GiaThuong,sanpham.GiaKhuyenMai,sanpham.Banner,sanpham.HinhBanner FROM sanpham where Banner='true' ";
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
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

/// lấy tất cả sản phẩm
var getAllSanPham = function(callback) {
        var query = "SELECT * FROM sanpham ";
        console.log("query");
        connection.query(query, function(err, sp) {
            if (err) throw err;
            callback(sp)
        });
    }
    // san pham theo loai sanpham
var getListSanPhamTheoLoai = function(id, callback) {
    var query = "SELECT loaihanghoa.TenLoai,sanpham.MaSanPham,sanpham.TenSanPham,sanpham.GiaThuong,sanpham.GiaKhuyenMai,sanpham.LoaiSanPham,sanpham.KhuyenMai FROM sanpham INNER JOIN loaihanghoa ON sanpham.LoaiSanPham = loaihanghoa.MaLoai where LoaiSanPham ='" + id + "'";
    console.log(query);
    connection.query(query, function(err, rows) {
        if (err) throw err;
        callback(rows);
    });
}





// list sản phẩm admin
var getListSanPhamAll = function(callback) {
        var query = "SELECT   nhacungcap.TenNhaCungCap,  sanpham.MaSanPham,  sanpham.TenSanPham,  loaihanghoa.TenLoai,  sanpham.LoaiSanPham,  sanpham.XuatXu,  sanpham.GiaThuong,  sanpham.GiaKhuyenMai,  sanpham.GioiThieu,  sanpham.NhaCungCap,  sanpham.TinhTrang,  sanpham.ThongTin,  sanpham.KhuyenMai,  sanpham.ThuongHieu,  sanpham.LuotMua,  sanpham.Banner,  sanpham.HinhBanner FROM sanpham  INNER JOIN loaihanghoa    ON sanpham.LoaiSanPham = loaihanghoa.MaLoai  INNER JOIN nhacungcap    ON sanpham.NhaCungCap = nhacungcap.MaNhaCungCap";
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
                var query = "SELECT sanpham.MaSanPham,sanpham.TenSanPham,sanpham.GiaThuong,sanpham.GiaKhuyenMai,sanpham.LoaiSanPham,sanpham.KhuyenMai FROM sanpham WHERE TenSanPham  like '%" + string + "%' or TenSanPham  like '%" + string1 + "%'";
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
    /// sản phẩm cùng loại
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

//  xóa sản phẩm
var deleteSanpham = function(id) {
    var query = "DELETE FROM sanpham WHERE sanpham.MaSanPham = " + id + ";";
    console.log(query)
    connection.query(query, function(err, rows) {
        if (err) console.log('fail');
        else console.log('success');
    });
};
var addSanpham = function(req) {
    var values = [
        [
            null,
            kytudac_biet(req.body.inputTenSP),
            kytudac_biet(req.body.selectLoaiSP),
            kytudac_biet(req.body.inputXuatXuSP),
            kytudac_biet(req.body.inputGiaThuongSP),
            kytudac_biet(req.body.inputGiaKhuyenMaiSP),
            kytudac_biet(req.body.inputGioiThieuSP),
            kytudac_biet(req.body.selectNCCSP),
            kytudac_biet(req.body.inputTinhTrangSP),
            kytudac_biet(req.body.inputThongTinSP),
            kytudac_biet(req.body.inputKhuyenMaiSP),
            kytudac_biet(req.body.inputThuongHieuSP),
            kytudac_biet(req.body.inputBannerSP),
            "/dist/img/" + req.files.inputHinhSP.name
        ]
    ];


    console.log(values);
    var query = "INSERT INTO `sanpham` (`MaSanPham`, `TenSanPham`, `LoaiSanPham`, `XuatXu`, `GiaThuong`, `GiaKhuyenMai`, `GioiThieu`, `NhaCungCap`, `TinhTrang`, `ThongTin`, `KhuyenMai`, `ThuongHieu` ,`Banner`, `HinhBanner`) VALUES ?";
    console.log(query)
    connection.query(query, [values], function(err, rows) {
        if (err) console.log('fail');
        else console.log('success');
    });
};
var updateSanpham = function(req, id) {
    console.log(id)
    if (req.files.inputupdateHinhSP != null) {
        var hinh = "/dist/img/" + req.files.inputupdateHinhSP.name
    } else {
        var hinh = "";
    }
    var values = {
        TenSanPham: kytudac_biet(req.body.inputupdateTenSP),
        LoaiSanPham: kytudac_biet(req.body.selectupdateLoaiSP),
        XuatXu: kytudac_biet(req.body.inputupdateTenSP),
        XuatXu: kytudac_biet(req.body.inputupdateXuatXuSP),
        GiaThuong: kytudac_biet(req.body.inputupdateGiaThuongSP),
        GiaKhuyenMai: kytudac_biet(req.body.inputupdateGiaKhuyenMaiSP),
        GioiThieu: kytudac_biet(req.body.inputupdateGioiThieuSP),
        TinhTrang: kytudac_biet(req.body.inputupdateTinhTrangSP),
        NhaCungCap: kytudac_biet(req.body.selectupdateNCCSP),
        ThongTin: kytudac_biet(req.body.inputupdateThongTinSP),
        KhuyenMai: kytudac_biet(req.body.inputupdateKhuyenMaiSP),
        ThuongHieu: kytudac_biet(req.body.inputupdateThuongHieuSP),
        Banner: kytudac_biet(req.body.inputupdateBannerSP),
        HinhBanner: hinh
    }
    console.log(values)
    var query = "UPDATE `sanpham` SET  ? Where ?";

    connection.query(query, [values, { MaSanPham: id }], function(err) {
        if (err) console.log('fail');
        else console.log('success');
    });

};

module.exports = {
    getBanner: getBanner,
    getListSanPhamMoi: getListSanPhamMoi,
    getChiTietSanPham: getChiTietSanPham,
    getListSanPhamTheoLoai: getListSanPhamTheoLoai,
    searchSanPham: searchSanPham,
    getSanPhamCungLoai: getSanPhamCungLoai,
    getListSanPhamMoi: getListSanPhamMoi,
    getListSanPhamAll: getListSanPhamAll,
    deleteSanpham: deleteSanpham,
    getAllSanPham: getAllSanPham,
    addSanpham: addSanpham,
    updateSanpham: updateSanpham
};