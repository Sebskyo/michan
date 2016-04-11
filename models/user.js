var express = require("express");
var db = require("../db");
var hash = require("password-hash");

exports.create = function(data, cb) {
	var username = data.username;
	var name = data.name;
	var password = hash.generate(data.password);
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		conn.query("insert into users (username, name, password) values (\""+username+"\", \""+name+"\", \""+password+"\")", function(err, rows) {
			conn.release();
			if(!err) cb(null, rows.insertId);
			else cb(true);
		});
	});
};

exports.read = function(id, cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		conn.query("select id, username, name from users where id="+id, function(err, rows) {
			if(!err && rows[0] != undefined)
				conn.query("select id from posts where user_id="+id, function(err, count) {
					conn.release();
					if(!err) {
						var posts = count[0] ? count.length : 0;
						var data = rows[0];
						data.count = posts;
						cb(null, data);
					}
					else cb(true);
				});
			else {
				conn.release();
				cb(true);
			}
		});
	});
};
exports.readAll = function(cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		conn.query("select id, username, name from users", function(err, rows) {
			conn.release();
			if(!err) cb(null, rows);
			else cb(true);
		});
	});
};
exports.pwVerify = function(data, cb) {
	var user = data.user;
	var password = data.password;
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		conn.query("select password from users where username='"+user+"'", function(err, rows) {
			conn.release();
			if(!err && rows[0]) {
				var stored = rows[0].password;
				if(hash.verify(password, stored)) cb(null);
				else cb(true);
			}
			else cb(true);
		});
	});
};
exports.getID = function(user, cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		conn.query("select id from users where username='"+user+"'", function(err, rows) {
			conn.release();
			if(!err && rows[0]) cb(null, rows[0].id);
			else cb(true);
		});
	});
};

exports.update = function(data, cb) {
	var id = data.id;
	var username = data.username;
	if(data.password) var password = hash.generate(data.password);

	if(!(!username && !name && !password)) {
		var sql = "";
		if(!!username) sql += "username=\""+username+"\",";
		if(!!password) sql += "password=\""+password+"\",";
		sql = sql.slice(0,-1);
		sql = "update users set " + sql + " where id="+id;
		console.log(sql);

		db(function(perr, conn) {
			if(perr) {
				conn.release();
				cb(true);
				return;
			}
			conn.query(sql, function(err) {
				conn.release();
				if(!err) cb(null);
				else cb(true);
			});
		});
	}
	else
		cb(true);
};

exports.delete = function(id, cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		conn.query("update set user_id=3 where user_id="+id, function(err) {
			if(!err)
				conn.query("delete from users where id="+id, function(err) {
					conn.release();
					if(!err) cb(null);
					else cb(true);
				});
			else {
				conn.release();
				cb(true);
			}
		});
	});
};
