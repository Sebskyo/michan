var express = require("express");
var conn = require("../db");
var hash = require("password-hash");

exports.create = function(data, cb) {
	var username = data.username;
	var name = data.name;
	var password = hash.generate(data.password);
	conn.query("insert into users (username, name, password) values (\""+username+"\", \""+name+"\", \""+password+"\")", function(err, rows) {
		if(!err) cb(null, rows.insertId);
		else cb(err);
	});
};

exports.read = function(id, cb) {
	conn.query("select id, username, name from users where id="+id, function(err, rows) {
		if(!err)
			cb(null, rows);
		else
			cb(err);
	});
};
exports.readAll = function(cb) {
	conn.query("select id, username, name from users", function(err, rows) {
		if(!err) {
			cb(null, rows);
		}
		else
			cb(err);
	});
};
exports.pwVerify = function(data, cb) {
	var user = data.user;
	var password = data.password;
	conn.query("select password from users where username='"+user+"'", function(err, rows) {
		if(!err) {
			var stored = rows[0].password;
			if(hash.verify(password, stored)) cb(null);
			else cb(err);
		}
	});
};
exports.getID = function(user, cb) {
	conn.query("select id from users where username='"+user+"'", function(err, rows) {
		if(!err && rows[0].id) cb(null, rows[0].id);
		else cb(err);
	});
};

exports.update = function(data, cb) {
	var id = data.id;
	var username = data.username;
	var name = data.name;
	if(data.password) var password = hash.generate(data.password);

	if(!(!username && !name && !password)) {
		var sql = "";
		if(!!username) sql += "username=\""+username+"\",";
		if(!!name) sql += "name=\""+name+"\",";
		if(!!password) sql += "password=\""+password+"\",";
		sql = sql.slice(0,-1);
		sql = "update users set " + sql + " where id="+id;
		console.log(sql);

		conn.query(sql, function(err) {
			if(!err)
				cb(null);
			else
				cb(err);
		});
	}
	else
		cb(true);
};

exports.delete = function(id, cb) {
	conn.query("update set user_id=3 where user_id="+id, function(err) {
		if(!err)
			conn.query("delete from users where id="+id, function(err) {
				if(!err) cb(null);
				else cb(err);
		});
		else cb(err);
	});
};
