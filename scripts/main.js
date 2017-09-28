
function scanProfile(keywords) {
  const keywordArr = keywords.trim().split(/\s*,\s*/);
  
  let regExpArr = [];
  let keywordMap = [];
  for (let i = 0; i < keywordArr.length; i++) {
    // potential error here - need to match any part of word that matches keyword - not exact.
    regExpArr.push(new RegExp(keywordArr[i], "ig"));
  }

  $('.essays2015-essay-content').each(function() {
    
    let content = $(this).html();
    
    for (let i = 0; i < regExpArr.length; i++) {
      content = content.replace(regExpArr[i], function(match) {
        if (keywordMap.indexOf(match) === -1) {
          keywordMap.push(match);
        }
        return "<span style='background:#FFFF00;'>" + match + "</span>"  
      });
    }

    $(this).html(content);

  });

  $('.nav-left ul.nav-links').append('<li><a>Keywords Found: ' + keywordMap.length + '</a></li>');

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.type == 'check' && window.location.href.indexOf("okcupid.com/profile") !== -1) {
    chrome.runtime.sendMessage({type: 'profile'});
  }

  else if (request.type == 'scan') {
    scanProfile(request.keywords);
  }
});
