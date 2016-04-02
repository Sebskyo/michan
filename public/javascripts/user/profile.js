var reg, id;
if(reg = /\/\d+/.exec(window.location.pathname)) {
	id = parseInt(reg[0].substr(1), 10);
	if(id == NaN) window.location.assign("/users");
}

$(document).ready(function() {
	$("#page").append("<a class='navlink' href='/users'>&lt; back</a>");
	$.get("/api/users/"+id, function(data) {
		if(data && data.id != 2 && data.id != 3) {
			var count = data.count;
			var username = data.username;
			var name = data.name;

			var title = document.createElement("div");
			var user = document.createElement("div");
			var posts = document.createElement("div");
			title.id = "title";
			user.className = "info";
			posts.className = "info";

			title.innerHTML = name;
			user.innerHTML = "username: " + username;
			posts.innerHTML = "# of posts: " + count;

			$("#page").append(title);
			$("#page").append(user);
			$("#page").append(posts);
		}
		else window.location.assign("/users");
	});
});
