{
	{
		chrome.tabs.create({
			url: "https://plugtopus.agency"
		});
	}
}
chrome.extension.onMessage.addListener(function (req, sender, sendR) {
	if (req.action == "STbackground_storage") {
		localStorage[req.name] = req.value;
	}
});

chrome.tabs.onUpdated.addListener(function (tabId, change, tab) {
	if (tab.status == "complete" && (tab.url.indexOf("facebook.com/photo.php?fbid=") != -1 || tab.url.indexOf("/photos/") != -1)) {
		chrome.tabs.sendMessage(tab.id, {
			action: "activezoom",
			background_storage: localStorage
		});
	}
});