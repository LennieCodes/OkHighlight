
function scanAndHighlight(keywords) {
  console.log('keywords:', keywords);
  $('.essays2015-essay-content').each(function() {
    let content = $(this).html();
    const keywordArr = keywords.split(',');
    for (let i = 0; i < keywordArr.length; i++) {
      const regExp = new RegExp(keywordArr[i], "ig");
      const substitute = "<span style='background:#FFFF00;'>" + keywordArr[i] + "</span>"; 
      content = content.replace(regExp, substitute);
    }

    $(this).html(content);
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
