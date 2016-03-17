var sql = require("mysql2");
var conn = sql.createConnection({
	host:"localhost",
	user:"root",
	password:"testo",
	database:"michan"
});

module.exports = conn;