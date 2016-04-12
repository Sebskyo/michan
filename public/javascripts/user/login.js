$(document).ready(function() {
	$("#page").append("<a href='/users'>&lt;</a><br>");

	// Construct form
	var form = document.createElement("form");
	var username = document.createElement("input");
	var password = document.createElement("input");
	var button = document.createElement("button");

	username.type = "text";
	password.type = "password";
	button.type = "submit";

	// Form submit definition
	form.onsubmit = function() {
		var data = {password: password.value};
		$.post("/api/users/"+username.value, data, function() {
			window.location.assign("/users");
		});
		return false;
	};

	// Add it all to the page
	$(button).append("LOGIN");
	$(form).append("username<br>");
	$(form).append(username);
	$(form).append("<br>password<br>");
	$(form).append(password);
	$(form).append("<br>");
	$(form).append(button);
	$("#page").append(form);
});
