document.addEventListener("DOMContentLoaded", function(event) {
	var icons = document.getElementsByClassName('isvg');
	Array.prototype.forEach.call(icons, function(icon, i){
		var http = new XMLHttpRequest();
		http.open('GET', '/img/svg/' + icon.getAttribute('data-icon') + '.svg', true);
		icon.className = icon.className + ' ' + icon.getAttribute('data-icon');
		http.onload = function () {
			icon.innerHTML = http.responseText;
		}
		http.send();
	});
});