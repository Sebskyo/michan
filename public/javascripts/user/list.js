$(document).ready(function() {
	$("#page").append("<a style='margin-left: 20px;' href='/'>&lt; back</a>");

	var menu = document.createElement("div");
	menu.className = "menu";

	// Getting data needed for constructing list of users
	$.get("/api/users", function(data) {
		// If logged in
		if(data.you) {
			// Constructing link to user's page
			var you = data.you;
			var youlnk = document.createElement("a");
			var youdiv = document.createElement("div");
			youlnk.href = "/users/"+findID(data.data, you);
			youdiv.className = "menu-item";
			youdiv.innerHTML = you;
			$(youlnk).append(youdiv);

			// Constructing link to logout
			var outlnk = document.createElement("a");
			var outdiv = document.createElement("div");
			outlnk.href = "/users/logout";
			outdiv.className = "menu-item";
			outdiv.innerHTML = "logout";
			$(outlnk).append(outdiv);

			// Appending the links
			$(menu).append(youlnk);
			$(menu).append(outlnk);
		}
		// If not logged in
		else {
			// Constructing link to login page
			var inlnk = document.createElement("a");
			var indiv = document.createElement("div");
			inlnk.href = "/users/login";
			indiv.className = "menu-item";
			indiv.innerHTML = "login";
			$(inlnk).append(indiv);

			// Constructing link to sign up page
			var uplnk = document.createElement("a");
			var updiv = document.createElement("div");
			uplnk.href = "/users/signup";
			updiv.className = "menu-item";
			updiv.innerHTML = "signup";
			$(uplnk).append(updiv);

			// Appending the links
			$(menu).append(inlnk);
			$(menu).append(uplnk);
		}

		$("#page").append(menu); // Add menu to page

		// Construct list
		data = data.data;
		var list = document.createElement("div");
		list.id = "userlist";
		for(var i in data) {
			if(data[i].id != 2) {
				var user = document.createElement("div");
				var link = document.createElement("a");
				user.className = "userdiv";
				link.className = "userlink";
				link.href = "/users/" + data[i].id;
				link.innerHTML = data[i].username;
				$(user).append(link);
				$(list).append(user);
			}
		}
		$("#page").append(list); // Add list to page
	});
});

// Escapes HTML characters
function esc(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
// Finds user id of logged in user
function findID(arr, usr) {
	for(var i in arr)
		if(arr[i].username == usr) return arr[i].id;
	return false;
}
