var express = require("express");
var db = require("../db");
var offset = new Date().getTimezoneOffset()*60000;

// Create posts, also handles new threads
exports.create = function(data, cb) {
	// Setting needed data
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

	// Posting in an existing thread
	if(thread && user) {
		db(function(perr, conn) {
			if(perr) {
				conn.release();
				cb(true);
				return;
			}
			// Insert into posts with needed data
			conn.query(sql, function(err, rows) {
				conn.release();
				if(!err) cb(null, rows.insertId);
				else cb(true);
			});
		});
	}
	// Posting a new thread
	else if(user) {
		db(function(perr, conn) {
			if(perr) {
				conn.release();
				cb(true);
				return;
			}
			// Insert into threads, get the new id back
			conn.query("insert into threads (id) values (null)", function(err, rows) {
				if(!err) {
					thread = rows.insertId;
					// Regex puts received thread id into sql string defined earlier
					sql = sql.replace(/(?:\()null/, "("+thread);
					// Insert into posts with need data
					conn.query(sql, function (err, rows) {
						conn.release();
						if (!err) cb(null, rows.insertId);
						else cb(true);
					});
				}
				else {
					conn.release();
					cb(true);
				}
			});
		});
	}
	else {
		cb(true);
	}
};

// Getting a single post
exports.read = function(id, cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		// Select post by id
		conn.query("select * from posts where id="+id, function(err, rows) {
			conn.release();
			if(!err) cb(null, rows);
			else cb(true);
		});
	});
};
// Getting all posts
exports.readAll = function(cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		// Select all posts
		conn.query("select * from posts", function(err, rows) {
			conn.release();
			if(!err) cb(null, rows);
			else cb(true);
		});
	});
};

// Delete a post
exports.delete = function(id, cb) {
	db(function(perr, conn) {
		if(perr) {
			conn.release();
			cb(true);
			return;
		}
		// Delete post by id
		conn.query("delete from posts where id="+id, function(err, rows) {
			conn.release();
			if(!err) cb(null);
			else cb(true);
		});
	});
};
