'use strict';

var cupid = {
  keywords: '',
  isActive: false
};


cupid.scanProfile = function(tabId) {
  chrome.tabs.sendMessage(tabId, {type: 'scan', keywords: cupid.keywords});
};

cupid.checkIfCupid = function(tabId) {
  chrome.tabs.sendMessage(tabId, {type: 'check'});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'profile' && cupid.isActive && cupid.keywords.length > 0) {
    cupid.scanProfile(sender.tab.id);
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    cupid.checkIfCupid(tabId);
  }
});

