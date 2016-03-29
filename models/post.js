var express = require("express");
var conn = require("../db");

exports.create = function(data, cb) {
	var thread = data.thread_id;
	var user = data.user_id;
	var subject = data.subject;
	if(subject)
		subject = '"'+subject+'"';
	var content = '"'+data.content+'"';
	var image = data.image;
	if (image)
		image = '"'+image+'"';
	var anon = data.anon;
	var date = data.date;
	var sql = "insert into posts (thread_id, user_id, subject, content, image, anon, date) values ("+thread+","+user+","+subject+","+content+","+image+","+anon+","+date+")";

	if(thread && user) {
		conn.query(sql, function(err, rows) {
			if(!err) cb(null, rows.insertId);
			else cb(err);
		});
	}
	else if(user) {
		conn.query("insert into threads (id) values (null)", function(err, rows) {
			if(!err) {
				thread = rows.insertId;
				sql = sql.replace(/(?:\()null/, "("+thread);
				conn.query(sql, function (err, rows) {
					if (!err) cb(null, rows.insertId);
					else cb(err);
				});
			}
			else cb(err);
		});
	}
	else {
		cb(1);
	}
};

exports.read = function(cb) {
	conn.query("select * from posts", function(err, rows) {
		if(!err) cb(null, rows);
		else cb(err);
	})
};
exports.readThread = function(id, cb) {
	conn.query("select posts.id, posts.user_id, posts.subject, posts.content, posts.image, posts.anon, posts.date, users.username from posts inner join users on posts.user_id=users.id where thread_id="+id+" order by posts.id", function(err, rows) {
		if(!err) {
			for(var i = 0; i < rows.length; i++) {
				rows[i].username = rows[i].anon == 1 ? "Anonymous" : rows[i].username;
			}
			cb(null, rows);
		}
		else cb(err);
	});
};
