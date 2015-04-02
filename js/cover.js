var images = ['chalkboard','forest','imac','macbook','mouse','notes','post','sunset'];

function randomNumber(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

$(function() {
    $('.site-wrapper:first').addClass(images[randomNumber(0, images.length - 1)]).addClass('loaded');
});