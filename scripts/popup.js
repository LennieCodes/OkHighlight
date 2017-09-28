'use strict';

var bg = chrome.extension.getBackgroundPage();

bg.cupid.isActive ? activatePlugin() : deactivatePlugin();

$('#activate').click(function() {
    bg.cupid.keywords = $('#keywordBox').val();
    if (bg.cupid.keywords.length === 0) {
        $('.error').show();
        return;
    }
    activatePlugin();
});

$('#deactivate').click(function() {
    deactivatePlugin();
})

function activatePlugin() {  
    bg.cupid.isActive = true;
    $('.error').hide();
    $('.keywords').text(bg.cupid.keywords);

    $('.plugin-inactive').hide();
    $('#activate').hide();

    $('.plugin-active').show();
    $('#deactivate').show();

    // BROKEN
    // chrome.tabs.query({}, function(tabs) {
    //     for (let i = 0; i < tabs.length; i++) {
    //         console.log(tabs[i]);
    //         bg.cupid.checkIfCupid(tabs[i].id);
    //     }
    // })

}

function deactivatePlugin() {
    bg.cupid.isActive = false;
    $('#keywordBox').val(bg.cupid.keywords);

    $('.plugin-active').hide();
    $('#deactivate').hide();

    $('.plugin-inactive').show();
    $('#activate').show();
}

