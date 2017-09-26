'use strict';

const cupid = {
  keywords: '',
};


cupid.scanProfile = function(tabId) {
  chrome.tabs.sendMessage(tabId, {type: 'scan', keywords: cupid.keywords});
};

cupid.checkIfCupid = function(tabId) {
  chrome.tabs.sendMessage(tabId, {type: 'check'});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'profile') {
    cupid.scanProfile(sender.tab.id);
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  cupid.checkIfCupid(tabId);
});

