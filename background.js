var currDomainIdx = null;
var domains = [];
var icons = [];
var times = [];

localStorage.setItem("domains", JSON.stringify(domains));  //to be listed in table
localStorage.setItem("icons", JSON.stringify(icons));
localStorage.setItem("times", JSON.stringify(times));

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
					

				}
				
                currDomainIdx = domains.indexOf(response);
                //icons.push(tabs[0].favIconUrl)
			}
		});
	});
};

chrome.tabs.onActivated.addListener(function(activeInfo) {
	update();//udpate when user switches tabs
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	update();//update when a new URL is entered on a tab
});

chrome.tabs.onRemoved.addListener(function(activeInfo) {
//	chrome.tabs.query(queryInfo, function(tabs) {
//    for (let i = 0; i < tabs.length; i++) {
//        let tab = tabs[i];
//		if(tab.active == false){
//			domains.splice(i,1);
//			logos.splice(i,1);
//			times.splice(i,1);
			

//		}

//}
//});
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
}, 0);


