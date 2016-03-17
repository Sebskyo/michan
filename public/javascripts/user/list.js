$(document).ready(function() {
	$.get("/api/users", function(data, status) {
		var list = document.createElement("ul");
		var points = [];
		for(var i = 0; i < data.length; i++) {
			console.log(i);
			points[i] = document.createElement("li");
			points[i].innerHTML = "id:"+data[i]["id"]+", username:\""+data[i]["username"]+"\", name:\""+data[i]["name"]+"\"";
			$(list).append(points[i]);
		}
		$("#page").append(list);
	});
});
