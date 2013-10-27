//Save settings and manage icon
function saveSetting(change) {
	//Retrive setting 
	chrome.storage.local.get(function(result){
		// In case if power setting is Active
		if(result.power) {
			// Change setting
			if(change) {
				chrome.storage.local.set({"power":false});
				showInactive();
			} else {
				showActive();
			}
		} else {
			if(change) {
				chrome.storage.local.set({"power":true});
				showActive();
			} else {
				showInactive();
			}
		}
	});
}

function showActive() {
	chrome.power.requestKeepAwake("display");
	chrome.browserAction.setIcon({"path":"img/icons/eye-chrome-38.png"});
	//chrome.browserAction.setBadgeText({"text":" on "});
}

function showInactive() {
	chrome.power.releaseKeepAwake();
	chrome.browserAction.setIcon({"path":"img/icons/eye-slip-38.png"});
	//chrome.browserAction.setBadgeText({"text":" off "});
}

//run method on extension install and update
saveSetting(false);

//Events registration
// On icon click
chrome.browserAction.onClicked.addListener(function actionClicked() {
	saveSetting(true);
});

// On chrome load
chrome.runtime.onStartup.addListener(function() {
	saveSetting(false);
});
