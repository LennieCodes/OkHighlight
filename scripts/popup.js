'use strict';

var bg = chrome.extension.getBackgroundPage();

const placeholders = [
    'Anakin Skywalker, Luke Skywalker, Darth Vader, Yoda, May the force be with you',
    'Quidditch, Hufflepuff, Cedric Diggory, Hogwarts, Broomsticks',
    'Improv, Sports, Hiking, Biking, Singing in the shower, Dancing in the rain',
    'Seamless, Tacos, Pants, Bill Murray, Bacon, Netflix, Soulmate',    
];

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
}

function deactivatePlugin() {
    bg.cupid.isActive = false;

    $('#keywordBox').val(bg.cupid.keywords);
    $('#keywordBox').attr('placeholder', getPlaceholder());

    $('.plugin-active').hide();
    $('#deactivate').hide();

    $('.plugin-inactive').show();
    $('#activate').show();

}

function getPlaceholder() {
    const index = Math.floor(Math.random() * placeholders.length);
    return placeholders[index];
}

