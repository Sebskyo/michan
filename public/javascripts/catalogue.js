$(document).ready(function() {
	$("#page").append("<a href='/'>&lt; back</a>");

	// Construct form
	var form = document.createElement("form");
	var subject = document.createElement("input");
	var content = document.createElement("textarea");
	var anon = document.createElement("input");
	var img = document.createElement("input");
	var button = document.createElement("button");

	form.name = "post";
	subject.type = "text";
	subject.placeholder = "max 32 characters";
	anon.type = "checkbox";
	img.type = "file";
	img.name = "img_upload";
	button.type = "submit";

	content.id = "area";
	content.cols = 100;
	content.rows = 5;
	content.wrap = "hard";

	// Form submit definition
	form.onsubmit = function() {
		// Create data payload
		var data = new FormData();
		data.append("subject", subject.value);
		data.append("content", content.value);
		data.append("anon", anon.checked);
		data.append("image", img.files[0]);
		console.log(subject.value);
		console.log(content.value);
		// Sanity checks
		if(content.value && subject.value && img.files[0]) {
			// Actual POST request is sent
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
		}
		else {
			alert(
				"missing information\n" +
				"subject: " + subject.value + "\n" +
				"content: " + content.value + "\n" +
				"image: " + !!img.files[0]);
			window.location.assign("/catalogue");
		}
		return false;
	};

	// Add form to page
	$(button).append("POST");
	$(form).append("Subject: ");
	$(form).append(subject);
	$(form).append(anon);
	$(form).append("Post anonymously? ");
	$(form).append(img); $(form).append("<br>");
	$(form).append(content); $(form).append("<br>");
	$(form).append(button);

	$("#page").append(form);

	$("#page").append("<hr style='width: 1056px; float: left;'>");

	// Getting threads and constructing the catalogue
	$.get("/api/threads", function(data) {
		var list = document.createElement("div");
		list.id = "list";
		for(var i in data) {
			var link = document.createElement("a");
			link.href = "/thread/"+data[i].id;
			var thread = document.createElement("div");
			thread.className = "thread";
			var img = document.createElement("img");
			var imgdiv = document.createElement("div");
			imgdiv.className = "imgdiv";
			img.src = "/images/"+data[i].image;
			$(imgdiv).append(img);
			$(thread).append(imgdiv);
			//$(thread).append("<br>");
			$(thread).append("<p>"+data[i].subject+"</p>");
			$(link).append(thread);
			$(list).append(link);
		}
		$("#page").append(list);
	});
});

// Escapes HTML characters
function esc(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;")
		.replace(/\r?\n/, "<br>");
}
