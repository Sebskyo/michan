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

exports.read = function(cb) {
	conn.query("select * from posts", function(err, rows) {
		if(!err) cb(null, rows);
		else cb(true);
	})
};
exports.readThread = function(id, cb) {
	conn.query("select posts.id, posts.user_id, posts.subject, posts.content, posts.image, posts.date, users.username from posts inner join users on posts.user_id=users.id where thread_id="+id+" order by posts.id", function(err, rows) {
		if(!err) {
			for(var i = 0; i < rows.length; i++) {
				rows[i].date = new Date(rows[i].date.getTime() - offset).toISOString().slice(0, 19).replace("T", " ");
			}
			cb(null, rows);
		}
		else cb(true);
	});
};
