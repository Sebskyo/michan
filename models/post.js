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
	console.log(sql + " ||| " + thread);

	if(thread) {
		conn.query(sql, function(err, rows) {
			if(!err) cb(null, rows.insertId);
			else cb(err);
		});
	}
	else {
		conn.query("insert into threads (id) values (null)", function(err, rows) {
			if(!err) {
				thread = rows.insertId;
				console.log(thread);
				sql = sql.replace(/(?:\()null/, "("+thread);
				console.log(sql);
				conn.query(sql, function (err, rows) {
					if (!err) cb(null, rows.insertId);
					else cb(err);
				});
			}
			else cb(err);
		});
	}
};

exports.read = function(cb) {
	conn.query("select * from posts", function(err, rows) {
		if(!err) cb(null, rows);
		else cb(err);
	})
};
exports.readThread = function(id, cb) {
	conn.query("select * from posts where thread_id="+id, function(err, rows) {
		if(!err) cb(null, rows);
		else cb(err);
	});
};