var express = require("express");
var db = require("../db");
var offset = new Date().getTimezoneOffset()*60000;

// Getting posts in a specified thread
exports.read = function(id, cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		// Select post and the user's username
		conn.query("select posts.id, posts.user_id, posts.subject, posts.content, posts.image, posts.date, users.username from posts inner join users on posts.user_id=users.id where thread_id="+id+" order by posts.id", function(err, rows) {
			conn.release();
			if(!err) {
				for(var i = 0; i < rows.length; i++) {
					rows[i].date = new Date(rows[i].date.getTime() - offset).toISOString().slice(0, 19).replace("T", " ");
				}
				cb(null, rows);
			}
			else cb(true);
		});
	});
};

// Getting a list of all threads
exports.readAll = function(cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		// Select threads ordered by their last post's date (in bump order)
		conn.query("select threads.id, max(posts.date) as date from posts left join threads on posts.thread_id=threads.id group by threads.id order by date desc;", function(err, rows) {
			if(!err) {
				// Select subject and image from the first post in all threads
				conn.query("select thread_id, subject, image, min(id) from posts group by thread_id;", function(err, info) {
					conn.release();
					if(!err) {
						// Combine the two query results into a single object
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
			else {
				conn.release();
				cb(true);
			}
		});
	});
};

// Deleting a thread and its posts
exports.delete = function(id, cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		// Delete the posts
		conn.query("delete from posts where thread_id="+id, function(err) {
			if(!err)
				// Delete the thread - this order ensures no conflicts regarding foreign keys
				conn.query("delete from threads where id="+id, function(err) {
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
