var thread_id = parseInt(/\/[0-9]+/.exec(window.location.pathname)[0].substr(1), 10);
$(document).ready(function() {

	$("#page").append("<a href='/catalogue'>&lt; back</a>");

	var form = document.createElement("form");
	var subject = document.createElement("input");
	var content = document.createElement("textarea");
	var anon = document.createElement("input");
	var button = document.createElement("button");

	form.name = "post";
	subject.type = "text";
	anon.type = "checkbox";
	button.type = "submit";

	content.form = "post";
	content.id = "area";
	content.cols = 68;
	content.rows = 3;
	content.wrap = "hard";

	form.onsubmit = function() {
		var data = {
			thread_id: thread_id,
			subject: subject.value,
			content: content.value,
			anon: anon.checked
		};
		$.post("/api/posts", data, function() {
			window.location.assign("/thread/"+thread_id);
		});
		return false;
	};

	$(button).append("POST");
	$(form).append("Subject: ");
	$(form).append(subject);
	$(form).append(anon);
	$(form).append("Post anonymously?");
	$(form).append(button);

	$("#page").append(form);
	$("#page").append(content);

	var postdiv = document.createElement("div");
	postdiv.id = "postlist";
	$("#page").append(postdiv);

	refresh(postdiv);
	setInterval(refresh, 60000, postdiv);
});

function refresh(postdiv) {
	$.get("/api/posts/"+thread_id, function(data) {
		postdiv.innerHTML = "";
		for(var i = 0; i < data.length; i++) {
			var id = data[i].id;
			data[i].date = data[i].date.slice(0, 19).replace("T", " ");
			var div = document.createElement("div");
			div.className = "post";
			div.id = id;

			var user = document.createElement("span");
			user.className = "user";
			user.innerHTML = esc(data[i].username);
			$(div).append(user);

			var subject = data[i].subject ? document.createElement("span") : null;
			if(subject) {
				subject.className = "subject";
				subject.innerHTML = esc(data[i].subject);
				$(div).append(" | ");
				$(div).append(subject);
			}

			$(div).append(" | " + data[i].date);

			var idlink = document.createElement("a");
			idlink.className = "idlink";
			idlink.href = "#"+data[i].id;
			var replylink = document.createElement("a");
			replylink.className = "idlink";
			replylink.href = "javascript:insertLnk("+data[i].id+");";
			idlink.innerHTML = "no.";
			replylink.innerHTML = data[i].id;
			$(div).append(" | ");
			$(div).append(idlink);
			$(div).append(" ");
			$(div).append(replylink);

			$(div).append("<br>" + newl(lnk(grn(esc(data[i].content)))));

			$(postdiv).append(div);
		}
	});
}

// Functions for escaping and converting to quotes, links, etc.
function esc(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
function grn(str) {
	var arr = str.match(/^(?!&gt;&gt;)&gt;(.*)$/gm);
	if(arr) {
		for(var i in arr) {
			var tmp = "<span class='green'>"+arr[i]+"</span>";
			str = str.replace(arr[i], tmp);
		}
	}
	return str;
}
function lnk(str) {
	var arr = str.match(/&gt;&gt;\d+/gm);
	if(arr) {
		for(var i in arr) {
			var tmp = arr[i].substr(8);
			tmp = "<a class='quote' href='#"+tmp+"'>"+arr[i]+"</a>";
			str = str.replace(arr[i], tmp);
		}
	}
	return str;
}
function newl(str) {
	return str.replace(/\r?\n/gm, "<br>");
}

function insertLnk(id) {
	document.getElementById("area").value += ">>"+id+" ";
}
