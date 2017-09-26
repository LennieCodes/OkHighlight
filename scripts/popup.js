'use strict';

var bg = chrome.extension.getBackgroundPage();


$('#watch').click(function() {
    bg.cupid.keywords = $('#keywordBox').val();
    bg.cupid.isActive = true;
});

