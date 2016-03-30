var sql = require("mysql2");
var conf = require("./conf").database;

var conn = sql.createConnection(conf);

module.exports = conn;
