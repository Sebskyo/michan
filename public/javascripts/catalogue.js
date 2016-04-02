$(document).ready(function() {
	$("#page").append("<a href='/'>&lt; back</a>");

	var form = document.createElement("form");
	var subject = document.createElement("input");
	var content = document.createElement("textarea");
	var anon = document.createElement("input");
	var img = document.createElement("input");
	var button = document.createElement("button");

	form.name = "post";
	subject.type = "text";
	anon.type = "checkbox";
	anon.checked = true;
	img.type = "file";
	img.name = "img_upload";
	button.type = "submit";

	content.id = "area";
	content.cols = 100;
	content.rows = 5;
	content.wrap = "hard";

	form.onsubmit = function() {
		var data = new FormData();
		data.append("subject", subject.value);
		data.append("content", content.value);
		data.append("anon", anon.checked);
		data.append("image", img.files[0]);
		console.log(data);
		$.ajax({
			url:"/api/posts",
			type:"POST",
			data:data,
			processData:false,
			contentType:false,
			success:function() {
				window.location.assign("/catalogue");
			},
			error:function() {
				console.log("Error uploading data to server.");
			}
		});
		return false;
	};

	$(button).append("POST");
	$(form).append("Subject: ");
	$(form).append(subject);// $(form).append("<br>");
	$(form).append(anon);
	$(form).append("Post anonymously? ");// $(form).append("<br>");
	$(form).append(img); $(form).append("<br>");
	$(form).append(content); $(form).append("<br>");
	$(form).append(button);

	$("#page").append(form);

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
