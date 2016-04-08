var express = require("express");
var conn = require("../db");
var offset = new Date().getTimezoneOffset()*60000;

exports.create = function(data, cb) {
	var thread = data.thread_id;
	var user = data.anon ? 2 : data.user_id;
	var subject = data.subject;
	if(subject)
		subject = '"'+subject+'"';
	var content = '"'+data.content+'"';
	var image = data.image;
	if (image)
		image = '"'+image+'"';
	var date = "'"+new Date(Date.now()-offset).toISOString().slice(0, 19).replace("T"," ")+"'";
	var sql = "insert into posts (thread_id, user_id, subject, content, image, date) values ("+thread+","+user+","+subject+","+content+","+image+","+date+")";

	if(thread && user) {
		conn.query(sql, function(err, rows) {
			if(!err) cb(null, rows.insertId);
			else cb(true);
		});
	}
	else if(user) {
		conn.query("insert into threads (id) values (null)", function(err, rows) {
			console.log("query done");
			if(!err) {
				console.log("no errors doing query");
				thread = rows.insertId;
				sql = sql.replace(/(?:\()null/, "("+thread);
				console.log("sql: ", sql);
				conn.query(sql, function (err, rows) {
					console.log("post insertion query done");
					if (!err) cb(null, rows.insertId);
					else cb(true);
				});
			}
			else cb(true);
		});
	}
	else {
		cb(true);
	}
};

exports.read = function(id, cb) {
	conn.query("select * from posts where id="+id, function(err, rows) {
		if(!err) cb(null, rows);
		else cb(true);
	})
};
exports.readAll = function(cb) {
	conn.query("select * from posts", function(err, rows) {
		if(!err) cb(null, rows);
		else cb(true);
	})
};
