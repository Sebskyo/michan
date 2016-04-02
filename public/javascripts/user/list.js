$(document).ready(function() {
	$("#page").append("<a style='margin-left: 20px;' href='/'>&lt; back</a>");

	var menu = document.createElement("div");
	menu.className = "menu";

	$.get("/api/users", function(data) {
		if(data.you) {
			var you = data.you;
			var youlnk = document.createElement("a");
			var youdiv = document.createElement("div");
			youlnk.href = "/users/"+findID(data.data, you);
			youdiv.className = "menu-item";
			youdiv.innerHTML = you;
			$(youlnk).append(youdiv);

			var outlnk = document.createElement("a");
			var outdiv = document.createElement("div");
			outlnk.href = "/users/logout";
			outdiv.className = "menu-item";
			outdiv.innerHTML = "logout";
			$(outlnk).append(outdiv);

			$(menu).append(youlnk);
			$(menu).append(outlnk);
		}
		else {
			var inlnk = document.createElement("a");
			var indiv = document.createElement("div");
			inlnk.href = "/users/login";
			indiv.className = "menu-item";
			indiv.innerHTML = "login";
			$(inlnk).append(indiv);

			var uplnk = document.createElement("a");
			var updiv = document.createElement("div");
			uplnk.href = "/users/signup";
			updiv.className = "menu-item";
			updiv.innerHTML = "signup";
			$(uplnk).append(updiv);

			$(menu).append(inlnk);
			$(menu).append(uplnk);
		}

		$("#page").append(menu);

		data = data.data;
		var list = document.createElement("div");
		list.id = "userlist";
		for(var i in data) {
			if(data[i].id != 2 && data[i].id != 3) {
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
		$("#page").append(list);
	});
});

function esc(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
function findID(arr, usr) {
	for(var i in arr) {
		if(arr[i].username = usr) return arr[i].id;
	}
	return false;
}
