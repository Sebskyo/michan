var reg, id;
// Finding id and making sure it's valid (ie. it's a number)
if(reg = /\/\d+/.exec(window.location.pathname)) {
	console.log(reg);
	id = parseInt(reg[0].substr(1), 10);
	console.log(id);
	if(id == NaN) window.location.assign("/users");
}
else window.location.assign("/users");

$(document).ready(function() {
	$("#page").append("<a href='/users'>&lt; back</a>");

	// GET request to get information of user and construct the page
	$.get("/api/users/"+id, function(data) {
		if(data.id && data.id != 2) {
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
