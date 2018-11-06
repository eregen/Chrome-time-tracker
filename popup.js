setInterval(function() {
	var domains = JSON.parse(localStorage.domains);
	var icons = JSON.parse(localStorage.icons);
	var times = JSON.parse(localStorage.times);

	var ihtml = "<table id=\"t\">";
	
	ihtml += "<tr id=\"tcenter\">";
	ihtml += "<td>Tab</td>";
	ihtml += "<td>Logo</td>";
	ihtml += "<td>Time spent</td>";
	ihtml += "</tr>";

	for (var i = 0; i < domains.length; i++) {
		ihtml += "<tr>";
		ihtml += "<td>" + (i + 1) + "</td>";
		ihtml += "<td> <picture>" ;
		ihtml += "<source media= '(min-width: 250px)' srcset=" + icons[i] + ">";
		ihtml += "<img src='favicon' alt='' style='width:auto;'>" ;
		ihtml += "<picture> <td>"; 
		ihtml += "<td>" + (times[i] / 60000.0).toFixed(1) + " mins"  + "</td>";
		ihtml += "</tr>";
	}
	ihtml += "</table>";

	document.getElementById('demo').innerHTML = ihtml;
}, 0);