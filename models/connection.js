var mysql = require("mysql");

// Thiết lập kết nối CSDL dùng Connection
var dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || '3306',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'quanlybanhang',
    multipleStatements: true
};
var connection = mysql.createConnection(dbConfig);

connection.connect(function(err) {
    if (err) {
        console.error('[DB] ' + err.message);
        return;
    }
    console.log('[DB] Connected to ' + dbConfig.user + '@' + dbConfig.host + ':' + dbConfig.port);
});

module.exports = connection;