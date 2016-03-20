$(document).ready(function() {
	$("#page").append("<a href='/'>&lt; back</a> | ");

	$.get("/api/users", function(data) {
		if(data.you) {
			$("#page").append("<a href='/users/logout'>logout</a>");
			var you = data.you;
			var status = document.createElement("p");
			status.innerHTML = "Logged in as: "+you;
			$("#page").append(status);
		}
		else {
			$("#page").append("<a href='/users/login'>login</a> | ");
			$("#page").append("<a href='/users/signup'>signup</a>");
		}

		data = data.data;
		var list = document.createElement("ul");
		var point;
		for(var i = 0; i < data.length; i++) {
			console.log(i);
			point = document.createElement("li");
			point.innerHTML = "id:"+data[i]["id"]+", username:\""+data[i]["username"]+"\", name:\""+data[i]["name"]+"\"";
			$(list).append(point);
		}
		$("#page").append(list);
	});
});
