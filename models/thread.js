var express = require("express");
var conn = require("../db");
var offset = new Date().getTimezoneOffset()*60000;

exports.read = function(id, cb) {
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

exports.readAll = function(cb) {
	conn.query("select threads.id, max(posts.date) as date from posts left join threads on posts.thread_id=threads.id group by threads.id order by date desc;", function(err, rows) {
		if(!err) {
			conn.query("select thread_id, subject, image, min(id) from posts group by thread_id;", function(err, info) {
				if(!err) {
					var arr = [];
					for (var i in rows) {
						var data = {id: rows[i].id};
						for (var j in info) {
							if (rows[i].id == info[j].thread_id) {
								data.subject = info[j].subject;
								data.image = info[j].image;
							}
						}
						arr.push(data);
					}
					cb(null, arr);
				}
				else cb(true);
			});
		}
		else cb(true);
	});
};

exports.delete = function(id, cb) {
	conn.query("delete from posts where thread_id="+id, function(err) {
		if(!err)
			conn.query("delete from threads where id="+id, function(err) {
				if(!err) cb(null);
				else cb(true);
			});
		else cb(true);
	});
};
