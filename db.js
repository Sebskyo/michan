var sql = require("mysql2");
var conf = require("./conf");

var conn = sql.createConnection(conf.db);

module.exports = conn;
