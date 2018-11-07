var currDomainIdx = null;
var domains = [];
var icons = [];
var times = [];
var ind = [];

localStorage.setItem("domains", JSON.stringify(domains));  //to be listed in table
localStorage.setItem("icons", JSON.stringify(icons));
localStorage.setItem("times", JSON.stringify(times));
localStorage.setItem("ind", JSON.stringify(ind));

var update = function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "act"}, function(response) {
			if (response == null) {
				currDomainIdx = null;
			} else {
				if (domains.indexOf(response) < 0) {
                    		    domains.push(response);         //Store website URL
                   		    icons.push(tabs[0].favIconUrl); //Store tab favicon
				    times.push(0);
				    ind.push(tabs[0].index);

				}
				
                	currDomainIdx = domains.indexOf(response);
                
			}

			//for (var i = 0; i < domains.length; i++) {   		Attempt to remove any closed tabs from the arrays if they were found to be inactive
			//	if (tabs[i].active === false){
			//		domains.splice(i,1);
			//		icons.splice(i,1);
			//		times.splice(i,1);
			//		ind.splice(i,1);
				
				} 	
		});
	});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	update();//udpate when user switches tabs
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	update();//update when a new URL is entered on a tab
});

chrome.tabs.onDetached.addListener(function(tabId, changeInfo, tab) {
	update();//update when a tab is taken out of window
});

chrome.tabs.onRemoved.addListener(function(tabId, changeInfo, tab) {
	update();//update when a tab is closed
});

update();

var lastTime = Date.now();
setInterval(function() {
	var currTime = Date.now();  //get current time
	times[currDomainIdx] += currTime - lastTime;  //add time elapsed to record  
	lastTime = currTime; //keep up with the times
	
    localStorage.setItem("domains", JSON.stringify(domains));
    localStorage.setItem("icons", JSON.stringify(icons));
	localStorage.setItem("times", JSON.stringify(times));
	localStorage.setItem("ind", JSON.stringify(ind));
}, 0);



