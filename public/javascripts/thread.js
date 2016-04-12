var thread_id = parseInt(/\/\d+/.exec(window.location.pathname)[0].substr(1), 10); // Current thread is fetched from URL
$(document).ready(function() {
	$("#page").append("<a class='navlink' href='/catalogue'>&lt; back</a>");

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
		data.append("thread_id", thread_id);
		data.append("subject", subject.value);
		data.append("content", content.value);
		data.append("anon", anon.checked);
		// Sanity checks
		if(img.files[0] != undefined) {
			data.append("image", img.files[0]);
		}
		if(content.value) {
			// Actual POST request is sent
			$.ajax({
				url:"/api/posts",
				type:"POST",
				data:data,
				processData:false,
				contentType:false,
				success:function() {
					window.location.assign("/thread/"+thread_id);
				},
				error:function() {
					console.log("Error uploading data to server.");
				}
			});
		}
		else alert(
			"missing information\n" +
			"content: " + content.value);
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

	// Div containing list of posts
	var postdiv = document.createElement("div");
	postdiv.id = "postlist";
	$("#page").append(postdiv);

	// Defines when postlist is reconstructed (auto-reloading)
	refresh(postdiv);
	setInterval(refresh, 60000, postdiv);

	$("#page").append("<a class='navlink' id='totop' href='#'>^ top</a>");

	// "to top" button, with a fancy smooth effect
	$("#totop").on("click", function(e){
		e.preventDefault();
		var target= $("#page");
		$("html, body").stop().animate({
			scrollTop: target.offset().top
		}, 1000);
	});
});

// Reconstruct postlist
function refresh(postdiv) {
	$.get("/api/threads/"+thread_id, function(data) {
		// If data isn't received, user is redirected back to the catalogue
		if(data[0]) {
			// Clear div and start the loop
			postdiv.innerHTML = "";
			for(var i = 0; i < data.length; i++) {
				// Getting needed information
				var id = data[i].id;
				if(data[i].user_id == 1)
					data[i].username = data[i].username + " ## ADMIN";
				data[i].date = data[i].date.slice(0, 19).replace("T", " ");
				var div = document.createElement("div");
				div.className = "post";
				div.id = id;

				var infodiv = document.createElement("div");
				infodiv.className = "info";

				// Create a link to the user's "profile" except if user is anonymous
				if(data[i].user_id != "2") {
					var user = document.createElement("a");
					user.className = "user";
					user.href = "/users/"+data[i].user_id;
				}
				else {
					var user = document.createElement("span");
					user.className = "user";
				}
				user.innerHTML = esc(data[i].username);
				$(infodiv).append(user);

				// If post has a subject, put it in the info div
				var subject = data[i].subject ? document.createElement("span") : null;
				if(subject) {
					subject.className = "subject";
					subject.innerHTML = esc(data[i].subject);
					$(infodiv).append(" | ");
					$(infodiv).append(subject);
				}

				$(infodiv).append(" | " + data[i].date); // Time of post

				// Post ID link and reply link
				// ID link is a link the the specific post in that thread (/thread/id#postid)
				// Reply link puts a link to the post in the text area in the form (">>id" in form)
				var idlink = document.createElement("a");
				idlink.className = "idlink";
				idlink.href = "#"+data[i].id;
				var replylink = document.createElement("a");
				replylink.className = "idlink";
				replylink.href = "javascript:insertLnk("+data[i].id+");";
				idlink.innerHTML = "no.";
				replylink.innerHTML = data[i].id;
				$(infodiv).append(" | ");
				$(infodiv).append(idlink);
				$(infodiv).append(" ");
				$(infodiv).append(replylink);

				$(div).append(infodiv);

				// Create image if post has one
				if(data[i].image) {
					var link = document.createElement("a");
					var img = document.createElement("img");
					link.target="_blank";
					img.src = link.href = "/images/" + data[i].image;
					img.className = "postimg";
					$(link).append(img);
					$(div).append(link);
				}

				// Escape string, then create the different features (seperate functions, listed below), then add it to the page
				$(div).append(newl(emote(hlnk(lnk(grn(esc(data[i].content)))))));

				$(postdiv).append(div);
			}
		}
		else {
			window.location.assign("/catalogue");
		}
	});
}

// Functions for escaping and converting to quotes, links, etc.
// Escapes HTML characters
function esc(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
// Converts quotes to being green text (any line starting with ">" becomes green)
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
// Converts references to other posts to links to other posts (">>id" becomes a link to that id, with same text)
function lnk(str) {
	var arr = str.match(/&gt;&gt;\d+/gm);
	if(arr) {
		for(var i in arr) {
			var tmp = arr[i].substr(8);
			var id = arr[i].replace("&gt;&gt;", "");
			tmp = "<a class='quote' onmouseenter='focuspost("+id+")' onmouseleave='unfocuspost("+id+")' href='#"+tmp+"'>"+arr[i]+"</a>";
			str = str.replace(arr[i], tmp);
		}
	}
	return str;
}
// Creates links to other websites
function hlnk(str) {
	var arr = str.match(/(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/gm);
	if(arr) {
		for(var i in arr) {
			var tmp = arr[i].replace("http:", "https:");
			tmp = "<a href='"+tmp+"'>"+tmp+"</a>";
			str = str.replace(arr[i], tmp);
		}
	}
	return str;
}
// Creates emotes from text encapsulated in colons (fx ":emote:"), but only if the emote exists (list received from server)
function emote(str) {
	var arr = str.match(/\:\w+\:/gm);
	if(arr) {
		for(var i in arr) {
			var tmp = arr[i].slice(1, -1).toLowerCase();
			if(emotes.indexOf(tmp) != -1) {
				tmp = "<img width='20px' height='20px' src='/images/emote/"+tmp+".png'>";
				str = str.replace(arr[i], tmp);
			}
		}
	}
	return str;
}
// Converts newlines ("\r\n" when received from a Windows machine, "\n" otherwise) to break tags
function newl(str) {
	return str.replace(/\r?\n/gm, "<br>");
}

// Function to insert link to post in text field
function insertLnk(id) {
	document.getElementById("area").value += ">>"+id+" ";
}
// Function activated when hovering over a link to another post
function focuspost(id) {
	document.getElementById(id).className = "post focussed";
}
// Function activated when no longer hovering over a link to another post
function unfocuspost(id) {
	document.getElementById(id).className = "post";
}
