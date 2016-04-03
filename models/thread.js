var express = require("express");
var conn = require("../db");

exports.create = function(cb) {
	conn.query("insert into threads default values", function(err, rows) {
		if(!err)
			cb(null, rows.insertId);
		else
			cb(err);
	});
};

exports.read = function(cb) {
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
				else cb(err);
			});
		}
		else cb(err);
	});
};

exports.delete = function(id, cb) {
	conn.query("delete from threads where id="+id, function(err) {
		if(!err)
			cb(null);
		else
			cb(err);
	})
};