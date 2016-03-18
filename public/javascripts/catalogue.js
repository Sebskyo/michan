$(document).ready(function() {
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
			window.location.assign("http://localhost:3000/catalogue");
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
		var point;
		for(var i = 0; i < data.length; i++) {
			point = document.createElement("li");
			point.innerHTML = "id:"+data[i]["id"];
			$(list).append(point);
		}
		$("#page").append(list);
	});
});