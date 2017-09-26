
function scanAndHighlight(keywords) {
  console.log('keywords:', keywords);
  $('.essays2015-essay-content').each(function() {
    let content = $(this).html();
    console.log(content);
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'check' && window.location.href.indexOf("okcupid.com/profile") !== -1) {
    chrome.runtime.sendMessage({type: 'profile'});
  }
  
  else if (request.type == 'scan') {
    scanAndHighlight(request.keywords);
  }
});
