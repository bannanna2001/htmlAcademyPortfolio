"use strict"

let menuOpener = document.querySelector('.burger');
let menuImg = menuOpener.querySelector('img');
let menu = document.querySelector('.menu');
let menuList = document.querySelector('.burger + .menu-list');


menuOpener.addEventListener('click', (event) => {
    event.preventDefault();

    if (menuList.classList.contains('close'))
        menuImg.src = "../img/close.png";
    else
        menuImg.src = "../img/menu.png";

    menuList.classList.toggle('close');
    menu.classList.toggle('menuBackground');

})