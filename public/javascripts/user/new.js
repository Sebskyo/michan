$(document).ready(function() {
	var form = document.createElement("form");
	var username = document.createElement("input");
	var name = document.createElement("input");
	var password = document.createElement("input");
	var button = document.createElement("button");

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
	username.type = "text";
	name.type = "text";
	password.type = "password";
	button.type = "submit";

	$(button).append("SIGN UP");
	$(form).append("Username: <br>");
	$(form).append(username);
	$(form).append("<br>IRL Name: <br>");
	$(form).append(name);
	$(form).append("<br>Password: <br>");
	$(form).append(password);
	$(form).append("<br>");
	$(form).append(button);
	$("#page").append(form);
});
