//Save settings and manage icon
function saveSetting(toggle) {
	//Retrive setting 
	chrome.storage.local.get(function(result){
		// In case if power setting is Active
		if(result.power) {
			// Change setting
			if(toggle) {
				chrome.storage.local.set({"power":false});
				showInactive();
			} else {
				showActive();
			}
		} else {
			if(toggle) {
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
}

function showInactive() {
	chrome.power.releaseKeepAwake();
	chrome.browserAction.setIcon({"path":"img/icons/eye-slip-38.png"});	
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
