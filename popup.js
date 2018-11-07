setInterval(function() {
	var domains = JSON.parse(localStorage.domains);
	var icons = JSON.parse(localStorage.icons);
	var times = JSON.parse(localStorage.times);
	var ind = JSON.parse(localStorage.ind);

	var ihtml = "<table id=\"t\">";
	
	ihtml += "<tr id=\"tcenter\">";
	ihtml += "<td>Tab</td>";
	ihtml += "<td>Logo</td>";
	ihtml += "<td>Time spent</td>";
	ihtml += "</tr>";

	for (var i = 0; i < domains.length; i++) {
		ihtml += "<tr>";
		ihtml += "<td>" + (ind[i] + 1) + "</td>";
		ihtml += "<td> <picture>" ;
		ihtml += "<source media= '(min-width: 100px)' srcset=" + icons[i] + ">";
		ihtml += "<img src='favicon' alt='' height='36' width='36' style='width:auto;'>" ;
		ihtml += "<picture> <td>"; 
		ihtml += "<td>" + (times[i] / 60000.0).toFixed(1) + " mins"  + "</td>";
		ihtml += "</tr>";
	}
	ihtml += "</table>";

	document.getElementById('demo').innerHTML = ihtml;
}, 0);
