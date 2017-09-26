
function scanProfile(keywords) {
  const keywordArr = keywords.split(',');
  let regExpArr = [];
  for (let i = 0; i < keywordArr.length; i++) {
    // potential error here - need to match any part of word that matches keyword - not exact.
    regExpArr.push(new RegExp(keywordArr[i], "ig"));
  }

  $('.essays2015-essay-content').each(function() {
    
    let content = $(this).html().split(" ");
    content = highlightContent(content, regExpArr);
    $(this).html(content.join(" ")); // sketchy

  });
}

function highlightContent(textArr, regExpArr) {
  if (!textArr || !regExpArr) {
    console.error('Text passed into highlightContent is empty, or no keywords specified');
    return;
  }

  for (let i = 0; i < textArr.length; i++) {
    for (let j = 0; j < regExpArr.length; j++) {
      if (textArr[i].match(regExpArr[j])) {
        textArr[i] = "<span style='background:#FFFF00;'>" + text[i] + "</span>";
        j = regExpArr.length; // break for loop. 
      }
    }
  }
  return textArr;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'check' && window.location.href.indexOf("okcupid.com/profile") !== -1) {
    chrome.runtime.sendMessage({type: 'profile'});
  }

  else if (request.type == 'scan') {
    scanProfile(request.keywords);
  }
});
