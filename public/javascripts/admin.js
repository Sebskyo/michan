$(document).ready(function() {
	var form = document.createElement("form");
	var input = document.createElement("input");
	var modelist = document.createElement("select");
	var mode_post = document.createElement("option");
	var mode_thread = document.createElement("option");
	var button = document.createElement("button");

	input.type = "number";
	mode_post.value = "post";
	mode_post.innerHTML = "Post";
	mode_thread.value = "thread";
	mode_thread.innerHTML = "Thread";
	button.type = "submit";
	button.innerHTML = "SEND";

	form.onsubmit = function() {
		if(!(input.value)) return false;

		var mode = $(modelist).find("option:selected").attr("value");
		var id = input.value;

		$.ajax({
			url:"/api/"+mode+"s/"+id,
			type:"DELETE",
			processData:false,
			contentType:false,
			success:function() {
				console.log("success");
			},
			error:function() {
				console.log("error");
			}
		});

		return false;
	};

	$(modelist).append(mode_post);
	$(modelist).append(mode_thread);

	$(form).append(input);
	$(form).append(modelist);
	$(form).append(button);

	$("#page").append("Deletion: ");
	$("#page").append(form);
});
