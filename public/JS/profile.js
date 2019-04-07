document.addEventListener("DOMContentLoaded", function () {
    let menu_icon = document.querySelector("#menu-icon");
    let menu = document.querySelector('#menu');
    let exit_icon = document.querySelector('#exit-icon')

    menu_icon.onclick = function () {
        menu.classList.add('appear');
    },

    exit_icon.onclick = function () {
        menu.classList.remove('appear');
    }
}, false)