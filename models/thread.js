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

// TODO: add joining with posts for more info (image, subject)
exports.read = function(id, cb) {
	conn.query("select subject, date, image from posts", function(err, rows) {
		if(!err)
			cb(null, rows);
		else
			cb(err);
	});
};
exports.readAll = function(cb) {
	conn.query("select * from threads", function(err, rows) {
		if(!err)
			cb(null, rows);
		else
			cb(err);
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