var express = require("express");
var db = require("../db");
var hash = require("password-hash");

// Creating a user
exports.create = function(data, cb) {
	// Needed variables
	var username = data.username;
	var name = data.name;
	var password = hash.generate(data.password);
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		// Insert into users with needed data
		conn.query("insert into users (username, name, password) values (\""+username+"\", \""+name+"\", \""+password+"\")", function(err, rows) {
			conn.release();
			if(!err) cb(null, rows.insertId);
			else cb(true);
		});
	});
};

// Getting information about a specific user
exports.read = function(id, cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		// Select information in the user table, except password
		conn.query("select id, username, name from users where id="+id, function(err, rows) {
			if(!err && rows[0] != undefined)
				// Get number of posts this user has created (excludes anonymous posts)
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
// Getting information about all users
exports.readAll = function(cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		// Select information in the user table, except password
		conn.query("select id, username, name from users", function(err, rows) {
			conn.release();
			if(!err) cb(null, rows);
			else cb(true);
		});
	});
};
// Password verification
exports.pwVerify = function(data, cb) {
	var user = data.user;
	var password = data.password;
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		// Select password
		conn.query("select password from users where username='"+user+"'", function(err, rows) {
			conn.release();
			if(!err && rows[0]) {
				// Verifying password
				var stored = rows[0].password;
				if(hash.verify(password, stored)) cb(null);
				else cb(true);
			}
			else cb(true);
		});
	});
};
// Getting just the ID for a given username
exports.getID = function(user, cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		// Select id matching given username
		conn.query("select id from users where username='"+user+"'", function(err, rows) {
			conn.release();
			if(!err && rows[0]) cb(null, rows[0].id);
			else cb(true);
		});
	});
};

// There was not enough time to implement updating/deleting users
