$(document).ready(function() {
	$("#page").append("<a href='/'>&lt; back</a>");

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
	content.cols = 68;
	content.rows = 3;

	form.onsubmit = function() {
		var data = {
			subject: subject.value,
			content: content.value,
			anon: anon.checked
		};
		$.post("/api/posts", data, function() {
			window.location.assign("/catalogue");
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

	$.get("/api/threads", function(data) {
		var list = document.createElement("ul");
		var point, link;
		for(var i = 0; i < data.length; i++) {
			point = document.createElement("li");
			link = document.createElement("a");
			link.href = "/thread/"+data[i].id;
			link.innerHTML = "id:"+data[i].id;
			$(point).append(link);
			$(list).append(point);
		}
		$("#page").append(list);
	});
});

function esc(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;")
		.replace(/\r?\n/, "<br>");
}
