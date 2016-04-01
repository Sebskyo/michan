$(document).ready(function() {
	/*$("#page").append("<a href='/catalogue'>catalogue</a>");
	$("#page").append(" | ");
	$("#page").append("<a href='/users'>users</a>");*/
	var logo = document.createElement("div");
	var buttoncontainer = document.createElement("div");
	var catlnk = document.createElement("a");
	var usrlnk = document.createElement("a");
	var faqlnk = document.createElement("a");
	var gitlnk = document.createElement("a");
	var cat = document.createElement("div");
	var usr = document.createElement("div");
	var faq = document.createElement("div");
	var git = document.createElement("div");

	logo.id = "logo";
	buttoncontainer.id = "container";
	cat.className = usr.className = faq.className = git.className = "button";

	catlnk.href = "/catalogue";
	usrlnk.href = "/users";
	faqlnk.href = "/faq";
	gitlnk.href = "https://github.com/sebskyo/michan";

	cat.innerHTML = "catalogue";
	usr.innerHTML = "users";
	faq.innerHTML = "faq";
	git.innerHTML = "github";


	$(catlnk).append(cat);
	$(usrlnk).append(usr);
	$(faqlnk).append(faq);
	$(gitlnk).append(git);

	$(buttoncontainer).append(catlnk);
	$(buttoncontainer).append(usrlnk);
	$(buttoncontainer).append(faqlnk);
	$(buttoncontainer).append(gitlnk);

	$("#page").append(logo);
	$("#page").append(buttoncontainer);
});
