var sql = require("mysql2");
var conf = require("./conf").database;

var pool = sql.createPool(conf);
var getConn = function(cb) {
	pool.getConnection(function(perr, conn) {
		cb(perr, conn);
	});
};

module.exports = getConn;
