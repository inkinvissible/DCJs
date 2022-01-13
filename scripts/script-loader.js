
var loader = document.querySelector(".loader")

window.addEventListener("load", vanish);

function vanish() {
    loader.classList.add("disppear");
}

jQuery('document').ready(function ($) {
    var menuBtn = $('.menuIcon'),
        menu = $('#navigation');
menuBtn.click(function(){
    if(menu.hasClass('show')){
        menu.removeClass('show');
    }else{
        menu.addClass('show');
    }
});
});
