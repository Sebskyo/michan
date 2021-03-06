$(document).ready(function() {
	$("#page").append("<a href='/users'>&lt;</a>");

	// Construct form
	var form = document.createElement("form");
	var username = document.createElement("input");
	var name = document.createElement("input");
	var password = document.createElement("input");
	var button = document.createElement("button");

	username.type = "text";
	username.placeholder = "max 16 characters";
	name.type = "text";
	name.placeholder = "max 16 characters";
	password.type = "password";
	button.type = "submit";

	// Form submit definition
	form.onsubmit = function() {
		var data = {
			username: username.value.toLowerCase(),
			name: name.value,
			password: password.value
		};
		$.post("/api/users", data, function() {
			window.location.assign("/users/login");
		});
		return false;
	};

	// Add it all to the page
	$(button).append("SIGN UP");
	$(form).append("username<br>");
	$(form).append(username);
	$(form).append("<br>irl name<br>");
	$(form).append(name);
	$(form).append("<br>password<br>");
	$(form).append(password);
	$(form).append("<br>");
	$(form).append(button);
	$("#page").append(form);
});
